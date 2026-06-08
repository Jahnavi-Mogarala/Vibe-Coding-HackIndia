"use client";

import React from "react";
import { useEditorStore } from "@/store/editorStore";
import { Sparkles } from "lucide-react";

export function StylePrompt() {
  const { stylePrompt, setStylePrompt } = useEditorStore();

  const styles = [
    { id: "dark mode", label: "Midnight Dark", desc: "Glossy neon slate look" },
    { id: "minimal", label: "Nordic Minimal", desc: "Clean stark layouts" },
    { id: "glassmorphism", label: "Glassmorphism", desc: "Translucent backdrop filters" },
    { id: "material ui", label: "Material Modern", desc: "Subtle shadows & card containers" },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
      <div className="flex items-center gap-1.5 mb-3">
        <Sparkles size={14} className="text-indigo-400" />
        <span className="text-xs font-semibold text-slate-300">Design Framework Theme</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => setStylePrompt(style.id)}
            className={`flex flex-col text-left p-2.5 rounded-lg border transition ${
              stylePrompt === style.id
                ? "bg-indigo-600/10 border-indigo-500 text-white"
                : "bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-300"
            }`}
          >
            <span className="text-xs font-bold">{style.label}</span>
            <span className="text-[10px] opacity-75 mt-0.5">{style.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
