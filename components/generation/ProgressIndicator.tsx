"use client";

import React from "react";
import { useEditorStore } from "@/store/editorStore";
import { useGeneration } from "@/hooks/useGeneration";
import { Loader2, Play } from "lucide-react";

export function ProgressIndicator() {
  const { isGenerating, generationStage, sketchImage } = useEditorStore();
  const { generateCode } = useGeneration();

  const stages = {
    idle: "Ready to Generate",
    reading: "Reading layout details...",
    understanding: "Parsing UI structure...",
    writing: "Writing React+Tailwind components...",
    done: "Generation completed!",
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-300">AI Engine Pipeline</span>
        {isGenerating && (
          <span className="text-xs text-indigo-400 font-medium animate-pulse">
            Processing...
          </span>
        )}
      </div>

      {isGenerating ? (
        <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800">
          <Loader2 size={16} className="text-indigo-500 animate-spin" />
          <span className="text-xs text-slate-300 font-medium">
            {stages[generationStage]}
          </span>
        </div>
      ) : (
        <button
          onClick={() => generateCode()}
          disabled={!sketchImage}
          className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-semibold transition ${
            sketchImage
              ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20"
              : "bg-slate-800 text-slate-500 cursor-not-allowed"
          }`}
        >
          <Play size={14} fill="currentColor" />
          <span>Compile Sketch to Code</span>
        </button>
      )}
    </div>
  );
}
