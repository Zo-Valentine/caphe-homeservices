"use client";

import type { ClientConfig, IntakeFormData } from "@/types";

interface Props {
  config: ClientConfig;
  data: IntakeFormData;
  onNext: (patch: Partial<IntakeFormData>) => void;
}

export default function ServiceSelector({ config, onNext }: Props) {
  return (
    <div>
      <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, lineHeight: 1, marginBottom: "24px" }}>
        What do you need help with?
      </h1>
      <div style={{ display: "grid", gap: "12px" }}>
        {config.intake.services.map((service) => (
          <button
            key={service}
            onClick={() => onNext({ service })}
            style={{
              padding: "18px 24px",
              background: "var(--color-surface)",
              border: "1px solid var(--color-muted)",
              borderRadius: "6px",
              color: "var(--color-text)",
              fontSize: "16px",
              fontWeight: 700,
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            {service}
          </button>
        ))}
      </div>
    </div>
  );
}
