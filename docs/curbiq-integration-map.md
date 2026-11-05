# CurbIQ → Home Services: Infrastructure Integration Map
**Date:** 2026-11-05
**Source:** `drvalentine/property-management/caphe-curbiq/`
**Target:** `caphe-homeservices/` (this repo)

---

## Summary

CurbIQ's physical intake backbone — QR scan attribution, lead storage, event pipeline, CRM adapters, and containerization — maps cleanly onto the HVAC/home services demo factory. The two products share the same core architecture: a QR code on a physical asset (a for-rent sign or a service vehicle) resolves to a client configuration, runs a branded intake form, persists a lead/inquiry record, and routes it through n8n to a CRM.

**~65% of CurbIQ's infra reuses directly. ~35% is real-estate-specific and is replaced.**

---

## Layer-by-Layer Mapping

### ✅ REUSED DIRECTLY — identical or copy-with-rename

| CurbIQ Component | Home Services Equivalent | Notes |
|---|---|---|
| `app/intake/engine.py` | `backend/app/intake/engine.py` | QR slug → client config → intake session. `sign_code` → `slug_code`, `Sign` → `QRSlug`. Logic identical. |
| `app/db/database.py` | `backend/app/db/database.py` | SQLAlchemy + PostgreSQL connection. Identical. |
| `app/db/models.py` → `Tenant` | `Tenant` | Deployment/environment table. Copy verbatim. |
| `app/db/models.py` → `Client` | `Client` + add `industry` field | Same shape; add `industry` VARCHAR(80) for HVAC/pest-control routing. |
| `app/db/models.py` → `Event` | `Event` | QR attribution event log. Identical. |
| `app/db/models.py` → `EdgeInteraction` | `EdgeInteraction` | Per-scan interaction row. Rename `property_id → entity_id`, `sign_id → slug_id`. |
| `app/db/models.py` → `AuditEvent` | `AuditEvent` | Audit trail. Identical. |
| `app/db/models.py` → `RoutingConfig` | `RoutingConfig` | Branding colors, cache TTL. Identical. |
| `app/db/models.py` → `IntegrationConfig` | `IntegrationConfig` | CRM/webhook config per client. Identical. |
| `app/adapters/crm/hubspot.py` | `backend/app/adapters/crm/hubspot.py` | HubSpot CRM adapter. Copy verbatim; home services clients use HubSpot too. |
| `app/adapters/crm/followupboss.py` | `backend/app/adapters/crm/followupboss.py` | FollowUpBoss is used by home services companies. Copy verbatim. |
| `app/adapters/sms/` → WhatsApp adapter | `backend/app/adapters/notifications/whatsapp.py` | WhatsApp lead notification on new submission. Same Meta Cloud API pattern. |
| `Dockerfile` | `infrastructure/docker/Dockerfile` | Python 3.12 + gunicorn + uvicorn. Adapt CMD path only. |
| `docker-compose.yml` | `infrastructure/docker/docker-compose.yml` | Postgres + API service. Adapt DB name and port. |
| `pyproject.toml` | `backend/pyproject.toml` | Python project config. Copy and update `[project].name`. |
| `requirements.txt` | `requirements.txt` | FastAPI, SQLAlchemy, alembic, gunicorn, zod-equivalent. Same stack. |

---

### 🔄 ADAPTED — same concept, renamed for home services context

| CurbIQ | Home Services | What changes |
|---|---|---|
| `Sign` table (physical QR asset on a property) | `qr_slug` table | Rename `sign_code → slug_code`, drop `property_id` FK (no property concept), add `slug_type` (vehicle/flyer/card) |
| `Prospect` (real estate buyer/renter) | `lead` | Rename, drop `property_id` FK, add `source_slug`, `is_demo` flag, `zip_code` |
| `Inquiry` (property viewing/info request) | `service_request` | Rename, replace `inquiry_type` with `service_type` + `industry` + `urgency` + `system_type` |
| `PilotDeployment` / `PilotAsset` | `demo_deployment` | Replace two tables with one; maps client → slug → demo_url → production_url |
| `domain/canonical.py` → `EdgeScan` | `domain/canonical.py` → `QRScan` | Rename `property_id → entity_id`, `sign_id → slug_id`. `CanonicalEvent` shape unchanged. |
| `n8n/curbiq-mvp-workflow.json` | `infrastructure/n8n/capture-lead.json` | Replace real-estate-specific Workflow A/B lanes with lead capture + WhatsApp notify + CRM sync |

---

### ❌ NOT REUSED — real estate specific, no HVAC equivalent

