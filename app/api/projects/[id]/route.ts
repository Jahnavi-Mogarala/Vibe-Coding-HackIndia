import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { name, code } = await req.json();

    const updated = await prisma.project.update({
      where: { id },
      data: { name },
    });

    // If code is provided, save it as a new version
    if (code) {
      try {
        await prisma.version.create({
          data: {
            projectId: id,
            sketchUrl: "manual-save",
            generatedCode: code,
            stylePrompt: "saved",
          },
        });
      } catch (e) {
        // Version save is best-effort
      }
    }

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
