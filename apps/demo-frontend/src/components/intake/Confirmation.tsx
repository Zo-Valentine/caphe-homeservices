"use client";

import type { ClientConfig, IntakeFormData } from "@/types";

interface Props {
  config: ClientConfig;
  data: IntakeFormData;
  onNext: (patch: Partial<IntakeFormData>) => void;
}

export default function Confirmation({ config, data }: Props) {
  const isDemo = config.environment === "demo";

  return (
    <div style={{ textAlign: "center", padding: "32px 0" }}>
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: "var(--color-accent)",
          margin: "0 auto 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
        }}
      >
        ✓
      </div>

      <h2 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, marginBottom: "12px" }}>
        {isDemo ? "Demo complete." : "Request received."}
      </h2>

      <p style={{ color: "var(--color-muted)", maxWidth: "420px", margin: "0 auto 24px" }}>
        {isDemo
          ? "This was a demonstration. No request was sent."
          : `We received your ${data.service ?? "service"} request. ${config.branding.businessName} will contact you at ${data.phone ?? "the number you provided"} to confirm your appointment.`}
      </p>

      {!isDemo && config.branding.phone && (
        <a
          href={`tel:${config.branding.phone}`}
          style={{
            display: "inline-block",
            padding: "14px 28px",
            background: "var(--color-accent)",
            color: "#0f1923",
            fontWeight: 900,
            borderRadius: "4px",
            textDecoration: "none",
          }}
        >
          Call {config.branding.phone}
        </a>
      )}
    </div>
  );
}