| CurbIQ Component | Why not reused |
|---|---|
| `Property`, `Unit` models | Real estate property entities. Home services leads attach to a ZIP code + property type, not a managed property record. |
| `Showing`, `WorkOrder`, `Outcome` models | Real estate workflows. HVAC has `service_request`, not showings or work orders. |
| `Agent`, `Office`, `PropertyAgent`, `Listing` models | RMA-specific agent roster and office routing. Home services has no equivalent (the business IS the service provider). |
| `app/intelligence/signals.py` | Real estate market signals (days-on-market, price reduction, vacant unit). Replace with lead velocity / conversion rate monitoring when needed. |
| `HumanTask` + Notion sync | CurbIQ routes leads to an RMA agent queue in Notion. Home services routes leads directly to the client via CRM/WhatsApp — no Notion queue. |
| `Campaign` / `RoutingRule` models | RMA-specific campaign and office-queue routing. Home services uses simpler slug → client routing. |

---

## QR Attribution Layer: Why It Maps Directly

CurbIQ's core insight: **the physical object (a for-rent sign) is the attribution identity**. The same logic applies to a service vehicle QR code:

```
CurbIQ:       sign_code on a yard sign → property → agent office → human task
Home Services: slug on a service truck → client config → intake form → lead + WhatsApp notify
```

The `ingest_sign_scan()` function maps to the home services equivalent like this:

```python
# CurbIQ original
def ingest_sign_scan(db, sign_code, session_id, occurred_at, ...):
    sign = resolve_property_by_sign_code(db, sign_code)
    ...

# Home Services equivalent (rename only)
def ingest_qr_scan(db, slug_code, session_id, occurred_at, ...):
    slug = resolve_client_by_slug_code(db, slug_code)
    ...
```

The idempotency key pattern (`{channel}:{session_id}:edge.{event_type}`) carries over without change.

---

## Build Sequence to Wire CurbIQ Infra into Home Services

1. **Copy and rename** the intake engine:
   - `cp caphe-curbiq/app/intake/engine.py backend/app/intake/engine.py`
   - Replace `Sign` / `sign_code` references with `QRSlug` / `slug_code`
   - Replace `Property` lookups with `Client` lookups

2. **Copy database layer:**
   - `cp caphe-curbiq/app/db/database.py backend/app/db/database.py`
   - Write new `backend/app/db/models.py` from `infrastructure/database/schema.sql`

3. **Copy CRM adapters verbatim:**
   - `cp -r caphe-curbiq/app/adapters/crm/ backend/app/adapters/crm/`
   - `cp caphe-curbiq/app/adapters/sms/twilio_sms.py backend/app/adapters/notifications/whatsapp.py`
   - Update WhatsApp adapter to use Meta Cloud API (already migrated in CurbIQ per memory)

4. **Build the lead API** (`backend/app/api/leads.py`):
   - `POST /api/leads` — validate, persist `lead` + `service_request`, emit `Event`
   - `GET /api/config/{slug}` — resolve `qr_slug` → `clients` → return `ClientConfig`
   - `GET /api/inbox` (demo) — return recent `service_request` rows where `is_demo=1`

5. **Adapt Dockerfile + docker-compose** from `infrastructure/docker/`

6. **Run Alembic migrations** using the schema in `infrastructure/database/schema.sql`

---

## AWS Integration Decision

CurbIQ runs on EC2 (54.144.93.210) with Postgres in a Docker container. For home services:

- **Vercel handles** the Next.js frontend — no EC2 needed for the demo layer.
- **The lead API** (FastAPI) can run on EC2 (same instance, different port/container) OR as a Vercel Serverless Function if the backend stays stateless.
- **Recommended for MVP:** Vercel Functions for the config and lead API endpoints, Supabase for Postgres. No EC2 until production client activation.
- **Path to EC2:** when the first client goes production, spin up the Docker stack from `infrastructure/docker/docker-compose.yml` on the existing CurbIQ instance or a dedicated one.

---

## What's Not Built Yet (Next Steps)

| Item | Priority | Notes |
|---|---|---|
| `backend/app/api/leads.py` — actual FastAPI routes | P0 (before first real lead) | Wire slug resolution + lead persistence |
| `backend/app/db/models.py` — SQLAlchemy models from schema.sql | P0 | Direct port from CurbIQ models with renames |
| `backend/app/intake/engine.py` — slug resolution | P0 | Copy + rename from CurbIQ |
| Alembic migration files | P0 | Standard setup; use CurbIQ's `alembic.ini` as template |
| `backend/app/adapters/crm/` — CRM routing | P1 | Copy verbatim from CurbIQ; test with HubSpot sandbox |
| QR code generation script | P1 | Port `scripts/generate_qr.py` from CurbIQ; replace `sign_code` with `slug_code` |
| Test inbox page (demo submissions) | P1 | Simple Next.js route showing `service_request WHERE is_demo=1` |
| Production switch (demo → live) | P2 | Update `demo_deployment.status` and `client.billing_status` |
