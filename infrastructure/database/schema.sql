-- Caphè Home Services — Lead Engine Schema
-- Adapted from caphe-curbiq/app/db/models.py (2026-11-05)
-- PostgreSQL 16+
--
-- What is REUSED from CurbIQ vs REPLACED:
-- ✅ Tenant, Client, RoutingConfig, IntegrationConfig — identical, copied verbatim
-- ✅ Event table — identical; QR scan attribution is the same mechanism
-- ✅ EdgeInteraction — identical; the QR scan layer maps directly
-- ✅ AuditEvent — identical; audit trail is shared infrastructure
-- 🔄 Sign → QRSlug (renamed, same concept: physical QR code with a stable slug)
-- 🔄 Prospect → Lead (renamed; home services lead, not a real estate prospect)
-- 🔄 Inquiry → LeadRequest (renamed; service request, not a property inquiry)
-- ❌ Property, Unit, Showing, WorkOrder, Outcome, Signal — real estate entities, not built here
-- ❌ Agent, Office, PropertyAgent, Listing — RMA-specific, not built here
-- ❌ PilotDeployment, PilotAsset — replaced by DemoDeployment
-- ➕ ServiceRecord — HVAC-specific: captures the actual service request details
-- ➕ DemoDeployment — tracks demo vs production activation per client

-- ── Multi-tenancy / deployment ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS tenant (
    tenant_id       VARCHAR(64) PRIMARY KEY,
    tenant_name     VARCHAR(200) NOT NULL,
    environment     VARCHAR(40),
    data_class      VARCHAR(40)
);

CREATE TABLE IF NOT EXISTS clients (
    id                      VARCHAR(64) PRIMARY KEY,
    tenant_id               VARCHAR(64) REFERENCES tenant(tenant_id),
    organization_name       VARCHAR(200) NOT NULL,
    industry                VARCHAR(80),
    corporate_domain        VARCHAR(200),
    billing_status          VARCHAR(40) DEFAULT 'prospect',
    escalation_phone        VARCHAR(40),
    notification_emails     JSONB DEFAULT '[]',
    created_at              TIMESTAMP DEFAULT NOW()
);

