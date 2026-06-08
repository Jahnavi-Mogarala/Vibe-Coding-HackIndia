"use client";

import React, { useState } from "react";
import { useEditorStore } from "@/store/editorStore";
import { Copy, Check, Download, Share2 } from "lucide-react";
import { ShareModal } from "./ShareModal";

export function ExportPanel() {
  const { generatedCode } = useEditorStore();
  const [copied, setCopied] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedCode], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Component.tsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 text-xs font-semibold rounded-lg transition"
      >
        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
        <span>{copied ? "Copied!" : "Copy JSX"}</span>
      </button>

      <button
        onClick={handleDownload}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 text-xs font-semibold rounded-lg transition"
      >
        <Download size={14} />
        <span className="hidden sm:inline">Download</span>
      </button>

      <button
        onClick={() => setIsShareOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition"
      >
        <Share2 size={14} />
        <span>Share</span>
      </button>

      {isShareOpen && <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />}
    </div>
  );
}
