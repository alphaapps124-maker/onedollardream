from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr
from typing import Optional
import uuid
import random
import string
from datetime import datetime, timezone
import resend

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend setup
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
APP_URL = "https://dollar-dream-app.preview.emergentagent.com"

app = FastAPI()
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)


def build_confirmation_email(full_name: str, pledge_number: int, referral_code: str) -> str:
    first_name = full_name.split()[0]
    referral_link = f"{APP_URL}/?ref={referral_code}"
    return f"""
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#F8F4ED;font-family:'Space Grotesk',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F8F4ED;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background-color:#083645;padding:36px 40px;border-radius:16px 16px 0 0;">
            <p style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">
              <span style="color:#ffffff;">one</span><span style="color:#E3FF00;">dollar</span><span style="color:rgba(255,255,255,0.4);">dream.</span>
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background-color:#ffffff;padding:40px 40px 32px;border-radius:0 0 16px 16px;">

            <h1 style="margin:0 0 8px;font-size:32px;color:#083645;font-style:italic;font-weight:400;letter-spacing:-0.5px;">
              You're in, {first_name}.
            </h1>
            <p style="margin:0 0 28px;font-size:14px;color:rgba(8,54,69,0.5);">Pledge #{pledge_number:,} · Conditional · No charge until 10,000</p>

            <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:rgba(8,54,69,0.75);">
              Thank you for signing the pledge. You've joined a growing community working together to make someone's dream real — one dollar at a time.
            </p>

            <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:rgba(8,54,69,0.75);">
              Remember: <strong style="color:#083645;">no payment is ever taken</strong> until we reach 10,000 pledges. When we do, you'll receive an email to activate your $1/month via Stripe.
            </p>

            <!-- Pledge number badge -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="background-color:#083645;border-radius:12px;padding:20px 24px;">
                  <p style="margin:0 0 2px;font-size:11px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:1px;">your pledge number</p>
                  <p style="margin:0;font-size:36px;font-weight:700;color:#E3FF00;">#{pledge_number:,}</p>
                </td>
              </tr>
            </table>

            <!-- Referral section -->
            <h2 style="margin:0 0 10px;font-size:18px;color:#083645;font-style:italic;font-weight:400;">Spread the dream</h2>
            <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:rgba(8,54,69,0.65);">
              Share your unique link. Every person who pledges through it earns you Community Champion points — giving your voice extra power in grant votes once we launch.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="background-color:#F4EDE4;border:1px solid rgba(8,54,69,0.1);border-radius:10px;padding:14px 18px;">
                  <p style="margin:0 0 4px;font-size:10px;color:rgba(8,54,69,0.4);text-transform:uppercase;letter-spacing:1px;">your referral link</p>
                  <a href="{referral_link}" style="color:#057BC1;font-size:13px;word-break:break-all;text-decoration:none;">{referral_link}</a>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr>
                <td style="background-color:#E3FF00;border-radius:100px;padding:14px 28px;">
                  <a href="{referral_link}" style="color:#083645;font-size:14px;font-weight:700;text-decoration:none;">share your link →</a>
                </td>
              </tr>
            </table>

            <!-- What happens next -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(8,54,69,0.08);padding-top:24px;">
              <tr>
                <td>
                  <p style="margin:0 0 14px;font-size:13px;font-weight:600;color:#083645;text-transform:uppercase;letter-spacing:0.5px;">what happens next</p>
                  <table cellpadding="0" cellspacing="0" width="100%">
                    {"".join(f'<tr><td style="padding:6px 0;font-size:13px;color:rgba(8,54,69,0.65);line-height:1.6;"><span style="color:#E3FF00;margin-right:8px;">→</span>{step}</td></tr>' for step in [
                        "We keep collecting pledges until we hit 10,000.",
                        "When we hit 10,000, you'll get an email to activate your $1/month.",
                        "The pitch portal opens. Grant voting begins.",
                        "The first dreams get funded. Monthly."
                    ])}
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 0;text-align:center;">
            <p style="margin:0;font-size:12px;color:rgba(8,54,69,0.3);">One Dollar Dream · 0% platform fee · Conditional pledge — cancel anytime before activation</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
"""


async def send_confirmation_email(email: str, full_name: str, pledge_number: int, referral_code: str):
    if not resend.api_key:
        logger.warning("RESEND_API_KEY not set — skipping confirmation email")
        return
    try:
        params = {
            "from": f"One Dollar Dream <{SENDER_EMAIL}>",
            "to": [email],
            "subject": f"You're pledge #{pledge_number:,} — One Dollar Dream",
            "html": build_confirmation_email(full_name, pledge_number, referral_code),
        }
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Confirmation email sent to {email} — id: {result.get('id')}")
    except Exception as e:
        logger.error(f"Failed to send confirmation email to {email}: {e}")


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

    # Send confirmation email (non-blocking — failure won't affect pledge)
    asyncio.create_task(send_confirmation_email(
        email=data.email.lower(),
        full_name=data.full_name,
        pledge_number=pledge_number,
        referral_code=referral_code,
    ))

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
