"use client";

import { useState } from "react";
import type { ClientConfig, IntakeFormData } from "@/types";

interface Props {
  config: ClientConfig;
  data: IntakeFormData;
  onNext: (patch: Partial<IntakeFormData>) => void;
}

export default function IssueDetails({ data, onNext }: Props) {
  const [description, setDescription] = useState(data.issueDescription ?? "");

  return (
    <div>
      <h2 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, marginBottom: "8px" }}>
        Tell us what&apos;s happening.
      </h2>
      <p style={{ color: "var(--color-muted)", marginBottom: "24px" }}>
        A brief description helps us route your request faster.
      </p>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        placeholder="e.g. AC stopped blowing cold air last night. House is 2,400 sq ft."
        style={{
          width: "100%",
          background: "var(--color-surface)",
          border: "1px solid var(--color-muted)",
          borderRadius: "6px",
          color: "var(--color-text)",
          padding: "14px",
          fontSize: "15px",
          resize: "vertical",
          marginBottom: "16px",
        }}
      />
      <button
        onClick={() => onNext({ issueDescription: description })}
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
