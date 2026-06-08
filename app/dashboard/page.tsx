"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Folder, Clock, Trash2, LayoutGrid, Copy, PenTool } from "lucide-react";
import { getProjects, createProject, deleteProject, StoredProject } from "@/lib/storage";
import { getMockSketchThumbnail } from "@/lib/utils";

interface DashboardProject {
  id: string;
  name: string;
  thumbnail: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<DashboardProject[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = () => {
    const stored = getProjects();
    const mapped: DashboardProject[] = stored.map((p) => ({
      id: p.id,
      name: p.name,
      thumbnail: p.thumbnail || getMockSketchThumbnail(),
      updatedAt: p.updatedAt,
    }));
    setProjects(mapped);
    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreateProject = () => {
    const project = createProject("My New Sketch Layout");
    router.push(`/editor/${project.id}`);
  };

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("Are you sure you want to delete this sketch project?")) return;

    deleteProject(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto w-full">
      {/* Header section */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Your Sketch Projects</h1>
          <p className="text-xs text-slate-400">View and edit wireframe designs compiled with Claude Vision.</p>
        </div>

        <button
          onClick={handleCreateProject}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs transition shadow-lg shadow-indigo-600/10"
        >
          <Plus size={14} />
          <span>New Project Workspace</span>
        </button>
      </div>

      {/* Main Grid View list */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-slate-900 border border-slate-800 rounded-xl h-48 animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 border-dashed rounded-xl p-12 text-center max-w-md mx-auto space-y-4">
          <Folder size={32} className="text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No active mockups yet</h3>
          <p className="text-xs text-slate-400">Create a new workspace layout and start sketching wireframes instantly.</p>
          <button
            onClick={handleCreateProject}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-semibold rounded-lg transition"
          >
            Create First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/editor/${project.id}`}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group hover:border-slate-700 transition flex flex-col justify-between"
            >
              {/* Image Preview Screen */}
              <div className="h-32 bg-slate-950 flex items-center justify-center p-4 border-b border-slate-800/50 relative">
                <img
                  src={project.thumbnail}
                  alt={project.name}
                  className="max-h-full max-w-full object-contain opacity-75 group-hover:opacity-100 transition"
                />
              </div>

              {/* Title & Metadata details */}
              <div className="p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white group-hover:text-indigo-400 transition truncate max-w-[180px]">
                    {project.name}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <Clock size={10} />
                    <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => handleDeleteProject(project.id, e)}
                  className="p-1.5 hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 rounded transition"
                  title="Delete Project"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
