"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Compass, FolderKanban, LogOut } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Dashboard Navbar */}
      <header className="border-b border-slate-800 bg-slate-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 bg-indigo-600 rounded flex items-center justify-center text-white font-black">
            W
          </div>
          <span className="font-extrabold text-white text-sm">
            Wireframe<span className="text-indigo-400">ToApp</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white font-semibold transition"
          >
            Landing Page
          </Link>
        </div>
      </header>

      {/* Main layout sidebar & body content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 border-r border-slate-900 bg-slate-900/30 p-6 space-y-6">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3">
              Navigation
            </span>
            <div className="space-y-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-2 bg-indigo-600/10 text-indigo-400 border-l-2 border-indigo-500 rounded text-xs font-semibold"
              >
                <FolderKanban size={14} />
                <span>My Projects</span>
              </Link>
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded text-xs font-semibold"
              >
                <Compass size={14} />
                <span>Overview</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Dynamic page contents */}
        <main className="flex-1 p-6 md:p-8 bg-slate-950/20">{children}</main>
      </div>
    </div>
  );
}
