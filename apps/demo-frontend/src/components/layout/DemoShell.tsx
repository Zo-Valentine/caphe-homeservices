"use client";

import { useCallback } from "react";
import type { ClientConfig } from "@/types";
import { buildCSSVars } from "@/lib/config";
import DemoBanner from "./DemoBanner";
import WelcomeSection from "./WelcomeSection";
import ServicesGrid from "./ServicesGrid";
import FlowSection from "./FlowSection";

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

  const scrollToIntake = useCallback(() => {
    const el = document.getElementById("intake");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div style={{ ...(cssVars as React.CSSProperties), background: "#0f1923", color: "#f5f0e8", minHeight: "100vh" }}>
      {config.environment === "demo" && <DemoBanner qrEntry={qrEntry} />}

      {/* Slim nav bar */}
      <header
        style={{
          borderBottom: "3px solid var(--color-accent)",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0a111a",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div>
          <div style={{ fontWeight: 900, fontSize: "18px", letterSpacing: "-0.5px", color: "#f5f0e8" }}>
            {config.branding.businessName.toUpperCase()}
          </div>
          {config.branding.tagline && (
            <div style={{ fontSize: "11px", color: "var(--color-muted)", letterSpacing: "0.5px" }}>
              {config.branding.tagline}
            </div>
          )}
        </div>
        {config.branding.phone && (
          <a
            href={`tel:${config.branding.phone}`}
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "var(--color-accent)",
              textDecoration: "none",
            }}
          >
            {config.branding.phone}
          </a>
        )}
      </header>

      {/* Hero */}
      <WelcomeSection config={config} onStartIntake={scrollToIntake} />

      {/* Services */}
      <ServicesGrid config={config} onSelectService={scrollToIntake} />

      {/* How it works */}
      <FlowSection config={config} onStartIntake={scrollToIntake} />

      {/* Intake form anchor */}
      <div id="intake" style={{ scrollMarginTop: "60px" }}>
        <div
          style={{
            background: "#0f1923",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "48px 0 0",
          }}
        >
          <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 900,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: config.branding.accentColor,
                marginBottom: "8px",
              }}
            >
              Service Request
            </div>
            <h2
              style={{
                fontSize: "clamp(22px, 4vw, 32px)",
                fontWeight: 900,
                letterSpacing: "-1px",
                color: "#f5f0e8",
                margin: "0 0 32px",
              }}
            >
              Tell us what you need
            </h2>

            {children}
          </div>
        </div>
      </div>

      <footer
        style={{
          padding: "32px 24px",
          textAlign: "center",
          fontSize: "12px",
          color: "#8a9baa",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          marginTop: "48px",
        }}
      >
        Powered by Caphè{config.environment === "demo" ? " · Demo" : ""}
      </footer>
    </div>
  );
}
