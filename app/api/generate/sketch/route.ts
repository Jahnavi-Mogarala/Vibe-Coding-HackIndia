import { NextRequest, NextResponse } from "next/server";
import { generateCodeFromSketch } from "@/lib/claude";

export async function POST(req: NextRequest) {
  try {
    const { image, style, refinement, currentCode } = await req.json();

    if (!image && !refinement) {
      return NextResponse.json({ error: "Missing image or refinement parameter" }, { status: 400 });
    }

    // Call Claude Vision stream client helper (falls back to mock if no API key)
    const stream = await generateCodeFromSketch(image || "", style || "dark mode", refinement, currentCode);

    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream" },
    });
  } catch (err: any) {
    console.error("Generate route processing error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
