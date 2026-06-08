"use client";

import React from "react";
import Editor from "@monaco-editor/react";
import { useEditorStore } from "@/store/editorStore";

export function CodeEditor() {
  const { generatedCode, setGeneratedCode, isGenerating } = useEditorStore();

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setGeneratedCode(value);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <span className="text-xs font-semibold text-slate-300 tracking-wide">component.tsx</span>
        {isGenerating && (
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
            <span className="text-xs text-indigo-400 font-medium">Streaming AI Code...</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-h-[300px] w-full">
        <Editor
          height="100%"
          defaultLanguage="typescript"
          theme="vs-dark"
          value={generatedCode}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: isGenerating,
            cursorBlinking: "smooth",
            formatOnPaste: true,
            tabSize: 2,
            padding: { top: 12 },
          }}
        />
      </div>
    </div>
  );
}
