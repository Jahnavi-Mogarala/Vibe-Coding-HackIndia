"use client";

import React, { useState } from "react";
import { useGeneration } from "@/hooks/useGeneration";
import { useEditorStore } from "@/store/editorStore";
import { Send, Sparkles } from "lucide-react";

export function ChatRefinement() {
  const [refinementText, setRefinementText] = useState("");
  const { isGenerating } = useEditorStore();
  const { generateCode } = useGeneration();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refinementText.trim() || isGenerating) return;
    
    generateCode(refinementText);
    setRefinementText("");
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
      <div className="flex items-center gap-1.5 mb-2.5">
        <Sparkles size={14} className="text-indigo-400" />
        <span className="text-xs font-semibold text-slate-300">Refinement Prompt Chatbot</span>
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={refinementText}
          onChange={(e) => setRefinementText(e.target.value)}
          disabled={isGenerating}
          placeholder="Refine component (e.g. 'add user profile badge to header', 'make colors vibrant purple')..."
          className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
        />
        <button
          type="submit"
          disabled={!refinementText.trim() || isGenerating}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center justify-center transition disabled:opacity-50 disabled:hover:bg-indigo-600"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
