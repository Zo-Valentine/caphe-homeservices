import { listSlugs, getClientConfig } from "@/data/clients";
import Link from "next/link";

export default function IndexPage() {
  const slugs = listSlugs();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-bg)",
        padding: "60px 24px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <div
          style={{
            fontSize: "11px",
            fontWeight: 900,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            marginBottom: "12px",
          }}
        >
          Caphè Home Services
        </div>
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-2px",
            margin: "0 0 12px",
          }}
        >
          Demo factory.
        </h1>
        <p style={{ color: "var(--color-muted)", marginBottom: "40px", fontSize: "16px" }}>
          Each link is a client demo. Scan a QR → land here → experience the intake.
          No real leads are captured in demo mode.
        </p>

        <div style={{ display: "grid", gap: "14px" }}>
          {slugs.map((slug) => {
            const config = getClientConfig(slug)!;
            return (
              <Link
                key={slug}
                href={`/${slug}`}
                style={{
                  display: "block",
                  padding: "20px 24px",
                  background: "var(--color-surface)",
                  border: "1px solid #333",
                  borderLeft: `4px solid ${config.branding.accentColor}`,
                  borderRadius: "6px",
                  textDecoration: "none",
                  color: "var(--color-text)",
                }}
              >
                <div style={{ fontWeight: 900, marginBottom: "4px" }}>
                  {config.branding.businessName}
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-muted)" }}>
                  {config.industry} &middot; {config.template} template &middot;{" "}
                  <span
                    style={{
                      color: config.environment === "demo" ? "#F4A62A" : "#00b894",
                    }}
                  >
                    {config.environment}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--color-muted)",
                    marginTop: "4px",
                    fontFamily: "monospace",
                  }}
                >
                  q.caphe.io/{config.routing.slug}
                </div>
              </Link>
            );
          })}
        </div>

        <p style={{ marginTop: "48px", fontSize: "12px", color: "var(--color-muted)" }}>
          Add a new client: drop a JSON file in{" "}
          <code>config/clients/</code> and register it in{" "}
          <code>src/data/clients/index.ts</code>.
        </p>
      </div>
    </div>
  );
}
