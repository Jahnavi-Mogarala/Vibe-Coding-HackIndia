"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, LayoutDashboard } from "lucide-react";

export function Navbar() {
  // Safe mock for Clerk authentication visual integration
  const userPlan = "Free";
  const generationsUsed = 3;

  return (
    <nav className="border-b border-slate-800 bg-slate-900/60 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black shadow-lg shadow-indigo-600/30">
            W
          </div>
          <span className="font-extrabold tracking-tight text-white text-base">
            Wireframe<span className="text-indigo-400">ToApp</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-4 text-xs font-semibold text-slate-400">
          <Link href="/dashboard" className="flex items-center gap-1.5 hover:text-white transition">
            <LayoutDashboard size={14} />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Token Budget Meter */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-full px-3 py-1 text-xs">
          <Sparkles size={12} className="text-indigo-400" />
          <span className="text-slate-400">Usage:</span>
          <span className="text-indigo-300 font-bold">{generationsUsed} / 10 Free</span>
        </div>

        <Link
          href="/dashboard"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white rounded-lg transition shadow-md shadow-indigo-600/10"
        >
          Go to App
        </Link>
      </div>
    </nav>
  );
}
