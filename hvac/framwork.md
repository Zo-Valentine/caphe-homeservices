Yes. The model you're describing is a QR-to-Lead Demo Factory: a reusable, live demonstration that you customize for each HVAC or local-service business.

The customer experience is:

Scan QR → branded welcome screen → interactive intake → estimate/qualification → business reviews → lead submission → CRM.

And your sales experience is:

Find business → collect public business data → customize demo → deploy Vercel URL → generate QR → send demo to owner → convert to paid client.

I would make Vercel the default demo and delivery platform, not AWS. You don't need to operate an AWS server just to demonstrate a working landing page and intake workflow.

## 1. The business model: sell the working system, not the mockup

There are three ways to package this.

| Model                | What the client receives             | How Caphè earns         |
| -------------------- | ------------------------------------ | ----------------------- |
| Demo-to-client       | Personalized live demo and QR        | Setup/conversion fee    |
| Website subscription | Hosted landing page, intake, QR      | Monthly subscription    |
| Lead infrastructure  | Website, CRM, automation, monitoring | Setup + monthly service |

My recommendation is to use all three sequentially:

1. Give prospects a personalized, functional demo.
2. Convert them to a website subscription.
3. Expand into CRM, lead automation, monitoring, and analytics.

The QR is your sales demonstration. The intake and CRM integration are the product.

## 2. The modular demo architecture

I would separate the system into five components.

QR / SHORT-LINK ROUTER

caphe.io/q/acme-hvac

CLIENT CONFIGURATION

Brand · HVAC services · colors · phone · location · reviews

LIVE DEMO EXPERIENCE

Welcome screen · intake form · qualification · estimate request

LEAD DATABASE

PostgreSQL

AUTOMATION

n8n + CRM

CLIENT CONVERSION & MONITORING

Lead attribution · notifications · uptime · reporting

The key architectural principle: the form is reusable; the client configuration changes.

For example, the same intake engine can load:

- HVAC: AC repair, heating, installation, maintenance.
- Pest control: termites, rodents, general pest control.
- Plumbing: leaks, drains, water heaters.
- Roofing: inspection, repair, replacement.
- Electrical: panel, wiring, installation.

Each industry has its own question set, qualification logic, and conversion CTA.

## 3. Vercel-only demo versus AWS



Recommended for MVP

&#x20;Vercel demo factory



Vercel supports preview deployments with unique URLs, and production deployments with their own domains. It also supports deployments through Git, CLI, and its API. This makes it practical to generate a personalized demo per prospect.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://vercel.com\&sz=32)

vercel.com+1



| Requirement           | Vercel-only approach              |
| --------------------- | --------------------------------- |
| Demo website          | Vercel deployment                 |
| Personalized branding | Client JSON configuration         |
| QR code               | Permanent Caphè redirect URL      |
| Intake form           | React/Next.js form                |
| Form processing       | Vercel Function or n8n webhook    |
| Lead storage          | Supabase/PostgreSQL               |
| CRM integration       | n8n                               |
| Monitoring            | Uptime Kuma / external monitoring |

You do not need AWS for this architecture.

One caveat: Vercel preview URLs can have deployment protection enabled. For a prospect who needs to scan a QR without logging in, deploy a publicly accessible demo URL rather than assuming every preview URL is public.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://vercel.com\&sz=32)

Vercel Academy+1



My preferred hosting pattern:

- `demo.caphe.io/acme-hvac` — public prospect demo.
- `demo.caphe.io/abc-plumbing` — another prospect demo.
- `q.caphe.io/acme-hvac` — permanent QR destination.
- `acmehvac.com` — client's production website after conversion.

The first three can be served by one application and one configuration database. You do not need a separate Vercel project for every prospect.

### What about Cloudflare?

Cloudflare Workers and Pages Functions can also host the dynamic form endpoints without a dedicated server. They support server-side form processing and integrations with storage services.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developers.cloudflare.com\&sz=32)

Get started · Cloudflare Pages docs+2



I would keep Cloudflare as an alternative hosting or routing layer, not introduce both platforms unnecessarily in the first MVP.

## 4. Make the intake feel like Typeform

I would not make Typeform the foundation. Build your own reusable intake engine with a Typeform-style experience.

HVAC demo experience

# Let's get your home comfortable again.

Welcome to ACME Heating & Cooling. Tell us what is happening and we'll help you get started.

