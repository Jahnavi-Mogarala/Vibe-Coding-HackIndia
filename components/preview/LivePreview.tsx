"use client";

import React, { useEffect, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { useEditorStore } from "@/store/editorStore";

// Internal preview component to listen for Sandpack runtime errors and push them to local console logs
function ErrorCapture({ onCapture }: { onCapture: (error: string | null) => void }) {
  const { sandpack } = useSandpack();
  const rawErrors = sandpack.error;

  useEffect(() => {
    if (rawErrors && rawErrors.message) {
      onCapture(rawErrors.message);
    } else {
      onCapture(null);
    }
  }, [rawErrors, onCapture]);

  return null;
}

export function LivePreview() {
  const { generatedCode, viewportMode } = useEditorStore();
  const [runtimeError, setRuntimeError] = useState<string | null>(null);

  // Setup files configuration for Sandpack
  const files = {
    "/App.js": {
      code: generatedCode.includes("export default")
        ? generatedCode
        : `export default function Component() { return (<div>${generatedCode}</div>); }`,
    },
    "/styles.css": {
      code: `
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        body {
          margin: 0;
          padding: 0;
          background-color: #030712;
          color: #f9fafb;
          font-family: sans-serif;
        }
      `,
    },
  };

  // Determine viewport CSS dimensions
  let widthClass = "w-full";
  if (viewportMode === "mobile") widthClass = "max-w-[375px]";
  if (viewportMode === "tablet") widthClass = "max-w-[768px]";

  return (
    <div className="flex flex-col h-full bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <span className="text-xs font-semibold text-slate-300 tracking-wide">Live Preview</span>
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs text-slate-400">Hot Reload Active</span>
        </div>
      </div>

      {/* Sandpack Workspace Frame */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-950 overflow-y-auto">
        <div className={`h-full min-h-[400px] ${widthClass} w-full transition-all duration-300 border border-slate-800 rounded-lg overflow-hidden shadow-2xl`}>
          <SandpackProvider
            template="react"
            files={files}
            customSetup={{
              dependencies: {
                "lucide-react": "^0.460.0",
                "framer-motion": "^11.11.17",
                "canvas-confetti": "^1.6.0",
              },
            }}
            options={{
              externalResources: ["https://cdn.tailwindcss.com"],
            }}
          >
            <SandpackLayout className="h-full border-0 rounded-none bg-slate-900">
              <SandpackPreview
                style={{ height: "100%", width: "100%", background: "#030712" }}
                showNavigator={false}
                showLineNumbers={false}
                showRefreshButton={true}
              />
              <ErrorCapture onCapture={setRuntimeError} />
            </SandpackLayout>
          </SandpackProvider>
        </div>
      </div>

      {/* Terminal Error Dashboard Panel */}
      {runtimeError && (
        <div className="p-3 bg-rose-950/40 border-t border-rose-900/50 max-h-32 overflow-y-auto">
          <div className="text-xs font-bold text-rose-400 mb-1">Compilation Diagnostic Alert:</div>
          <pre className="text-[11px] text-rose-300 font-mono whitespace-pre-wrap">{runtimeError}</pre>
        </div>
      )}
    </div>
  );
}
