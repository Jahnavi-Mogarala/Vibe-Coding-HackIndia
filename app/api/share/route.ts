import { NextRequest, NextResponse } from "next/server";

// GET handler — client handles shared previews via localStorage
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }
  // Client-side storage handles share lookups — this is a fallback
  return NextResponse.json({ error: "Preview not found" }, { status: 404 });
}

// POST handler — client handles share creation via localStorage
export async function POST(req: NextRequest) {
  try {
    const slug = Math.random().toString(36).substring(2, 8);
    return NextResponse.json({ slug });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
