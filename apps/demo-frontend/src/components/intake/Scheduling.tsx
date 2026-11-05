"use client";

import { useState } from "react";
import type { ClientConfig, IntakeFormData, Urgency } from "@/types";

interface Props {
  config: ClientConfig;
  data: IntakeFormData;
  onNext: (patch: Partial<IntakeFormData>) => void;
}

const URGENCY_OPTIONS: { value: Urgency; label: string; description: string }[] = [
  { value: "asap", label: "As soon as possible", description: "I need service within 24–48 hours." },
  { value: "within_week", label: "Within a week", description: "Flexible but want it scheduled soon." },
  { value: "planning_ahead", label: "I'm planning ahead", description: "No urgency — exploring options." },
];

export default function Scheduling({ data, onNext }: Props) {
  const [urgency, setUrgency] = useState<Urgency>(data.urgency ?? "within_week");

  return (
    <div>
      <h2 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, marginBottom: "24px" }}>
        How soon do you need help?
      </h2>

      <div style={{ display: "grid", gap: "12px", marginBottom: "24px" }}>
        {URGENCY_OPTIONS.map(({ value, label, description }) => (
          <button
            key={value}
            onClick={() => setUrgency(value)}
            style={{
              padding: "16px 20px",
              background: urgency === value ? "var(--color-primary)" : "var(--color-surface)",
              border: `2px solid ${urgency === value ? "var(--color-accent)" : "var(--color-muted)"}`,
              borderRadius: "6px",
              color: "var(--color-text)",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            <div style={{ fontWeight: 900, marginBottom: "2px" }}>{label}</div>
            <div style={{ fontSize: "13px", color: "var(--color-muted)" }}
              dangerouslySetInnerHTML={{ __html: description }} />
          </button>
        ))}
      </div>

      <button
        onClick={() => onNext({ urgency })}
        style={{
          padding: "14px 28px",
          background: "var(--color-accent)",
          color: "#0f1923",
          fontWeight: 900,
          border: 0,
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "15px",
        }}
      >
        Continue
      </button>
    </div>
  );
}
