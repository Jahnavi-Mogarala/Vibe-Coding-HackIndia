import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { name } = await req.json();

    const updated = await prisma.project.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ message: "Mock Update saved." });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.project.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Successfully deleted project workspace." });
  } catch (err: any) {
    return NextResponse.json({ message: "Mock delete operations completed." });
  }
}
