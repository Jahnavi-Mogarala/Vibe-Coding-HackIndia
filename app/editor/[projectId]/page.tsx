"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { SplitPane } from "@/components/preview/SplitPane";
import { useEditorStore } from "@/store/editorStore";
import Link from "next/link";
import { ArrowLeft, Save, Sparkles } from "lucide-react";

export default function WorkspaceEditorPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.projectId as string;
  
  const { setProjectId, projectName, setProjectName, generatedCode } = useEditorStore();

  useEffect(() => {
    if (projectId) {
      setProjectId(projectId);
      setProjectName(`Project Workspace (${projectId.substring(0, 6)})`);
    }
  }, [projectId, setProjectId, setProjectName]);

  const handleSaveProject = async () => {
    try {
      await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: projectName,
          code: generatedCode,
        }),
      });
      alert("Workspace progress saved successfully!");
    } catch (err) {
      console.error("Autosave trigger error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col h-screen overflow-hidden">
      {/* Editor Header navigation bar */}
      <header className="border-b border-slate-800 bg-slate-900 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
          >
            <ArrowLeft size={16} />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="bg-transparent border-b border-transparent hover:border-slate-700 focus:border-indigo-500 text-sm font-bold text-white focus:outline-none transition py-0.5"
              />
            </div>
            <p className="text-[10px] text-slate-400">Workspace Editor Mode</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Status badge */}
          <div className="hidden sm:flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
            <Sparkles size={10} />
            <span>AI Connected</span>
          </div>

          <button
            onClick={handleSaveProject}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold rounded-lg transition"
          >
            <Save size={14} />
            <span>Save Workspace</span>
          </button>
        </div>
      </header>

      {/* Editor Panels container split screens */}
      <main className="flex-1 p-6 overflow-hidden min-h-0 bg-slate-950/50">
        <SplitPane />
      </main>
    </div>
  );
}
