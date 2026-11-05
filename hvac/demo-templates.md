The first build should be a reusable HVAC demo template, not a separate website or form for every prospect. Each business gets its own branding, QR slug, service options, reviews, and contact details; the underlying components and intake logic remain shared.

I’m treating “app/models” as reusable template models. I’d start with three design models and one shared intake engine:

1. Local Service — Industrial: HVAC, plumbing, electrical.
2. Home Comfort — Premium: HVAC installation, maintenance, indoor air quality.
3. Rapid Response — Emergency: urgent repairs and after-hours service.

The first working template below uses the Industrial model. It includes a welcome screen, multi-step intake, review section, QR destination, and a test lead inbox.

NORTHSTAR HVAC

Heating · Cooling · Home Comfort

Demo mode

HVAC · INDUSTRIAL TEMPLATE

# Comfort starts here.

Tell us what’s happening with your heating or cooling system. We’ll help you take the next step.

Quick service request · About 2 minutes

IntakeReviewsQR & Inbox

QR destination

Client slug

Active demo route

## q.caphe.io/northstar-hvac

QR code resolves to this stable slug, which loads the client's current demo configuration.

QR placeholder

Generated from the slug after client setup

Test lead inbox

Recent submissions

Sample data

Jordan Example

AC repair · Single-family home

Demo contact · ZIP 90001

Sample record · Not a real lead

Production inbox will support lead status, source slug, timestamp, assignment, and CRM sync.

Preview customer experience

Powered by Caphè · Template previewDemo v0.1

## 1. The template models

The visual system should be configuration-driven. These are the first three reusable design profiles:

[Air Conditioning & Heating HVAC Website Template by FleexStudio | Web Design Agency on Dribbble](https://images.openai.com/static-rsc-4/0uqnY_NPwKSDHPL6ViHXPIe9ei1J00nmjzsmkv9EK21YNgYm1czSfLJd4fTLxp35i8xHIcoksu-BhVYBK0oePfylbM9tuj4cRTorr6dsSbMrD-eDSTcxNvsbda95x6j7st9Z3IOpzTbs_VsmvzE2Y-pqyHd2qTVPBxthnouBtfQ?purpose=inline)

A. Industrial Local Service

First build

- Navy, orange, white
- Strong service-first headline
- Repair, maintenance, installation
- Best for HVAC, plumbing, electrical

[Home | Noble Heating & Air : Top-Rated Local HVAC Company in Portland](https://images.openai.com/static-rsc-4/0QhLSqCw-voAyAO5UymIxiGt60YlmUGACTPktHdU0QGMyAdjceOO2hwPGXPjW4Siw4nPdcXSAHtXRTvd96JhCZoqCzucJWCrbeKnyZGFrk7QwR9HhZtckIXb0dHVqXvUtzidLSf1YBd4uDWRzBXsq4bgPqHjips-dO2tmajQr60?purpose=inline)

B. Premium Home Comfort

- Warm neutrals, charcoal, muted gold
- Large photography and trust signals
- Installation, upgrades, maintenance plans
- Best for higher-ticket residential work

[Xian | HVAC Revenue Websites](https://images.openai.com/static-rsc-4/VNp_JtzMbyefrK9gh7kTZSqDBkpApKHKKdl6uftUcnVqCQ1iCJ9jesy6oveZxoN-KO11-Em1mmW2PW6BsAuM11XgvB8Umb81aeGT3b_PFL8rfz7r3eqdnhuuVdunoPlnBYkgAUwvygjBun9252HLhXePu0tx_wRVKoixOaND3YU?purpose=inline)

C. Rapid Response

- Dark charcoal, red, high-contrast CTA
- Prominent phone and urgent service request
- Shortened intake with urgency selection
- Best for emergency and after-hours services

## 2. Modular intake architecture

The intake should be a sequence of reusable modules, not a single fixed form.

| Module           | Purpose                        | Configurable? |
| ---------------- | ------------------------------ | ------------- |
| Welcome          | Brand, promise, CTA            | Yes           |
| Service selector | What customer needs            | Yes           |
| Issue details    | Description, symptoms          | Yes           |
| Property details | Residential/commercial         | Yes           |
| Scheduling       | Urgency and availability       | Yes           |
| Contact capture  | Name, phone, ZIP, email        | Yes           |
| Confirmation     | Next steps and contact details | Yes           |

Important design decision: the demo should support different intake paths by industry. HVAC might ask about system type and urgency; pest control might ask about infestation type and property size. The same step engine renders different questions based on the industry profile.

## 3. Configuration model

A client profile should control the experience without changing the application code.

```
{
  "clientId": "northstar-hvac",
  "industry": "hvac",
  "template": "industrial-local-service",
  "environment": "demo",
  "routing": {
    "slug": "northstar-hvac",
    "destination": "/d/northstar-hvac"
  },
  "branding": {
    "businessName": "Northstar HVAC",
    "primary": "#183B56",
    "accent": "#F4A62A",
    "logo": null
  },
  "intake": {
    "steps": [
      "service",
      "issue",
      "property",
      "scheduling",
      "contact",
      "confirmation"
    ],
    "services": [
      "AC repair",
      "Heating repair",
      "Installation",
      "Maintenance"
    ]
  },
  "reviews": {
    "provider": "manual",
    "verified": false,
    "enabled": true
  },
  "leadDestination": "test-inbox"
}
```

## 4. QR routing and test lead flow

## System flow

QR code on truck, flyer, or business card

q.caphe.io/northstar-hvac

Slug router

Find client configuration and demo/live mode

Reusable customer experience

Welcome → Intake → Reviews → Confirmation

Lead API

Validate → Store → Attribute source → Route

Demo

Test lead inbox

Production

Client CRM + n8n

The demo and production environments must be separated. A prospect testing the demo must never accidentally send a lead into a real business's CRM.

## 5. Recommended build stack

| Layer      | Recommended tool                   | Responsibility                    |
| ---------- | ---------------------------------- | --------------------------------- |
| Frontend   | Next.js + TypeScript               | Template renderer and intake      |
| UI         | Tailwind CSS + reusable components | Design system                     |
| Validation | Zod                                | Form and configuration validation |
| Database   | PostgreSQL / Supabase              | Clients, slugs, leads             |
| Automation | n8n                                | CRM routing and notifications     |
| CRM        | Twenty or existing client CRM      | Lead management                   |
| Hosting    | Vercel                             | Public demo and production app    |
| QR         | Generated SVG/PNG                  | Stable client slug                |

## 6. What to build next

I would build the project in this order:

1. Template engine: three themes, one shared renderer.
2. Intake engine: configurable steps and conditional questions.
3. QR router: stable client slug mapped to the current deployment/config.
4. Review adapter: manual reviews first, then authorized Yelp/API integrations.
5. Test lead inbox: view submissions, timestamps, source slug, and status.
6. Production switch: change a client from demo to live only after approval.

The prototype above is a front-end interaction model; it does not yet persist submissions or generate a real QR code. The next implementation milestone is to turn the configuration model into actual Next.js components and connect the test inbox to PostgreSQL.