-- ── QR slug registry (CurbIQ's Sign table, renamed for home services) ──────

CREATE TABLE IF NOT EXISTS qr_slug (
    slug_id         VARCHAR(64) PRIMARY KEY,
    client_id       VARCHAR(64) REFERENCES clients(id),
    slug_code       VARCHAR(80) UNIQUE NOT NULL,   -- e.g. "northstar-hvac"
    slug_type       VARCHAR(50),                    -- "vehicle", "flyer", "business_card"
    placement_zone  VARCHAR(80),
    active          INTEGER DEFAULT 1,
    installed_at    TIMESTAMP,
    synthetic       INTEGER DEFAULT 0
);

-- ── Lead (CurbIQ's Prospect, adapted for home services) ────────────────────

CREATE TABLE IF NOT EXISTS lead (
    lead_id         VARCHAR(64) PRIMARY KEY,
    client_id       VARCHAR(64) REFERENCES clients(id),
    first_name      VARCHAR(100),
    last_name       VARCHAR(100),
    full_name       VARCHAR(200),
    email           VARCHAR(200),
    phone           VARCHAR(40),
    zip_code        VARCHAR(20),
    source_slug     VARCHAR(80),    -- which QR slug generated this lead
    status          VARCHAR(40) DEFAULT 'new',
    is_demo         INTEGER DEFAULT 1,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- ── Service request (new — HVAC/home services specific) ────────────────────

CREATE TABLE IF NOT EXISTS service_request (
    request_id          VARCHAR(64) PRIMARY KEY,
    lead_id             VARCHAR(64) REFERENCES lead(lead_id),
    client_id           VARCHAR(64) REFERENCES clients(id),
    industry            VARCHAR(80),                -- "hvac", "pest_control", etc.
    service_type        VARCHAR(120),               -- "AC repair", "Termite inspection", etc.
    system_type         VARCHAR(80),                -- HVAC: "central_ac", "heat_pump", etc.
    issue_description   TEXT,
    property_type       VARCHAR(50),                -- "residential", "commercial"
    urgency             VARCHAR(40),                -- "asap", "within_week", "planning_ahead"
    preferred_date      VARCHAR(40),
    status              VARCHAR(40) DEFAULT 'new',
    source_slug         VARCHAR(80),
    is_demo             INTEGER DEFAULT 1,
    created_at          TIMESTAMP DEFAULT NOW()
);

-- ── Demo deployment (replaces CurbIQ's PilotDeployment) ────────────────────

CREATE TABLE IF NOT EXISTS demo_deployment (
    id              VARCHAR(64) PRIMARY KEY,
    client_id       VARCHAR(64) REFERENCES clients(id),
    slug_id         VARCHAR(64) REFERENCES qr_slug(slug_id),
    demo_url        VARCHAR(300),
    production_url  VARCHAR(300),
    activated_at    TIMESTAMP,
    status          VARCHAR(40) DEFAULT 'demo',   -- "demo" | "active" | "inactive"
    created_at      TIMESTAMP DEFAULT NOW()
);

-- ── Routing + integration config (identical to CurbIQ) ─────────────────────

CREATE TABLE IF NOT EXISTS routing_configs (
    id                  VARCHAR(64) PRIMARY KEY,
    client_id           VARCHAR(64) REFERENCES clients(id),
    base_redirect_host  VARCHAR(200) NOT NULL,
    cache_ttl_seconds   INTEGER DEFAULT 60,
    brand_color_primary VARCHAR(20),
    brand_color_accent  VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS integration_configs (
    id              VARCHAR(64) PRIMARY KEY,
    client_id       VARCHAR(64) REFERENCES clients(id),
    provider        VARCHAR(80) NOT NULL,           -- "hubspot", "followupboss", "n8n"
    integration_type VARCHAR(40) NOT NULL,          -- "crm", "notification", "webhook"
    status          VARCHAR(40) DEFAULT 'not_connected',
    config          JSONB DEFAULT '{}',
    created_at      TIMESTAMP DEFAULT NOW()
);

-- ── Event + EdgeInteraction (identical to CurbIQ, QR attribution layer) ────

CREATE TABLE IF NOT EXISTS event (
    event_id            VARCHAR(64) PRIMARY KEY,
    client_id           VARCHAR(64) REFERENCES clients(id),
    event_type          VARCHAR(100) NOT NULL,
    entity_type         VARCHAR(80) NOT NULL,
    entity_id           VARCHAR(64) NOT NULL,
    occurred_at         TIMESTAMP DEFAULT NOW(),
    source_system       VARCHAR(80),
    idempotency_key     VARCHAR(200) UNIQUE,
    payload_json        JSONB DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS edge_interaction (
    interaction_id  VARCHAR(64) PRIMARY KEY,
    client_id       VARCHAR(64) REFERENCES clients(id),
    slug_id         VARCHAR(64) REFERENCES qr_slug(slug_id),
    channel         VARCHAR(50),                    -- "qr", "nfc", "web"
    event_type      VARCHAR(80) NOT NULL,
    session_id      VARCHAR(100),
    occurred_at     TIMESTAMP DEFAULT NOW(),
    consent_status  VARCHAR(40)
);

-- ── Audit trail (identical to CurbIQ) ──────────────────────────────────────

CREATE TABLE IF NOT EXISTS audit_event (
    id              VARCHAR(64) PRIMARY KEY,
    client_id       VARCHAR(64) REFERENCES clients(id),
    action          VARCHAR(100) NOT NULL,
    actor_type      VARCHAR(40) NOT NULL,
    actor_id        VARCHAR(64),
    entity_type     VARCHAR(80) NOT NULL,
    entity_id       VARCHAR(64) NOT NULL,
    details         JSONB DEFAULT '{}',
    created_at      TIMESTAMP DEFAULT NOW()
);

-- ── Indexes ─────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_lead_client ON lead(client_id);
CREATE INDEX IF NOT EXISTS idx_lead_status ON lead(status);
CREATE INDEX IF NOT EXISTS idx_service_request_lead ON service_request(lead_id);
CREATE INDEX IF NOT EXISTS idx_service_request_client ON service_request(client_id);
CREATE INDEX IF NOT EXISTS idx_service_request_status ON service_request(status);
CREATE INDEX IF NOT EXISTS idx_qr_slug_code ON qr_slug(slug_code);
CREATE INDEX IF NOT EXISTS idx_event_entity ON event(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_edge_session ON edge_interaction(session_id);
CREATE INDEX IF NOT EXISTS idx_audit_client ON audit_event(client_id);
