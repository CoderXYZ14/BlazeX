// src/pages/Builder.tsx
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { CodeEditor } from "../components/self/code-editor";
import { FileExplorer } from "../components/self/FileExplorer";
import { StepsList } from "../components/self/StepsList";
import type { Step, FileNode } from "../types";
import { Provider } from "react-redux";
import store from "../store/store";

const initialSteps: Step[] = [
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
];

const initialFiles: FileNode[] = [
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
];

export default function Builder() {
  const location = useLocation();
  const prompt = location.state?.prompt;

  const [steps] = useState<Step[]>(initialSteps);
  const [files, setFiles] = useState<FileNode[]>(initialFiles);
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

  const handleCodeChange = (value: string) => {
    if (selectedFile) {
      const updateFiles = (nodes: FileNode[]): FileNode[] => {
        return nodes.map((node) => {
          if (node.name === selectedFile.name) {
            return { ...node, content: value };
          }
          if (node.children) {
            return { ...node, children: updateFiles(node.children) };
          }
          return node;
        });
      };
      setFiles(updateFiles(files));
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="flex flex-1 overflow-hidden">
        <div className="w-80 border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Build Progress
            </h2>
            <StepsList steps={steps} />
          </div>
          <div className="flex-1 overflow-auto p-4">
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
        <div className="flex-1 overflow-hidden">
          <CodeEditor file={selectedFile} onChange={handleCodeChange} />
        </div>
      </div>
    </div>
  );
}
