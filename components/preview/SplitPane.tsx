"use client";

import React, { useState } from "react";
import { DrawingCanvas } from "../canvas/DrawingCanvas";
import { CodeEditor } from "./CodeEditor";
import { LivePreview } from "./LivePreview";
import { ViewportSwitcher } from "./ViewportSwitcher";
import { StylePrompt } from "../generation/StylePrompt";
import { ChatRefinement } from "../generation/ChatRefinement";
import { ProgressIndicator } from "../generation/ProgressIndicator";
import { ExportPanel } from "../export/ExportPanel";
import { VersionHistory } from "./VersionHistory";
import { TemplateGallery } from "../generation/TemplateGallery";
import { useEditorStore } from "@/store/editorStore";
import { History, LayoutTemplate } from "lucide-react";

export function SplitPane() {
  const [activeTab, setActiveTab] = useState<"canvas" | "editor" | "preview">("canvas");
  const [showHistory, setShowHistory] = useState(false);
  const { showTemplateGallery, setShowTemplateGallery } = useEditorStore();

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Workspace toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-xl p-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("canvas")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === "canvas"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            Canvas Drawing
          </button>
          <button
            onClick={() => setActiveTab("editor")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === "editor"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            JSX Code Editor
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === "preview"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            Live Preview
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Template Gallery Button */}
          <button
            onClick={() => setShowTemplateGallery(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600/20 border border-purple-500/30 text-purple-300 hover:bg-purple-600/30 text-xs font-semibold rounded-lg transition"
          >
            <LayoutTemplate size={14} />
            <span className="hidden sm:inline">Templates</span>
          </button>

          {/* Version History Toggle */}
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              showHistory
                ? "bg-amber-600/20 border border-amber-500/30 text-amber-300"
                : "bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <History size={14} />
            <span className="hidden sm:inline">History</span>
          </button>

          <ViewportSwitcher />
          <ExportPanel />
        </div>
      </div>

      {/* Main active frame display */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">
        {/* Left canvas pane */}
        <div className={`lg:col-span-5 h-full ${activeTab === "canvas" ? "block" : "hidden lg:block"}`}>
          <div className="flex flex-col h-full gap-4">
            <div className="flex-1 min-h-0">
              <DrawingCanvas />
            </div>
            <StylePrompt />
            <ProgressIndicator />
          </div>
        </div>

        {/* Right workspace panels */}
        <div className={`${showHistory ? "lg:col-span-5" : "lg:col-span-7"} flex flex-col h-full gap-4 ${
          activeTab !== "canvas" ? "block" : "hidden lg:flex"
        }`}>
          {/* Main preview/editor displays */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
            <div className={`h-full ${activeTab === "editor" ? "block" : "hidden md:block"}`}>
              <CodeEditor />
            </div>
            <div className={`h-full ${activeTab === "preview" ? "block" : "hidden md:block"}`}>
              <LivePreview />
            </div>
          </div>

          {/* Refinement input controls */}
          <ChatRefinement />
        </div>

        {/* Version History Panel (conditionally shown) */}
        {showHistory && (
          <div className="lg:col-span-2 h-full">
            <VersionHistory />
          </div>
        )}
      </div>

      {/* Template Gallery Modal */}
      {showTemplateGallery && <TemplateGallery />}
    </div>
  );
}
