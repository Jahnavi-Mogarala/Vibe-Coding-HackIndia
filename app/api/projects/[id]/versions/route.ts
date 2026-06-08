import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const versions = await prisma.version.findMany({
      where: { projectId: params.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(versions);
  } catch (err) {
    return NextResponse.json([]);
  }
}
