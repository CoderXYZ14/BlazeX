import { Step, StepType } from "./types";
export function parseXml1(response: string): Step[] {
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

export function parseXml2(response: string): Step[] {
  const steps: Step[] = [];

  // Helper function to extract content between tags
  const extractContent = (
    str: string,
    tagName: string
  ): { content: string; rest: string } => {
    const startTag = `<${tagName}`;
    const endTag = `</${tagName}>`;

    const startIndex = str.indexOf(startTag);
    if (startIndex === -1) return { content: "", rest: str };

    const endIndex = str.indexOf(endTag);
    if (endIndex === -1) return { content: "", rest: str };

    const contentStart = str.indexOf(">", startIndex) + 1;
    const content = str.slice(contentStart, endIndex);
    const rest = str.slice(endIndex + endTag.length);

    return { content, rest };
  };

  // Helper function to extract attributes
  const extractAttributes = (str: string): Record<string, string> => {
    const attrs: Record<string, string> = {};
    const regex = /(\w+)="([^"]*)"/g;
    let match;

    while ((match = regex.exec(str)) !== null) {
      attrs[match[1]] = match[2];
    }

    return attrs;
  };

  // Find boltArtifact content
  const { content: artifactContent } = extractContent(response, "boltArtifact");

  if (artifactContent) {
    // Find all boltAction blocks
    const actionRegex = /<boltAction[^>]*>[\s\S]*?<\/boltAction>/g;
    const actions = artifactContent.match(actionRegex) || [];

    actions.forEach((action, index) => {
      // Extract action attributes
      const typeMatch = action.match(/type="([^"]*)"/);
      const filePathMatch = action.match(/filePath="([^"]*)"/);

      const type = typeMatch ? typeMatch[1] : "unknown";
      const filePath = filePathMatch ? filePathMatch[1] : "";

      // Extract code content
      const { content: codeContent } = extractContent(action, "boltAction");

      let stepType: StepType;
      switch (type) {
        case "file":
          stepType = StepType.CreateFile;
          break;
        case "shell":
          stepType = StepType.RunScript;
          break;
        default:
          stepType = StepType.CreateFile;
      }

      const step: Step = {
        id: `${index + 1}`,
        title: filePath ? `Create ${filePath}` : `Execute ${type} command`,
        description: filePath
          ? `Creating file at ${filePath}`
          : `Executing ${type} action`,
        type: stepType,
        status: "pending",
        code: codeContent.trim(),
        path: filePath || undefined,
      };

      steps.push(step);
    });
  }

  // If no steps were created, create a fallback step
  if (steps.length === 0) {
    steps.push({
      id: "1",
      title: "Process Content",
      description: "Process provided content",
      type: StepType.RunScript,
      status: "pending",
      code: response,
      path: "src/index.ts",
    });
  }

  return steps;
}
