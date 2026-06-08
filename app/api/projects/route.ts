import { NextRequest, NextResponse } from "next/server";
import { getMockSketchThumbnail } from "@/lib/utils";

// List user projects — client uses localStorage, this is just a fallback
export async function GET() {
  return NextResponse.json([]);
}

// Create new project — client uses localStorage, this is just a fallback
export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    const fallbackId = `project-${Math.random().toString(36).substring(2, 7)}`;
    return NextResponse.json({
      id: fallbackId,
      name: name || "Untitled Sketch Layout",
      thumbnail: getMockSketchThumbnail(),
      updatedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
