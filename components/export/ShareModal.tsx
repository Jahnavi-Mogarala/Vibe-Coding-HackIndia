"use client";

import React, { useState } from "react";
import { X, Copy, Check, ExternalLink } from "lucide-react";
import { useEditorStore } from "@/store/editorStore";
import { createShare } from "@/lib/storage";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const { generatedCode } = useEditorStore();
  const [shareUrl, setShareUrl] = useState("");
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerateLink = () => {
    setGenerating(true);
    try {
      const share = createShare(generatedCode, "WireframeToApp Project");
      const absoluteUrl = `${window.location.origin}/preview/${share.slug}`;
      setShareUrl(absoluteUrl);
    } catch (err) {
      console.error(err);
      const fallbackUrl = `${window.location.origin}/preview/demo-${Math.random().toString(36).substring(4, 9)}`;
      setShareUrl(fallbackUrl);
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full overflow-hidden shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-white transition"
        >
          <X size={16} />
        </button>

        <div className="p-6">
          <h3 className="text-base font-bold text-white mb-2">Share Live Application</h3>
          <p className="text-xs text-slate-400 mb-6">
            Generate a unique, public, shared preview link that anyone can open to run this React prototype.
          </p>

          {shareUrl ? (
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-indigo-300 focus:outline-none"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg flex items-center justify-center transition"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>

              <a
                href={shareUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold rounded-lg transition text-white"
              >
                <span>Open in New Tab</span>
                <ExternalLink size={12} />
              </a>
            </div>
          ) : (
            <button
              onClick={handleGenerateLink}
              disabled={generating}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs transition disabled:opacity-50"
            >
              {generating ? "Creating link..." : "Generate Shareable Link"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
