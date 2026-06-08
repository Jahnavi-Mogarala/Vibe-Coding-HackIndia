"use client";

import React, { useEffect, useState } from "react";
import { getVersions, StoredVersion } from "@/lib/storage";
import { useEditorStore } from "@/store/editorStore";
import { History, RotateCcw, Clock, FileCode } from "lucide-react";

export function VersionHistory() {
  const { currentProjectId, generatedCode, setGeneratedCode } = useEditorStore();
  const [versions, setVersions] = useState<StoredVersion[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (currentProjectId) {
      const stored = getVersions(currentProjectId);
      setVersions(stored);
    }
  }, [currentProjectId, generatedCode]);

  const handleRestore = (index: number) => {
    const version = versions[index];
    if (version) {
      setGeneratedCode(version.code);
      setActiveIndex(index);
    }
  };

  const formatTimestamp = (iso: string): string => {
    const date = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 shrink-0">
        <History size={14} className="text-indigo-400" />
        <h3 className="text-xs font-bold text-white">Version History</h3>
        <span className="ml-auto text-[10px] text-slate-500 font-medium">{versions.length} saved</span>
      </div>

      {/* Version List */}
      <div className="flex-1 overflow-y-auto">
        {versions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <FileCode size={24} className="text-slate-700 mb-3" />
            <p className="text-xs font-medium text-slate-500">No versions yet</p>
            <p className="text-[10px] text-slate-600 mt-1">
              Versions are saved automatically after each generation.
            </p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {versions.map((version, index) => {
              const isActive = activeIndex === index;
              const versionLabel = `v${versions.length - index}`;

              return (
                <button
                  key={version.id || index}
                  onClick={() => handleRestore(index)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition group flex items-start gap-3 ${
                    isActive
                      ? "bg-indigo-600/10 border border-indigo-500/30"
                      : "hover:bg-slate-800/60 border border-transparent"
                  }`}
                >
                  {/* Version indicator dot */}
                  <div className="mt-1 shrink-0">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        isActive ? "bg-indigo-400" : "bg-slate-600 group-hover:bg-slate-400"
                      } transition`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-xs font-bold ${
                          isActive ? "text-indigo-400" : "text-slate-300"
                        }`}
                      >
                        {versionLabel}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 shrink-0">
                        <Clock size={9} />
                        <span>{formatTimestamp(version.createdAt)}</span>
                      </div>
                    </div>

                    {version.prompt && (
                      <p className="text-[10px] text-slate-500 mt-0.5 truncate">
                        {version.prompt}
                      </p>
                    )}
                  </div>

                  {/* Restore icon on hover */}
                  <div
                    className={`mt-0.5 shrink-0 transition ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <RotateCcw size={11} className="text-indigo-400" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
