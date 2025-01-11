import { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { CodeEditor } from "../components/self/CodeEditor";
import { FileExplorer } from "../components/self/FileExplorer";
import { StepsList } from "../components/self/StepsList";
import type { Step, FileNode } from "../types";

export default function Builder() {
  const location = useLocation();
  const prompt = location.state?.prompt;

  if (!prompt) {
    return <Navigate to="/" replace />;
  }

  const [steps] = useState<Step[]>([
    {
      id: "1",
      title: "Analyzing Prompt",
      description: "Processing your requirements...",
      status: "running",
    },
    {
      id: "2",
      title: "Setting Up Project",
      description: "Creating project structure...",
      status: "pending",
    },
    {
      id: "3",
      title: "Installing Dependencies",
      description: "Adding required packages...",
      status: "pending",
    },
  ]);

  const [files, setFiles] = useState<FileNode[]>([
    {
      name: "src",
      type: "folder",
      expanded: true,
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
      expanded: false,
      children: [],
    },
  ]);

  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);

  const handleFileSelect = (file: FileNode) => {
    if (file.type === "file") {
      setSelectedFile(file);
    }
  };

  const handleToggleExpand = (file: FileNode) => {
    const updateFiles = (nodes: FileNode[]): FileNode[] => {
      return nodes.map((node) => {
        if (node.name === file.name) {
          return { ...node, expanded: !file.expanded };
        }
        if (node.children) {
          return { ...node, children: updateFiles(node.children) };
        }
        return node;
      });
    };
    setFiles(updateFiles(files));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex">
        <aside className="w-64 border-r border-border bg-card">
          <div className="p-4">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Build Progress
            </h2>
            <StepsList steps={steps} />
          </div>
        </aside>
        <main className="flex-1 flex">
          <div className="w-72 border-r border-border bg-card">
            <div className="p-4">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Files
              </h2>
              <FileExplorer
                files={files}
                onFileSelect={handleFileSelect}
                onToggleExpand={handleToggleExpand}
              />
            </div>
          </div>
          <div className="flex-1">
            <CodeEditor file={selectedFile} />
          </div>
        </main>
      </div>
    </div>
  );
}
