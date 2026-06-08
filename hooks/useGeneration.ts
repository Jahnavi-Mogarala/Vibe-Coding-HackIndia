import { useEditorStore } from "@/store/editorStore";
import { addVersion } from "@/lib/storage";

export function useGeneration() {
  const {
    sketchImage,
    stylePrompt,
    generatedCode,
    setGeneratedCode,
    isGenerating,
    setIsGenerating,
    setGenerationStage,
    currentProjectId,
  } = useEditorStore();

  const generateCode = async (refinementText?: string) => {
    if (!sketchImage && !refinementText) return;

    setIsGenerating(true);
    setGenerationStage("reading");

    try {
      // Simulate reading delays for better UX engagement
      await new Promise((resolve) => setTimeout(resolve, 800));
      setGenerationStage("understanding");
      await new Promise((resolve) => setTimeout(resolve, 600));
      setGenerationStage("writing");

      const response = await fetch("/api/generate/sketch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: sketchImage,
          style: stylePrompt,
          refinement: refinementText,
          currentCode: refinementText ? generatedCode : undefined,
          projectId: currentProjectId,
        }),
      });

      if (!response.ok) {
        throw new Error("Sketch compilation API error triggered.");
      }

      const reader = response.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      let streamedCode = "";
      setGeneratedCode(""); // Clear editor screen for incoming code

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        streamedCode += chunk;

        // Strip out enclosing triple markdown ticks if Claude API outputs them
        let cleanCode = streamedCode;
        if (cleanCode.startsWith("```")) {
          cleanCode = cleanCode.replace(/^```tsx?\n?/, "");
        }
        if (cleanCode.endsWith("```")) {
          cleanCode = cleanCode.substring(0, cleanCode.length - 3);
        }

        setGeneratedCode(cleanCode);
      }

      // Auto-save version to localStorage after successful generation
      if (currentProjectId) {
        const finalCode = useEditorStore.getState().generatedCode;
        if (finalCode) {
          addVersion(currentProjectId, finalCode, stylePrompt);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
      setGenerationStage("done");
    }
  };

  return {
    generateCode,
    isGenerating,
  };
}
