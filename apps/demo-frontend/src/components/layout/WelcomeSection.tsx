"use client";

import Image from "next/image";
import type { ClientConfig } from "@/types";

interface Props {
  config: ClientConfig;
  onStartIntake: () => void;
}

export default function WelcomeSection({ config, onStartIntake }: Props) {
  const { branding, intake } = config;
  const hasImage = !!branding.heroImageUrl;

  return (
    <section
      style={{
        background: `linear-gradient(130deg, ${branding.primaryColor}f0 0%, ${branding.primaryColor}cc 100%)`,
        borderBottom: `6px solid ${branding.accentColor}`,
        padding: "60px 0 48px",
        marginBottom: "0",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: hasImage ? "1.2fr 0.8fr" : "1fr",
          gap: "40px",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* Left — text */}
        <div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 900,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: branding.accentColor,
              marginBottom: "16px",
            }}
          >
            {branding.tagline ?? branding.serviceAreaLabel}
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 68px)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-3px",
              margin: "0 0 20px",
              color: "#ffffff",
            }}
          >
            {branding.heroHeadline ?? branding.businessName}
          </h1>

          <p
            style={{
              fontSize: "17px",
              color: "rgba(255,255,255,0.8)",
              maxWidth: "520px",
              lineHeight: 1.6,
              marginBottom: "32px",
            }}
          >
            {branding.heroSubtext ?? "Tell us what you need. We’ll help you take the next step."}
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              onClick={onStartIntake}
              style={{
                padding: "16px 28px",
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
              Start Service Request
            </button>

            {branding.phone && (
              <a
                href={`tel:${branding.phone}`}
                style={{
                  padding: "16px 24px",
                  background: "rgba(255,255,255,0.12)",
                  color: "#ffffff",
                  fontWeight: 900,
                  fontSize: "15px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderRadius: "4px",
                  textDecoration: "none",
                  letterSpacing: "0.3px",
                }}
              >
                Call {branding.phone}
              </a>
            )}
          </div>

          {/* Quick service tags */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "24px" }}>
            {intake.services.slice(0, 4).map((s) => (
              <span
                key={s}
                style={{
                  fontSize: "12px",
                  padding: "5px 10px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "20px",
                  color: "rgba(255,255,255,0.75)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Right — vehicle / hero image */}
        {hasImage && (
          <div
            style={{
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            <Image
              src={branding.heroImageUrl!}
              alt={`${branding.businessName} service vehicle`}
              width={600}
              height={500}
              style={{ display: "block", width: "100%", height: "auto", objectFit: "cover" }}
              priority
            />
            {branding.serviceAreaLabel && (
              <div
                style={{
                  padding: "10px 14px",
                  background: "rgba(0,0,0,0.6)",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                {branding.serviceAreaLabel}
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 720px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
