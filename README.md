# AllCity Home Services — Vercel demo

This repository is a standalone static-site deployment for the AllCity
Home Services redesign preview.

## Local preview

From the repository root, run:

```bash
python3 -m http.server 8037 --bind 127.0.0.1
```

Open [http://127.0.0.1:8037](http://127.0.0.1:8037). The calculator runs
entirely in the browser; it collects and sends no customer information.

## Vercel deployment

Import this repository into Vercel and use the **Other** framework preset.
The repository root is the project root; no build command or dependencies are
required, and the static output is the root directory. The supplied
`vercel.json` adds browser security headers and redirects the active demo QR
path `/q/allcity-vehicle` to the landing page while retaining the `qr`
attribution query parameter.

The QR path must stay synchronized with `config/qr-slugs.json`. Only the
currently active demo slug is routed by this static configuration. The
containerized application remains the source of truth for dynamic slug
validation and is not part of this static Vercel deployment.

## Calculator limitations

Calculator values are illustrative placeholders, not approved AllCity prices,
offers, estimates, or quotes. Customers should call AllCity to confirm current
services and pricing. No lead form, analytics, backend, or external service is
connected. Do not treat demo amounts as business pricing.
