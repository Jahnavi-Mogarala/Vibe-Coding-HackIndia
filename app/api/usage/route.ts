import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  // Client handles usage tracking via localStorage
  return NextResponse.json({
    plan: "Free",
    generationsUsed: 0,
    limit: 50,
  });
}
