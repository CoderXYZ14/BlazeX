import { Step, StepType } from "./types";
export function parseXml(response: string): Step[] {
  const steps: Step[] = [];

  // Helper function to normalize file path
  const normalizePath = (filename: string): string => {
    // Remove leading/trailing whitespace and ./ if present
    let path = filename.trim().replace(/^\.\//, "");

    // If the path doesn't start with src/ or other root folders,
    // and isn't a config file, place it in src/
    if (
      !path.startsWith("src/") &&
      !path.endsWith(".config.js") &&
      !path.endsWith(".config.ts") &&
      !path.endsWith(".json") &&
      !path.endsWith(".html")
    ) {
      path = `src/${path}`;
    }

    return path;
  };

  // Helper function to extract file content between code blocks
  const extractCodeBlocks = (
    text: string
  ): { filename: string; content: string; path: string }[] => {
    const files: { filename: string; content: string; path: string }[] = [];
    const fileRegex = /([^:\n]+):\n```(?:\w*\n)?([\s\S]*?)```/g;
    let match;

    while ((match = fileRegex.exec(text)) !== null) {
      const filename = match[1].trim();
      files.push({
        filename,
        content: match[2].trim(),
        path: normalizePath(filename),
      });
    }

    return files;
  };

  // Parse file information from the text
  const files = extractCodeBlocks(response);

  // Create steps for each file
  files.forEach((file, index) => {
    const step: Step = {
      id: `${index + 1}`,
      title: `Process ${file.filename}`,
      description: `File: ${file.filename}`,
      type: StepType.CreateFile,
      status: "pending",
      code: file.content,
      path: file.path,
    };

    steps.push(step);
  });

  // If no files were found, create a generic step with the entire content
  if (steps.length === 0) {
    steps.push({
      id: "step-1",
      title: "Process Content",
      description: "Process provided content",
      type: StepType.RunScript,
      status: "pending",
      code: response,
      path: "src/index.ts", // Default path for generic content
    });
  }

  return steps;
}
