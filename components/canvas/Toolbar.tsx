"use client";

import React from "react";
import { Undo2, Redo2, Trash2, Eraser, Paintbrush } from "lucide-react";

interface ToolbarProps {
  brushColor: string;
  setBrushColor: (c: string) => void;
  brushSize: number;
  setBrushSize: (s: number) => void;
  isEraser: boolean;
  setIsEraser: (e: boolean) => void;
  undo: () => void;
  redo: () => void;
  clear: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export function Toolbar({
  brushColor,
  setBrushColor,
  brushSize,
  setBrushSize,
  isEraser,
  setIsEraser,
  undo,
  redo,
  clear,
  canUndo,
  canRedo,
}: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between p-3 border-b border-slate-800 bg-slate-900 gap-2">
      {/* Mode selectors */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => setIsEraser(false)}
          className={`p-2 rounded-lg transition-colors ${
            !isEraser ? "bg-indigo-600 text-white" : "hover:bg-slate-800 text-slate-400"
          }`}
          title="Brush"
        >
          <Paintbrush size={16} />
        </button>
        <button
          onClick={() => setIsEraser(true)}
          className={`p-2 rounded-lg transition-colors ${
            isEraser ? "bg-indigo-600 text-white" : "hover:bg-slate-800 text-slate-400"
          }`}
          title="Eraser"
        >
          <Eraser size={16} />
        </button>
      </div>

      {/* Brush Settings */}
      <div className="flex items-center gap-3">
        {/* Color Picker */}
        <div className="flex items-center gap-1.5">
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            disabled={isEraser}
            className="w-7 h-7 rounded-md border-0 cursor-pointer overflow-hidden p-0 bg-transparent disabled:opacity-40"
            title="Brush Color"
          />
          <span className="text-xs text-slate-400 font-mono hidden md:inline">
            {isEraser ? "#FFFFFF" : brushColor.toUpperCase()}
          </span>
        </div>

        {/* Size Slider */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Size: {brushSize}px</span>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-16 md:w-24 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>
      </div>

      {/* History controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={undo}
          disabled={!canUndo}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 size={16} />
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition"
          title="Redo (Ctrl+Y)"
        >
          <Redo2 size={16} />
        </button>
        <button
          onClick={clear}
          className="p-2 rounded-lg hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition"
          title="Clear Canvas (Escape)"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
