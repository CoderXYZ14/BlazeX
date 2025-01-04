import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { StepsList } from "../components/StepsList";
import { FileExplorer } from "../components/FileExplorer";
import { CodeEditor } from "../components/CodeEditor";
import { ThemeToggle } from "../components/ThemeToggle";
import { useTheme } from "../hooks/useTheme";
import type { Step, FileNode } from "../types";

export default function Builder() {
  const location = useLocation();
  const prompt = location.state?.prompt;
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const { isDark, toggleTheme } = useTheme();

  const [steps, setSteps] = useState<Step[]>([]);

  const [files, setFiles] = useState<FileNode[]>([
    {
      name: "src",
      type: "folder",
      children: [
        {
          name: "App.tsx",
          type: "file",
          content:
            'import React from "react";\n\nfunction App() {\n  return <div>Hello World</div>;\n}\n\nexport default App;',
        },
        {
          name: "main.tsx",
          type: "file",
          content:
            'import React from "react";\nimport ReactDOM from "react-dom/client";\nimport App from "./App";\n\nReactDOM.createRoot(document.getElementById("root")!).render(<App />);',
        },
      ],
    },
    {
      name: "public",
      type: "folder",
      children: [
        {
          name: "index.html",
          type: "file",
          content:
            '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <title>My App</title>\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>',
        },
      ],
    },
  ]);

  if (!prompt) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Website Builder AI
          </h1>
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        </div>
      </header>
      <div className="flex-1 flex">
        <aside className="w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="p-4">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              Build Progress
            </h2>
            <StepsList steps={steps} />
          </div>
        </aside>
        <main className="flex-1 flex">
          <div className="w-72 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="p-4">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Files
              </h2>
              <FileExplorer files={files} onFileSelect={setSelectedFile} />
            </div>
          </div>
          <div className="flex-1">
            <CodeEditor file={selectedFile} isDark={isDark} />
          </div>
        </main>
      </div>
    </div>
  );
}
