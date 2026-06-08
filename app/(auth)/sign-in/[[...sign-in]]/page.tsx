"use client";

import React from "react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 max-w-md w-full space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-white">Welcome Back</h2>
          <p className="text-xs text-slate-400 mt-1">Sign in to access your wireframe dashboards</p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs transition block text-center"
          >
            Demo Quick Login Bypass
          </Link>
        </div>
      </div>
    </div>
  );
}
