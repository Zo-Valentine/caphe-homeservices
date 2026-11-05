"use client";

import type { ClientConfig } from "@/types";

interface Props {
  config: ClientConfig;
  onStartIntake: () => void;
}

const STEPS = [
  {
    number: "01",
    icon: "📱",
    title: "Scan or tap",
    body: "Scan the QR code on our service vehicle, yard sign, or tap a link to open your request form instantly.",
  },
  {
    number: "02",
    icon: "📋",
    title: "Tell us what's happening",
    body: "Answer a few quick questions about your property and what you need. No login, no account required.",
  },
  {
    number: "03",
    icon: "📞",
    title: "We call you back",
    body: "Your request goes straight to our team. We follow up within hours — sometimes minutes.",
  },
];

export default function FlowSection({ config, onStartIntake }: Props) {
  const { branding } = config;

  return (
    <section
      style={{
        background: "#1b2a38",
        borderTop: `1px solid rgba(255,255,255,0.06)`,
        borderBottom: `1px solid rgba(255,255,255,0.06)`,
        padding: "64px 0",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: "48px", textAlign: "center" }}>
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
            How it works
          </div>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 900,
              letterSpacing: "-1.5px",
              color: "#f5f0e8",
              margin: "0 auto",
              maxWidth: "480px",
            }}
          >
            From scan to service call in under 2 minutes
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            marginBottom: "48px",
          }}
          className="flow-grid"
        >
          {STEPS.map((step, i) => (
            <div key={step.number} style={{ position: "relative" }}>
              {/* connector line */}
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    top: "32px",
                    right: "-12px",
                    width: "24px",
                    height: "2px",
                    background: `linear-gradient(90deg, ${branding.accentColor}80, ${branding.accentColor}20)`,
                    zIndex: 1,
                  }}
                  className="flow-connector"
                />
              )}
              <div
                style={{
                  background: "#0f1923",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  padding: "28px 24px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 900,
                      color: branding.accentColor,
                      letterSpacing: "1px",
                    }}
                  >
                    {step.number}
                  </span>
                  <span style={{ fontSize: "28px" }}>{step.icon}</span>
                </div>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#f5f0e8",
                    margin: "0 0 10px",
                    letterSpacing: "-0.3px",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#8a9baa",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            onClick={onStartIntake}
            style={{
              padding: "16px 32px",
              background: branding.accentColor,
              color: "#0f1923",
              fontWeight: 900,
              fontSize: "15px",
              border: 0,
              borderRadius: "4px",
              cursor: "pointer",
              letterSpacing: "0.3px",
            }}
          >
            Start your request now
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .flow-grid { grid-template-columns: 1fr !important; }
          .flow-connector { display: none; }
        }
      `}</style>
    </section>
  );
}
