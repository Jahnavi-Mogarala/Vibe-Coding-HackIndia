"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SandpackProvider, SandpackLayout, SandpackPreview } from "@codesandbox/sandpack-react";
import { DEMO_PRESETS } from "@/lib/utils";

export default function PublicSharedPreviewPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try fetching code for slug, or fall back to demo templates
    const fetchCode = async () => {
      try {
        const response = await fetch(`/api/share?slug=${slug}`);
        if (response.ok) {
          const data = await response.json();
          setCode(data.code);
        } else {
          setCode(DEMO_PRESETS[0].code);
        }
      } catch (err) {
        setCode(DEMO_PRESETS[0].code);
      } finally {
        setLoading(false);
      }
    };
    fetchCode();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-slate-400 font-semibold tracking-wide">Loading Prototype Layout...</span>
      </div>
    );
  }

  const files = {
    "/App.js": {
      code: code,
    },
    "/styles.css": {
      code: `
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        body { margin: 0; padding: 0; background-color: #030712; color: #f9fafb; font-family: sans-serif; }
      `,
    },
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header element bar */}
      <header className="border-b border-slate-900 bg-slate-900/40 px-6 py-3.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-indigo-600 rounded flex items-center justify-center text-white font-extrabold text-xs">
            W
          </div>
          <span className="text-xs font-bold text-slate-300">
            WireframeToApp <span className="text-slate-500 font-normal">| Live Preview</span>
          </span>
        </div>
        <div className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
          Active Prototype
        </div>
      </header>

      {/* Sandpack live preview sandbox viewport */}
      <main className="flex-1 w-full bg-slate-950">
        <SandpackProvider
          template="react"
          files={files}
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
          }}
        >
          <SandpackLayout className="h-full border-0 rounded-none">
            <SandpackPreview
              style={{ height: "100%", width: "100%", background: "#030712" }}
              showNavigator={false}
            />
          </SandpackLayout>
        </SandpackProvider>
      </main>
    </div>
  );
}