[AC Repair Cost (2026): Air Conditioner Pricing, Troubleshooting & Replacement Guide - HVAC Services Pro](https://images.openai.com/static-rsc-4/ChI4Z0LaTns4ijr9QyKBQlJN2qyCEkHmNSG1X2G2GGVDrhjWeXxWwaeuzXowwxt_WPXeSNaF6z6DGLwZGNd9ldXgL_RCSmhyl8BuK2S3w_Vf9rekIcHRGU4TKGO4B6Y1lGdhPSdL7wyP3R-NJDq_H9XAG86SKfjklbO76cyoAA4?purpose=inline)

[hvacservicespro.com](https://hvacservicespro.com/ac-repair-cost-pricing-guide/?utm_source=chatgpt.com)

What do you need help with?

AC repair

Heating repair

New system installation

System maintenance

How soon do you need help?

As soon as possible

Within a week

I'm planning ahead

Property type

Residential

Commercial

Continue demo intake&#x20;

Interactive concept only; this preview does not submit a real customer lead.

The real form should have reusable steps:

1. Welcome / business-branded introduction.
2. Service selection.
3. Problem description.
4. Property details.
5. Scheduling preference.
6. Contact information.
7. Confirmation and next steps.

Each step is configured by industry. You can turn questions on or off without rewriting the form.

### Reviews as a trust module

Your demo should have a configurable review section:

- Yelp rating and review count.
- Selected review excerpts where permitted.
- Link to the original Yelp business listing.
- Google review content, if separately authorized and sourced.

Yelp's API currently offers up to three review excerpts through its reviews endpoint, with access dependent on the applicable API plan. It does not provide unrestricted full review text or arbitrary hand-picked reviews.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://docs.developer.yelp.com\&sz=32)

docs.developer.yelp.com+2



I would never populate the demo with fabricated reviews or present another business's reviews as the prospect's reviews. For an unclaimed or unverified business, show a neutral review placeholder until the listing is matched.

## 5. The actual reusable project structure

This is the directory I would build:

```
caphe-qr-demo-factory/
│
├── apps/
│   ├── demo-frontend/
│   └── admin-dashboard/
│
├── config/
│   ├── clients/
│   │   └── acme-hvac.json
│   │
│   ├── industries/
│   │   ├── hvac.json
│   │   ├── plumbing.json
│   │   ├── pest-control.json
│   │   └── roofing.json
│   │
│   └── themes/
│       ├── industrial.json
│       ├── premium.json
│       └── local-service.json
│
├── components/
│   ├── welcome-screen/
│   ├── service-selector/
│   ├── intake-form/
│   ├── estimate-module/
│   ├── review-module/
│   ├── contact-capture/
│   ├── confirmation/
│   └── qr-display/
│
├── modules/
│   ├── qr-router/
│   ├── client-config/
│   ├── lead-api/
│   ├── review-provider/
│   ├── crm-adapters/
│   ├── attribution/
│   └── monitoring/
│
├── workflows/
│   ├── new-prospect.json
│   ├── create-demo.json
│   ├── capture-lead.json
│   ├── crm-sync.json
│   └── monitoring.json
│
└── infrastructure/
    ├── vercel/
    ├── database/
    └── n8n/
```

## 6. The most important piece: client configuration

Instead of rebuilding each client's website, change this JSON:

```
{
  "client_id": "acme-hvac",
  "business_name": "ACME Heating & Cooling",
  "industry": "hvac",

  "deployment": {
    "environment": "demo",
    "public_url": "demo.caphe.io/acme-hvac"
  },

  "qr": {
    "slug": "acme-hvac",
    "destination": "/acme-hvac"
  },

  "branding": {
    "primary_color": "#183B56",
    "accent_color": "#F4A62A",
    "theme": "industrial"
  },

  "intake": {
    "enabled": true,
    "type": "multi_step",
    "services": [
      "ac_repair",
      "heating",
      "installation",
      "maintenance"
    ],
    "estimate_mode": "request_only"
  },

  "reviews": {
    "provider": "yelp",
    "enabled": true,
    "listing_verified": false
  },

  "crm": {
    "mode": "standalone",
    "provider": null
  }
}
```

That is the engine. A new prospect becomes a new configuration, not a new codebase.

## 7. The deployment and sales sequence

1. Discover a prospect

   Find an HVAC business with a weak website, no website, or poor lead capture.
2. Create a business profile

   Collect logo, services, public contact details, service areas, brand colors, and verified review information.
3. Generate the demo

   Apply the HVAC industry configuration and client theme to the reusable landing-page renderer.
4. Deploy to Vercel

   Produce a public demo URL that the owner can open without logging into your Vercel account.
5. Generate the QR slug

   `q.caphe.io/acme-hvac` redirects to the demo URL. Track scans and campaign source.
6. Send the demo to the business

   Let the owner scan the QR and test the intake themselves.
7. Convert and activate

   Connect the actual CRM, configure the live domain, and activate monitoring after authorization.

One distinction matters: label prospect pages as interactive Caphè demos, not official company websites. Don't accept real customer information into an unapproved prospect demo. Use test submissions until the business authorizes production intake.

## 8. What I would actually sell

| Product         | Commercial purpose               |
| --------------- | -------------------------------- |
| QR Demo         | Acquisition tool; free           |
| Website Launch  | One-time setup + monthly hosting |
| Intake + CRM    | Additional integration fee       |
| Lead Automation | Recurring workflow service       |
| Monitoring      | Recurring managed service        |

A QR scan is the beginning of the customer journey, not the entire product.

My recommendation: build one multi-tenant Next.js application on Vercel, one configuration-driven intake engine, one PostgreSQL database, and n8n as the integration layer. Keep the CRM adapters independent.

This gives you a repeatable demo factory without AWS infrastructure or a separate site build for every prospect.

The next build milestone should be the HVAC demo template with a live multi-step intake, review module, QR slug routing, and a test lead inbox. That is the smallest demonstration that proves the whole business model.