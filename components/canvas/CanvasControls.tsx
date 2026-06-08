"use client";

import React, { useRef } from "react";
import { Grid, UploadCloud } from "lucide-react";

interface CanvasControlsProps {
  showGrid: boolean;
  setShowGrid: (s: boolean) => void;
  onUploadImage: (file: File) => void;
}

export function CanvasControls({ showGrid, setShowGrid, onUploadImage }: CanvasControlsProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadImage(file);
    }
  };

  return (
    <div className="flex items-center justify-between p-3 border-t border-slate-800 bg-slate-900">
      {/* Grid line toggle option */}
      <button
        onClick={() => setShowGrid(!showGrid)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
          showGrid
            ? "bg-slate-800 text-indigo-400 border border-slate-700"
            : "hover:bg-slate-800 text-slate-400 border border-transparent"
        }`}
      >
        <Grid size={14} />
        <span>Grid Overlay</span>
      </button>

      {/* Upload image option */}
      <div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 text-xs font-medium rounded-lg transition"
        >
          <UploadCloud size={14} />
          <span>Upload Sketch</span>
        </button>
      </div>
    </div>
  );
}
