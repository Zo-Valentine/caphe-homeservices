"use client";

import type { ClientConfig } from "@/types";

interface Props {
  config: ClientConfig;
  onSelectService: (service: string) => void;
}

const INDUSTRY_ICONS: Record<string, string[]> = {
  hvac: ["❄️", "🔥", "🏠", "🔧", "💨"],
  pest_control: ["🏠", "🐛", "🐭", "🛡️", "🔍"],
  plumbing: ["🔧", "💧", "🚿", "🪠", "🏠"],
  electrical: ["⚡", "💡", "🔌", "🏠", "🔧"],
  roofing: ["🏠", "🔨", "🌧️", "🛠️", "🏗️"],
};

export default function ServicesGrid({ config, onSelectService }: Props) {
  const { branding, intake, industry } = config;
  const icons = INDUSTRY_ICONS[industry] ?? ["🔧", "🔧", "🔧", "🔧", "🔧"];

  return (
    <section
      style={{
        background: "#0f1923",
        padding: "56px 0",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: "36px" }}>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 900,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: branding.accentColor,
              marginBottom: "12px",
            }}
          >
            Services
          </div>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 900,
              letterSpacing: "-1.5px",
              color: "#f5f0e8",
              margin: 0,
            }}
          >
            What can we help you with?
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "12px",
          }}
        >
          {intake.services.map((service, i) => (
            <button
              key={service}
              onClick={() => onSelectService(service)}
              style={{
                padding: "20px",
                background: "#1b2a38",
                border: `1px solid rgba(255,255,255,0.08)`,
                borderRadius: "6px",
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = branding.accentColor;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
              }}
            >
              <span style={{ fontSize: "24px" }}>{icons[i % icons.length]}</span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#f5f0e8",
                  lineHeight: 1.3,
                }}
              >
                {service}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "#8a9baa",
                }}
              >
                Start request →
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
