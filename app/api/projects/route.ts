import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getMockSketchThumbnail } from "@/lib/utils";

// List user projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (err) {
    // If Prisma is not fully configured, return an empty array to allow frontend mock fallback to operate
    return NextResponse.json([]);
  }
}

// Create new project
export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    
    // Seed standard mock user in db to map project ownership safely
    let firstUser = await prisma.user.findFirst();
    if (!firstUser) {
      firstUser = await prisma.user.create({
        data: {
          clerkId: "clerk-vibe-mock-id",
          email: "vibe-coder@hackindia.com",
          plan: "Free",
        },
      });
    }

    const project = await prisma.project.create({
      data: {
        userId: firstUser.id,
        name: name || "Untitled Sketch Layout",
        thumbnail: getMockSketchThumbnail(),
      },
    });

    return NextResponse.json(project);
  } catch (err: any) {
    // Fallback Mock representation to run sandbox offline if DB is missing
    const fallbackId = `project-${Math.random().toString(36).substring(2, 7)}`;
    return NextResponse.json({
      id: fallbackId,
      name: "Mock Project Workspace",
      thumbnail: getMockSketchThumbnail(),
      updatedAt: new Date().toISOString(),
    });
  }
}
