import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const usage = {
      plan: "Free",
      generationsUsed: 3,
      limit: 10,
    };
    return NextResponse.json(usage);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
