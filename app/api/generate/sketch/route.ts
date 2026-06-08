import { NextRequest, NextResponse } from "next/server";
import { generateCodeFromSketch } from "@/lib/claude";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { image, style, refinement, currentCode, projectId } = await req.json();

    if (!image && !refinement) {
      return NextResponse.json({ error: "Missing image or refinement parameter" }, { status: 400 });
    }

    // Call standard Claude Vision stream client helper
    const stream = await generateCodeFromSketch(image || "", style || "dark mode", refinement, currentCode);

    // If projectId is active, try to auto-save to database asynchronously or fallback
    if (projectId && !projectId.startsWith("new-mock") && !projectId.startsWith("demo")) {
      try {
        // Collect full stream snippet to log into DB Version records
        const [streamForClient, streamForDb] = stream.tee();
        const reader = streamForDb.getReader();
        const decoder = new TextDecoder();
        let fullGeneratedCode = "";

        // Consume stream to capture complete code buffer in background
        (async () => {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            fullGeneratedCode += decoder.decode(value);
          }
          
          // Save database records
          await prisma.version.create({
            data: {
              projectId: projectId,
              sketchUrl: image || "Refined sketch update",
              generatedCode: fullGeneratedCode,
              stylePrompt: style || "dark mode",
            },
          });
        })().catch(console.error);

        return new Response(streamForClient, {
          headers: { "Content-Type": "text/event-stream" },
        });
      } catch (err) {
        console.error("Autosave record creation warning:", err);
      }
    }

    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream" },
    });
  } catch (err: any) {
    console.error("Generate route processing error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
