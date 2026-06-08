"use client";

import React from "react";
import { Monitor, Tablet, Smartphone } from "lucide-react";
import { ViewportMode, useEditorStore } from "@/store/editorStore";

export function ViewportSwitcher() {
  const { viewportMode, setViewportMode } = useEditorStore();

  const options: { mode: ViewportMode; icon: React.ReactNode; label: string }[] = [
    { mode: "mobile", icon: <Smartphone size={14} />, label: "Mobile (375px)" },
    { mode: "tablet", icon: <Tablet size={14} />, label: "Tablet (768px)" },
    { mode: "desktop", icon: <Monitor size={14} />, label: "Desktop (100%)" },
  ];

  return (
    <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 gap-1">
      {options.map((opt) => (
        <button
          key={opt.mode}
          onClick={() => setViewportMode(opt.mode)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition ${
            viewportMode === opt.mode
              ? "bg-indigo-600 text-white shadow"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
          title={opt.label}
        >
          {opt.icon}
          <span className="hidden md:inline">{opt.mode}</span>
        </button>
      ))}
    </div>
  );
}
