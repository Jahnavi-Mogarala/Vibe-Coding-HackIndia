import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name, code } = await req.json();
    const id = params.id;

    const updated = await prisma.project.update({
      where: { id: id },
      data: {
        name: name,
        // Update updated timestamp flag
      },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ message: "Mock Update saved." });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    await prisma.project.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: "Successfully deleted project workspace." });
  } catch (err: any) {
    return NextResponse.json({ message: "Mock delete operations completed." });
  }
}
