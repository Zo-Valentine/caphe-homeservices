import { NextRequest, NextResponse } from "next/server";
import { getClientConfig } from "@/data/clients";

export function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const config = getClientConfig(params.slug);
  if (!config) {
    return NextResponse.json({ error: "Config not found" }, { status: 404 });
  }
  return NextResponse.json(config);
}
