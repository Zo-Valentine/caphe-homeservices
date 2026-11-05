"use client";

interface Props {
  qrEntry: boolean;
}

export default function DemoBanner({ qrEntry }: Props) {
  return (
    <div
      role="status"
      style={{
        background: "#fff3cd",
        color: "#3b2b00",
        padding: "10px 16px",
        textAlign: "center",
        fontSize: "13px",
        fontWeight: 700,
      }}
    >
      {qrEntry
        ? "Demo mode · QR scan detected · No real leads are captured or saved."
        : "Demo mode · Interactive preview · No customer data is collected or stored."}
    </div>
  );
}
