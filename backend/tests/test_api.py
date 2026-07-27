import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Unique test email to avoid conflicts
TEST_EMAIL = f"TEST_user_{int(time.time())}@example.com"

class TestPledgeAPI:
    """Pledge endpoint tests"""

    def test_create_pledge(self):
        resp = requests.post(f"{BASE_URL}/api/pledge", json={
            "full_name": "TEST User",
            "email": TEST_EMAIL,
            "city": "New York",
            "country": "USA"
        })
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True
        assert "pledge_number" in data
        assert "referral_code" in data
        assert len(data["referral_code"]) == 8
        print(f"Created pledge #{data['pledge_number']} with code {data['referral_code']}")

    def test_duplicate_pledge_returns_409(self):
        # Use a dedicated email for this test
        dup_email = f"TEST_dup_{int(time.time())}@example.com"
        requests.post(f"{BASE_URL}/api/pledge", json={"full_name": "Test Dup", "email": dup_email})
        resp = requests.post(f"{BASE_URL}/api/pledge", json={"full_name": "Test Dup", "email": dup_email})
        assert resp.status_code == 409
        print("Duplicate pledge correctly returns 409")

    def test_pledge_count(self):
        resp = requests.get(f"{BASE_URL}/api/pledge-count")
        assert resp.status_code == 200
        data = resp.json()
        assert "count" in data
        assert data["target"] == 10000
        assert "progress_pct" in data
        print(f"Pledge count: {data['count']}")

    def test_recent_pledges_no_email(self):
        resp = requests.get(f"{BASE_URL}/api/recent-pledges")
        assert resp.status_code == 200
        data = resp.json()
        assert isinstance(data, list)
        if data:
            assert "email" not in data[0]
            assert "full_name" in data[0]
        print(f"Recent pledges count: {len(data)}")

    def test_stats(self):
        resp = requests.get(f"{BASE_URL}/api/stats")
        assert resp.status_code == 200
        data = resp.json()
        assert "total_pledges" in data
        assert "target" in data
        assert data["grants_pct"] == 85
        print(f"Stats: {data}")

    def test_admin_pledges(self):
        resp = requests.get(f"{BASE_URL}/api/admin/pledges")
        assert resp.status_code == 200
        data = resp.json()
        assert "pledges" in data
        assert "total" in data
        assert "pages" in data
        print(f"Admin pledges total: {data['total']}")

    def test_admin_pledges_search(self):
        resp = requests.get(f"{BASE_URL}/api/admin/pledges?search=TEST")
        assert resp.status_code == 200
        data = resp.json()
        assert "pledges" in data
        print(f"Search results: {data['total']}")

    def test_admin_contacts(self):
        resp = requests.get(f"{BASE_URL}/api/admin/contacts")
        assert resp.status_code == 200
        data = resp.json()
        assert "messages" in data
        print(f"Admin contacts total: {data['total']}")


class TestContactAPI:
    """Contact endpoint tests"""

    def test_create_contact(self):
        resp = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST Contact",
            "email": f"TEST_contact_{int(time.time())}@example.com",
            "subject": "Test Subject",
            "message": "Test message from automated testing"
        })
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True
        print(f"Contact created: {data['message']}")
