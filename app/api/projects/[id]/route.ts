import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Client handles saves via localStorage — this is a no-op fallback
  return NextResponse.json({ message: "Saved via client storage." });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Client handles deletes via localStorage — this is a no-op fallback
  return NextResponse.json({ message: "Deleted via client storage." });
}
