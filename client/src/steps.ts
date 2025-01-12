import { Step, StepType } from "./types";

export function parseXml(response: string): Step[] {
  const steps: Step[] = [];

  // Helper function to extract file content between code blocks
  const extractCodeBlocks = (
    text: string
  ): { filename: string; content: string }[] => {
    const files: { filename: string; content: string }[] = [];
    const fileRegex = /([^:\n]+):\n```(?:\w*\n)?([\s\S]*?)```/g;
    let match;

    while ((match = fileRegex.exec(text)) !== null) {
      files.push({
        filename: match[1].trim(),
        content: match[2].trim(),
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
    });
  }

  return steps;
}
