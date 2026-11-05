"use client";

import type { ClientConfig } from "@/types";

interface Props {
  slug: string;
  config: ClientConfig;
}

export default function QRDisplay({ slug, config }: Props) {
  const slugUrl = `q.caphe.io/${slug}`;

  return (
    <section style={{ marginTop: "48px", padding: "24px", background: "var(--color-surface)", borderRadius: "8px" }}>
      <div
        style={{
          fontSize: "11px",
          fontWeight: 900,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "var(--color-accent)",
          marginBottom: "8px",
        }}
      >
        QR Destination
      </div>
      <div style={{ fontFamily: "monospace", fontSize: "18px", fontWeight: 700, marginBottom: "6px" }}>
        {slugUrl}
      </div>
      <p style={{ fontSize: "13px", color: "var(--color-muted)", margin: "0 0 16px" }}>
        QR code resolves to this stable slug, which loads the client&apos;s current
        {config.environment === "demo" ? " demo" : " production"} configuration.
      </p>
      <div
        style={{
          width: "120px",
          height: "120px",
          background: "#fff",
          border: "1px solid #333",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "11px",
          color: "#666",
          borderRadius: "4px",
        }}
      >
        QR generated after client setup
      </div>
    </section>
  );
}
