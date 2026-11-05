import { NextRequest, NextResponse } from "next/server";

// Demo mode: logs the submission but does not persist it.
// Production: forward to the FastAPI lead engine via LEAD_WEBHOOK_URL.
export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.isTestSubmission || body.environment === "demo") {
    console.log("[demo lead]", JSON.stringify(body));
    return NextResponse.json({ status: "demo", received: true });
  }

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Lead webhook not configured" },
      { status: 503 }
    );
  }

  const upstream = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!upstream.ok) {
    return NextResponse.json({ error: "Upstream lead error" }, { status: 502 });
  }

  return NextResponse.json({ status: "received" });
}
