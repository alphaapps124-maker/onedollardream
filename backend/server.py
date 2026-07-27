from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr
from typing import Optional
import uuid
import random
import string
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)


class PledgeCreate(BaseModel):
    full_name: str
    email: EmailStr
    city: Optional[str] = None
    country: Optional[str] = None
    referred_by: Optional[str] = None


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str


def generate_referral_code():
    chars = string.ascii_uppercase + string.digits
    return ''.join(random.choices(chars, k=8))


@api_router.get("/")
async def root():
    return {"message": "One Dollar Dream API"}


@api_router.post("/pledge")
async def create_pledge(data: PledgeCreate):
    existing = await db.users.find_one({"email": data.email.lower()})
    if existing:
        raise HTTPException(status_code=409, detail="This email has already pledged. Thank you!")

    count = await db.users.count_documents({})
    pledge_number = count + 1

    referral_code = None
    for _ in range(10):
        code = generate_referral_code()
        if not await db.users.find_one({"referral_code": code}):
            referral_code = code
            break

    if not referral_code:
        referral_code = generate_referral_code()

    doc = {
        "id": str(uuid.uuid4()),
        "full_name": data.full_name,
        "email": data.email.lower(),
        "city": data.city or "",
        "country": data.country or "",
        "pledge_number": pledge_number,
        "referral_code": referral_code,
        "referred_by": data.referred_by,
        "is_paid_member": False,
        "engagement_score": 0,
        "volunteer_boost": False,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }

    await db.users.insert_one(doc)
    return {
        "success": True,
        "pledge_number": pledge_number,
        "referral_code": referral_code,
        "full_name": data.full_name,
        "message": f"Welcome to the dream, {data.full_name}! You are pledge #{pledge_number}.",
    }


@api_router.get("/pledge-count")
async def get_pledge_count():
    count = await db.users.count_documents({})
    return {"count": count, "target": 10000, "progress_pct": round((count / 10000) * 100, 2)}


@api_router.get("/recent-pledges")
async def get_recent_pledges(limit: int = Query(default=10, le=50)):
    pledges = await db.users.find(
        {},
        {"_id": 0, "email": 0, "id": 0, "referral_code": 0, "is_paid_member": 0,
         "engagement_score": 0, "volunteer_boost": 0, "referred_by": 0}
    ).sort("created_at", -1).to_list(limit)
    return pledges


@api_router.post("/contact")
async def create_contact(data: ContactCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "name": data.name,
        "email": data.email,
        "subject": data.subject,
        "message": data.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.contact_messages.insert_one(doc)
    return {"success": True, "message": "Your message has been received. We'll be in touch soon!"}


@api_router.get("/stats")
async def get_stats():
    pledge_count = await db.users.count_documents({})
    cities = await db.users.distinct("city")
    countries = await db.users.distinct("country")
    return {
        "total_pledges": pledge_count,
        "target": 10000,
        "progress_pct": round((pledge_count / 10000) * 100, 2),
        "platform_fee_pct": 0,
        "grants_pct": 85,
        "operations_pct": 15,
        "unique_cities": len([c for c in cities if c]),
        "unique_countries": len([c for c in countries if c]),
    }


@api_router.get("/admin/pledges")
async def get_admin_pledges(
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=50, le=100),
    search: str = Query(default=""),
):
    query = {}
    if search:
        query = {
            "$or": [
                {"full_name": {"$regex": search, "$options": "i"}},
                {"email": {"$regex": search, "$options": "i"}},
                {"city": {"$regex": search, "$options": "i"}},
                {"country": {"$regex": search, "$options": "i"}},
            ]
        }
    skip = (page - 1) * limit
    pledges = await db.users.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).to_list(limit)
    total = await db.users.count_documents(query)
    return {
        "pledges": pledges,
        "total": total,
        "page": page,
        "limit": limit,
        "pages": max(1, (total + limit - 1) // limit),
    }


@api_router.get("/admin/contacts")
async def get_admin_contacts(
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=50, le=100),
):
    skip = (page - 1) * limit
    messages = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).skip(skip).to_list(limit)
    total = await db.contact_messages.count_documents({})
    return {"messages": messages, "total": total, "page": page, "pages": max(1, (total + limit - 1) // limit)}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
