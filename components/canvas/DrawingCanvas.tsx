"use client";

import React, { useEffect } from "react";
import { useCanvas } from "@/hooks/useCanvas";
import { Toolbar } from "./Toolbar";
import { CanvasControls } from "./CanvasControls";
import { useEditorStore } from "@/store/editorStore";

export function DrawingCanvas() {
  const {
    canvasRef,
    brushColor,
    setBrushColor,
    brushSize,
    setBrushSize,
    isEraser,
    setIsEraser,
    showGrid,
    setShowGrid,
    startDrawing,
    draw,
    stopDrawing,
    undo,
    redo,
    clear,
    uploadSketchImage,
    exportCanvasBase64,
    canUndo,
    canRedo,
  } = useCanvas();

  const setSketchImage = useEditorStore((state) => state.setSketchImage);

  // Sync canvas image output with state on drawing changes
  const updateStoreThumbnail = () => {
    const base64 = exportCanvasBase64();
    if (base64) {
      setSketchImage(base64);
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        undo();
        setTimeout(updateStoreThumbnail, 50);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
        setTimeout(updateStoreThumbnail, 50);
      }
      if (e.key === "Escape") {
        e.preventDefault();
        clear();
        setTimeout(updateStoreThumbnail, 50);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo, clear]);

  const handleMouseUpOrLeave = () => {
    stopDrawing();
    updateStoreThumbnail();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadSketchImage(e.dataTransfer.files[0]);
      setTimeout(updateStoreThumbnail, 100);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden relative">
      {/* Toolbar header */}
      <Toolbar
        brushColor={brushColor}
        setBrushColor={setBrushColor}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        isEraser={isEraser}
        setIsEraser={setIsEraser}
        undo={() => {
          undo();
          setTimeout(updateStoreThumbnail, 50);
        }}
        redo={() => {
          redo();
          setTimeout(updateStoreThumbnail, 50);
        }}
        clear={() => {
          clear();
          setTimeout(updateStoreThumbnail, 50);
        }}
        canUndo={canUndo}
        canRedo={canRedo}
      />

      {/* Canvas workspace */}
      <div 
        className="flex-1 relative bg-slate-950 overflow-hidden min-h-[300px]"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:20px_20px]" />
        )}
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={handleMouseUpOrLeave}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none bg-white"
        />
      </div>

      {/* Canvas Controls bottom bar */}
      <CanvasControls
        showGrid={showGrid}
        setShowGrid={setShowGrid}
        onUploadImage={(file) => {
          uploadSketchImage(file);
          setTimeout(updateStoreThumbnail, 100);
        }}
      />
    </div>
  );
}
