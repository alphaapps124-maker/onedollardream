# One Dollar Dream — PRD

## Original Problem Statement
A pre-launch web application for a micro-giving collective where users pledge $1/month. The current focus is collecting 10,000 conditional email pledges before activating payments and grants.

**Stage:** Pre-launch — email pledge collection only (no payments, no auth)  
**Goal:** 10,000 conditional pledges → triggers payment activation and first grant cycle  
**Core Loop:** Pledge → Share → Refer → Community builds → Grants distributed monthly

---

## Architecture

**Frontend:** React + Tailwind CSS (custom brand colors + Instrument Serif/Space Grotesk fonts)  
**Backend:** FastAPI (Python) + Motor (async MongoDB)  
**Database:** MongoDB (collection: users, contact_messages)  
**Fonts:** Instrument Serif (headlines) + Space Grotesk (body/UI) via Google Fonts  

### Directory Structure
```
/app/backend/server.py                  # FastAPI with all API routes
/app/frontend/src/
  App.js                                 # Router + referral capture + scroll-to-top
  components/
    Header.jsx                           # Dark sticky nav with live badge
    Footer.jsx                           # 3-column dark footer
    PledgeForm.jsx                       # Pledge form with success/error state
    LiveTicker.jsx                       # Rotating pledge names (framer-motion)
    ProgressBar.jsx                      # Animated progress to 10,000
    RecentPledges.jsx                    # Last 4 pledges with initials/time
  sections/
    HeroSection.jsx                      # Full-screen hero with form + ticker
    RoadJourneySection.jsx               # SIGNATURE winding path section
    PledgeFormSection.jsx                # Trust copy + pledge card
    GrantCategoriesSection.jsx           # 4-card bento grid
    CommunityChampionSection.jsx         # Champion system dark section
    PhasesTimelineSection.jsx            # 7 phases horizontal scroll
    TrustStripSection.jsx                # Dark bar with 5 metrics
    VideoSection.jsx                     # Video placeholder with play overlay
    FAQSection.jsx                       # Accordion FAQ
    FinalCTASection.jsx                  # Dark final CTA with form
  pages/
    HomePage.jsx                         # Assembles all 10 sections
    HowItWorksPage.jsx                   # Expanded Road Journey + trust pillars
    GrantsPage.jsx                       # 4 categories + scaling table
    PhasesPage.jsx                       # 7 detailed phase cards
    TransparencyPage.jsx                 # Live metrics + money flow
    TeamPage.jsx                         # 6 team members with initials
    ContactPage.jsx                      # Contact form → API
    SubmitPitchPage.jsx                  # Locked placeholder + progress
    AdminPage.jsx                        # Admin panel: pledges + messages
```

---

## Design System

**Colors:**
- Crystal Cut: `#F8F4ED` (main bg)
- Angelic White: `#F4EDE4` (section bg)
- Lime Jelly: `#E3FF00` (CTA only)
- Azure Cloud: `#4DD8FF` (accents)
- Star of Life: `#057BC1` (medium blue)
- Twilight Bliss: `#083645` (dark sections)
- Dark Shade: `#0a2330` (footer/hero)

**Typography:** Instrument Serif (headlines/italic) + Space Grotesk (body/UI)  
**Aesthetic:** Magazine editorial, not dashboard

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/pledge | Create pledge, assign number + referral code |
| GET | /api/pledge-count | Returns count + progress_pct |
| GET | /api/recent-pledges | Last N pledges (email excluded) |
| POST | /api/contact | Save contact message |
| GET | /api/stats | Platform metrics for transparency |
| GET | /api/admin/pledges | Paginated pledges with search |
| GET | /api/admin/contacts | Paginated contact messages |

---

## User Personas
1. **Donors** — Anyone willing to pledge $1/month to be part of something collective
2. **Grant Applicants** — Dreamers, students, crisis individuals, community builders
3. **Community Members** — Voters, nominators, engagement participants (post-launch)

---

## What's Been Implemented (Feb 2026)

### Phase 1 — Complete ✅
- [x] Full design system (colors, fonts, spacing)
- [x] Sticky dark header with live pledge count badge
- [x] Dark 3-column footer
- [x] Homepage with all 10 sections
- [x] Road Journey SIGNATURE section (winding path, alternating cards, dashed center line)
- [x] Pledge form with referral tracking, duplicate prevention, success state
- [x] Live pledge ticker (framer-motion, seed fallback)
- [x] Animated progress bar (polls every 20s)
- [x] Recent pledges feed (polls every 20s)
- [x] Referral code generation + ?ref=CODE URL param capture
- [x] All inner pages: How It Works, Grants, Phases, Transparency, Team, Contact, Submit Pitch
- [x] Admin panel at /admin (pledges table + contact messages, searchable)
- [x] Contact form → contact_messages collection
- [x] FAQ accordion (shadcn)
- [x] Trust Strip with 5 metrics
- [x] Phases horizontal scroll timeline (7 phases)
- [x] Grant scaling table (phases 1–7)
- [x] Video section placeholder
- [x] SEO meta tags + Google Fonts

### Not Implemented (Post-Launch)
- Resend confirmation email (no API key provided)
- Stripe payment activation
- User authentication
- Pitch submission portal
- Community voting system
- Engagement scoring
- Admin panel authentication (production concern)

---

## Prioritized Backlog

### P0 — Before Launch
- [ ] Add Resend email confirmation on pledge (waiting for API key)
- [ ] Admin panel basic auth (at minimum a secret token)

### P1 — Phase 2 (At 10,000 pledges)
- [ ] Stripe payment activation flow
- [ ] User auth (email magic link or Google OAuth)
- [ ] Pitch submission portal
- [ ] Community voting system

### P2 — Enhancement
- [ ] OG image for social sharing
- [ ] Email capture for notifications when pitch portal opens
- [ ] Analytics dashboard
- [ ] WCAG full accessibility audit

---

## Next Tasks
1. Add Resend API key → enable confirmation emails
2. Add basic auth to admin panel before sharing URL
3. Social sharing meta tags (OG image)
4. Monitor pledge growth and share referral links
