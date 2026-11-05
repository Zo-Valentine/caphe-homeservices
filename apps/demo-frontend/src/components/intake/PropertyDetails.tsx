"use client";

import { useState } from "react";
import type { ClientConfig, IntakeFormData, PropertyType } from "@/types";

interface Props {
  config: ClientConfig;
  data: IntakeFormData;
  onNext: (patch: Partial<IntakeFormData>) => void;
}

const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: "residential", label: "Single-family / residential" },
  { value: "commercial", label: "Commercial" },
  { value: "multi_unit", label: "Multi-unit / apartment" },
];

export default function PropertyDetails({ data, onNext }: Props) {
  const [propertyType, setPropertyType] = useState<PropertyType>(
    data.propertyType ?? "residential"
  );
  const [zipCode, setZipCode] = useState(data.zipCode ?? "");

  return (
    <div>
      <h2 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, marginBottom: "24px" }}>
        Tell us about your property.
      </h2>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", fontWeight: 700, marginBottom: "10px" }}>
          Property type
        </label>
        <div style={{ display: "grid", gap: "10px" }}>
          {PROPERTY_TYPES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setPropertyType(value)}
              style={{
                padding: "14px 20px",
                background: propertyType === value ? "var(--color-primary)" : "var(--color-surface)",
                border: `2px solid ${propertyType === value ? "var(--color-accent)" : "var(--color-muted)"}`,
                borderRadius: "6px",
                color: "var(--color-text)",
                fontWeight: propertyType === value ? 900 : 400,
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="zipCode"
          style={{ display: "block", fontWeight: 700, marginBottom: "8px" }}
        >
          ZIP code
        </label>
        <input
          id="zipCode"
          type="text"
          inputMode="numeric"
          maxLength={5}
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ""))}
          placeholder="90001"
          style={{
            width: "140px",
            background: "var(--color-surface)",
            border: "1px solid var(--color-muted)",
            borderRadius: "6px",
            color: "var(--color-text)",
            padding: "12px 14px",
            fontSize: "15px",
          }}
        />
      </div>

      <button
        onClick={() => onNext({ propertyType, zipCode })}
        disabled={zipCode.length !== 5}
        style={{
          padding: "14px 28px",
          background: "var(--color-accent)",
          color: "#0f1923",
          fontWeight: 900,
          border: 0,
          borderRadius: "4px",
          cursor: zipCode.length === 5 ? "pointer" : "not-allowed",
          opacity: zipCode.length === 5 ? 1 : 0.5,
          fontSize: "15px",
        }}
      >
        Continue
      </button>
    </div>
  );
}
