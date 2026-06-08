/**
 * Claude API client helper to process raw base64 data and return code generation output.
 * If API Key is missing, fall back to smart demo outputs or generate template blocks.
 */

export async function generateCodeFromSketch(
  base64Image: string,
  stylePrompt: string = "dark mode",
  refinementPrompt?: string,
  currentCode?: string
): Promise<ReadableStream> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  // Expert UI Generation system instruction
  const systemPrompt = `You are an expert UI engineer. Analyze this hand-drawn wireframe sketch and convert it to a single production-ready React functional component using Tailwind CSS. Rules:
1. Identify every UI element by shape, text annotations, and context.
2. Use semantic HTML (header, nav, main, footer, section).
3. Add realistic placeholder text and dummy data.
4. Include interactive state styling (hover/focus, active buttons).
5. Make it visually polished and gorgeous (gradients, harmonious dark/light mode setup).
6. Output ONLY the JSX component code starting with 'export default function Component()' - no markdown, no explanation, no backticks formatting.`;

  // Standard user prompt
  const userPrompt = refinementPrompt 
    ? `We have existing generated code:
\`\`\`tsx
${currentCode}
\`\`\`
Please refine it based on this request: "${refinementPrompt}". Include styling modifiers: ${stylePrompt}. Maintain the component structure.`
    : `Please generate a component from this sketch image. Style modifiers: ${stylePrompt}. Make it clean, responsive, and complete.`;

  const encoder = new TextEncoder();

  // If no API key or it's a mock key, stream mock code after short delay chunks to simulate live streaming
  if (!apiKey || apiKey.includes("mock-anthropic")) {
    const mockCodeResponse = refinementPrompt && currentCode
      ? currentCode.replace(
          /<\/button>/,
          `</button>\n          <div className="p-3 bg-indigo-500/20 border border-indigo-500 rounded-lg text-xs text-indigo-300 mt-2 font-mono">Updated: ${refinementPrompt}</div>`
        )
      : `export default function Component() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-8 font-sans">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/10 rounded-full blur-xl"></div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">W</div>
          <div>
            <h2 className="text-lg font-bold text-white">Interactive Preview</h2>
            <p className="text-slate-400 text-xs">Generated based on: ${stylePrompt}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
            <span className="text-xs text-indigo-400 font-semibold tracking-wider uppercase">System Telemetry</span>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-slate-400">Sketch Recognition</span>
              <span className="text-emerald-400 font-mono">Ready</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-sm">
              <span className="text-slate-400">Response Speed</span>
              <span className="text-slate-200">120ms</span>
            </div>
          </div>

          <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 transition text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20">
            Action Trigger
          </button>
        </div>
      </div>
    </div>
  );
}`;

    return new ReadableStream({
      async start(controller) {
        // Stream back chunk-by-chunk with brief delays
        const chunkSize = 15;
        let index = 0;
        while (index < mockCodeResponse.length) {
          const chunk = mockCodeResponse.slice(index, index + chunkSize);
          controller.enqueue(encoder.encode(chunk));
          index += chunkSize;
          await new Promise((r) => setTimeout(r, 15));
        }
        controller.close();
      },
    });
  }

  // Real Anthropic Claude Vision API Implementation via standard HTTP fetch
  try {
    const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, "");
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 4000,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: "image/png",
                  data: cleanBase64,
                },
              },
              {
                type: "text",
                text: userPrompt,
              },
            ],
          },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API request failed with status ${response.status}`);
    }

    return new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const dataStr = trimmed.slice(5).trim();
            if (dataStr === "[DONE]") continue;

            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.type === "content_block_delta" && parsed.delta?.text) {
                controller.enqueue(encoder.encode(parsed.delta.text));
              }
            } catch (err) {
              // Ignore parsed events that aren't valid JSON line updates
            }
          }
        }
        controller.close();
      },
    });
  } catch (err: any) {
    console.error("Claude Vision API pipeline error:", err);
    // Stream back fallback code on real API failure
    return new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(`export default function Component() {
  return (
    <div className="p-8 text-center text-rose-400 bg-slate-900 rounded-xl border border-rose-500/20 max-w-md mx-auto mt-20">
      <h3 className="text-xl font-bold mb-2">Generation Fallback</h3>
      <p className="text-sm text-slate-400">Failed to call Claude API. Please double check your ANTHROPIC_API_KEY environment variable.</p>
    </div>
  );
}`)
        );
        controller.close();
      },
    });
  }
}
