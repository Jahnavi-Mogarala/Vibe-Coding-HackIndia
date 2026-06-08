import { create } from "zustand";
import { getVersions, addVersion as addVersionToStorage, StoredVersion } from "@/lib/storage";

export type ViewportMode = "desktop" | "tablet" | "mobile";

interface EditorState {
  currentProjectId: string | null;
  projectName: string;
  generatedCode: string;
  stylePrompt: string;
  viewportMode: ViewportMode;
  sketchImage: string | null; // Base64 png data
  isGenerating: boolean;
  generationStage: "idle" | "reading" | "understanding" | "writing" | "done";
  logs: string[];
  
  // New Version History
  versions: StoredVersion[];
  activeVersionIndex: number | null;
  showTemplateGallery: boolean;

  // Actions
  setProjectId: (id: string | null) => void;
  setProjectName: (name: string) => void;
  setGeneratedCode: (code: string) => void;
  setStylePrompt: (style: string) => void;
  setViewportMode: (mode: ViewportMode) => void;
  setSketchImage: (image: string | null) => void;
  setIsGenerating: (generating: boolean) => void;
  setGenerationStage: (stage: "idle" | "reading" | "understanding" | "writing" | "done") => void;
  addLog: (log: string) => void;
  clearLogs: () => void;
  
  // New Actions
  addVersion: (code: string, stylePrompt: string) => void;
  loadVersions: (projectId: string) => void;
  restoreVersion: (index: number) => void;
  setShowTemplateGallery: (show: boolean) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  currentProjectId: null,
  projectName: "Untitled Sketch",
  generatedCode: `export default function Component() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-8 font-sans">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <h2 className="text-xl font-bold text-white mb-2">Ready to Draw!</h2>
        <p className="text-slate-400 text-sm mb-4">Sketch out a concept on the canvas or upload a paper mockup, then hit 'Generate' to see magic.</p>
        <div className="h-32 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center border-dashed">
          <span className="text-slate-600 text-xs">Waiting for your wireframe...</span>
        </div>
      </div>
    </div>
  );
}`,
  stylePrompt: "glassmorphism",
  viewportMode: "desktop",
  sketchImage: null,
  isGenerating: false,
  generationStage: "idle",
  logs: [],
  
  versions: [],
  activeVersionIndex: null,
  showTemplateGallery: false,

  setProjectId: (id) => set({ currentProjectId: id }),
  setProjectName: (name) => set({ projectName: name }),
  setGeneratedCode: (code) => set({ generatedCode: code }),
  setStylePrompt: (style) => set({ stylePrompt: style }),
  setViewportMode: (mode) => set({ viewportMode: mode }),
  setSketchImage: (image) => set({ sketchImage: image }),
  setIsGenerating: (generating) => set({ isGenerating: generating }),
  setGenerationStage: (stage) => set({ generationStage: stage }),
  addLog: (log) => set((state) => ({ logs: [...state.logs, log] })),
  clearLogs: () => set({ logs: [] }),
  
  addVersion: (code, stylePrompt) => {
    const { currentProjectId } = get();
    if (!currentProjectId) return;
    
    const newVersion = addVersionToStorage(currentProjectId, code, stylePrompt);
    if (newVersion) {
      set((state) => ({ 
        versions: [...state.versions, newVersion],
        activeVersionIndex: state.versions.length // Points to the new version
      }));
    }
  },
  
  loadVersions: (projectId) => {
    const loadedVersions = getVersions(projectId);
    set({ 
      versions: loadedVersions,
      activeVersionIndex: loadedVersions.length > 0 ? loadedVersions.length - 1 : null
    });
  },
  
  restoreVersion: (index) => {
    const { versions } = get();
    if (index >= 0 && index < versions.length) {
      set({ 
        activeVersionIndex: index,
        generatedCode: versions[index].code,
        stylePrompt: versions[index].stylePrompt
      });
    }
  },
  
  setShowTemplateGallery: (show) => set({ showTemplateGallery: show })
}));
