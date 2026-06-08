"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { SplitPane } from "@/components/preview/SplitPane";
import { useEditorStore } from "@/store/editorStore";
import { getProject, updateProject } from "@/lib/storage";
import Link from "next/link";
import { ArrowLeft, Save, Sparkles } from "lucide-react";

export default function WorkspaceEditorPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.projectId as string;

  const { setProjectId, projectName, setProjectName, generatedCode, setGeneratedCode, sketchImage, setSketchImage } = useEditorStore();
  const [showSaveToast, setShowSaveToast] = useState(false);

  useEffect(() => {
    if (projectId) {
      setProjectId(projectId);

      // Load project data from localStorage
      const project = getProject(projectId);
      if (project) {
        setProjectName(project.name);
        if (project.code) {
          setGeneratedCode(project.code);
        }
        if (project.thumbnail && !project.thumbnail.includes("data:image/svg+xml")) {
          setSketchImage(project.thumbnail);
        }
      } else {
        setProjectName(`Project Workspace (${projectId.substring(0, 6)})`);
      }
    }
  }, [projectId, setProjectId, setProjectName, setGeneratedCode]);

  const handleSaveProject = () => {
    updateProject(projectId, {
      name: projectName,
      code: generatedCode,
      ...(sketchImage && { thumbnail: sketchImage })
    });

    // Show toast notification
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col overflow-x-hidden">
      {/* Save toast notification */}
      {showSaveToast && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-lg shadow-emerald-600/20 flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Workspace progress saved successfully!
          </div>
        </div>
      )}

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
      <main className="flex-1 p-4 md:p-6 bg-slate-950/50">
        <SplitPane />
      </main>
    </div>
  );
}
