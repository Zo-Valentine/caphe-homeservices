import { NextRequest, NextResponse } from "next/server";
import { getClientConfig } from "@/data/clients";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const config = getClientConfig(slug);
  if (!config) {
    return NextResponse.json({ error: "Config not found" }, { status: 404 });
  }
  return NextResponse.json(config);
}
