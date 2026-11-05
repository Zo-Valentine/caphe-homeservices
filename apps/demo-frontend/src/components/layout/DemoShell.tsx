"use client";

import type { ClientConfig } from "@/types";
import { buildCSSVars } from "@/lib/config";
import DemoBanner from "./DemoBanner";

interface Props {
  config: ClientConfig;
  qrEntry: boolean;
  children: React.ReactNode;
}

export default function DemoShell({ config, qrEntry, children }: Props) {
  const cssVars = buildCSSVars({
    themeId: config.template,
    displayName: config.template,
    colors: {
      primary: config.branding.primaryColor,
      accent: config.branding.accentColor,
      background: "#0f1923",
      surface: "#1b2a38",
      text: "#f5f0e8",
      muted: "#8a9baa",
    },
    typography: { headingFont: "Arial", bodyFont: "Arial" },
    heroHeadline: "",
    heroSubtext: "",
  });

  return (
    <div style={cssVars as React.CSSProperties}>
      {config.environment === "demo" && <DemoBanner qrEntry={qrEntry} />}

      <header
        style={{ borderBottom: "4px solid var(--color-accent)", padding: "16px 24px" }}
      >
        <div style={{ fontWeight: 900, fontSize: "20px", letterSpacing: "-0.5px" }}>
          {config.branding.businessName.toUpperCase()}
        </div>
        {config.branding.tagline && (
          <div style={{ fontSize: "13px", color: "var(--color-muted)" }}>
            {config.branding.tagline}
          </div>
        )}
      </header>

      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 16px" }}>
        {children}
      </main>

      <footer style={{ padding: "24px", textAlign: "center", fontSize: "12px", color: "var(--color-muted)" }}>
        Powered by Caphè &middot; {config.environment === "demo" ? "Demo v0.1" : ""}
      </footer>
    </div>
  );
}
