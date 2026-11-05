"use client";

import { useState } from "react";
import type { ClientConfig, IntakeFormData } from "@/types";

interface Props {
  config: ClientConfig;
  data: IntakeFormData;
  onNext: (patch: Partial<IntakeFormData>) => void;
}

export default function ContactCapture({ config, data, onNext }: Props) {
  const [name, setName] = useState(data.name ?? "");
  const [phone, setPhone] = useState(data.phone ?? "");
  const [email, setEmail] = useState(data.email ?? "");

  const isDemo = config.environment === "demo";
  const isValid = name.trim().length >= 2 && phone.replace(/\D/g, "").length >= 10;

  async function handleSubmit() {
    if (!isValid) return;

    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        name,
        phone,
        email,
        clientId: config.clientId,
        slug: config.routing.slug,
        environment: config.environment,
        isTestSubmission: isDemo,
      }),
    });

    onNext({ name, phone, email });
  }

  return (
    <div>
      <h2 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, marginBottom: "8px" }}>
        How should we reach you?
      </h2>
      {isDemo && (
        <p style={{ color: "var(--color-muted)", fontSize: "13px", marginBottom: "20px" }}>
          Demo mode — this information is not saved or sent anywhere.
        </p>
      )}

      <div style={{ display: "grid", gap: "16px", marginBottom: "24px" }}>
        <div>
          <label htmlFor="name" style={{ display: "block", fontWeight: 700, marginBottom: "6px" }}>
            Your name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First and last name"
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="phone" style={{ display: "block", fontWeight: 700, marginBottom: "6px" }}>
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(555) 000-0000"
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="email" style={{ display: "block", fontWeight: 700, marginBottom: "6px" }}>
            Email <span style={{ fontWeight: 400, color: "var(--color-muted)" }}>(optional)</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            style={inputStyle}
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isValid}
        style={{
          padding: "16px 32px",
          background: "var(--color-accent)",
          color: "#0f1923",
          fontWeight: 900,
          border: 0,
          borderRadius: "4px",
          cursor: isValid ? "pointer" : "not-allowed",
          opacity: isValid ? 1 : 0.5,
          fontSize: "16px",
          width: "100%",
        }}
      >
        {isDemo ? "Submit (demo)" : "Request Service"}
      </button>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--color-surface)",
  border: "1px solid var(--color-muted)",
  borderRadius: "6px",
  color: "var(--color-text)",
  padding: "13px 14px",
  fontSize: "15px",
};
