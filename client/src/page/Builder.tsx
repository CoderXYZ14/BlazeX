import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { FileExplorer, CodeEditor, StepsList } from "@/components/self";
import { type Step, type FileNode, StepType } from "../types";
import axios from "axios";
import { BACKEND_URI } from "@/config";
import { parseXml1, parseXml2 } from "@/steps";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Eye } from "lucide-react";
import { FilePreview } from "@/components/self/FilePreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Builder() {
  const location = useLocation();
  const prompt = location.state?.prompt;

  if (!prompt) {
    return <Navigate to="/" replace />;
  }

  const [steps, setSteps] = useState<Step[]>([
    // {
    //   id: "1",
    //   title: "Analyzing Prompt",
    //   description: "Processing your requirements...",
    //   status: "running",
    // },
  ]);

  const [files, setFiles] = useState<FileNode[]>([
    // {
    //   name: "src",
    //   type: "folder",
    //   expanded: true,
    //   children: [
    //     {
    //       name: "App.tsx",
    //       type: "file",
    //       content:
    //         'import React from "react";\n\nfunction App() {\n  return <div>Hello World</div>;\n}\n\nexport default App;',
    //     },
    //     {
    //       name: "main.tsx",
    //       type: "file",
    //       content:
    //         'import React from "react";\nimport ReactDOM from "react-dom/client";\nimport App from "./App";\n\nReactDOM.createRoot(document.getElementById("root")!).render(<App />);',
    //     },
    //   ],
    // },
    // {
    //   name: "package.json",
    //   type: "file",
    //   path: "package.json",
    //   content: "Hello World",
    // },
  ]);

  useEffect(() => {
    let originalFiles = [...files];
    let updateHappened = false;
    steps
      .filter(({ status }) => status === "pending")
      .map((step) => {
        updateHappened = true;
        if (step?.type === StepType.CreateFile) {
          let parsedPath = step.path?.split("/") ?? [];
          let currentFileStructure = [...originalFiles];
          let finalAnswerRef = currentFileStructure;

          let currentFolder = "";
          while (parsedPath.length) {
            currentFolder = `${currentFolder}/${parsedPath[0]}/`;
            let currentFolderName = parsedPath[0];
            parsedPath = parsedPath.slice(1);

            if (!parsedPath.length) {
              //final file
              let file = currentFileStructure.find(
                (x) => x.path === currentFolder
              );
              if (!file) {
                currentFileStructure.push({
                  name: currentFolderName,
                  type: "file",
                  content: step.code,
                  path: currentFolder,
                });
              } else {
                file.content = step.code;
              }
            } else {
              //in a folder
              let folder = currentFileStructure.find(
                (x) => x.path === currentFolder
              );
              if (!folder) {
                currentFileStructure.push({
                  name: currentFolderName,
                  type: "folder",
                  path: currentFolder,
                  children: [],
                });
              }
              currentFileStructure = currentFileStructure.find(
                (x) => x.path === currentFolder
              )!.children!;
            }
          }
          originalFiles = finalAnswerRef;
        }
      });

    if (updateHappened) {
      setFiles(originalFiles);
      setSteps((steps) =>
        steps.map((s: Step) => {
          return {
            ...s,
            status: "completed",
          };
        })
      );
    }
  }, [steps, files]);

  async function init() {
    const response = await axios.post(`${BACKEND_URI}/template`, {
      prompt: prompt.trim(),
    });

    const { prompts, uiPrompts } = response.data.data;

    //console.log(parseXml(uiPrompts[0]));
    setSteps(
      parseXml1(uiPrompts[0]).map((x: Step) => ({ ...x, status: "pending" }))
    );

    const stepsResponse = await axios.post(`${BACKEND_URI}/chat`, {
      messages: [...prompts, prompt].map((content) => ({
        role: "user",
        content,
      })),
    });
    console.log(stepsResponse.data.data);

    setSteps((s) => [
      ...s,
      ...parseXml2(stepsResponse.data.data.response).map((x) => ({
        ...x,
        status: "pending" as "pending",
      })),
    ]);
  }

  useEffect(() => {
    init();
  }, []);

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
    <div className="bg-background flex flex-col h-[calc(100vh-100px)]">
      <div className="flex-1 flex overflow-hidden">
        <aside className="w-64 border-r border-border bg-card overflow-y-auto">
          <div className="p-4">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Build Progress
            </h2>
            <StepsList steps={steps} />
          </div>
        </aside>
        <main className="flex-1 flex overflow-hidden">
          <div className="w-72 border-r border-border bg-card overflow-y-auto">
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
          <div className="flex-1 flex flex-col overflow-hidden p-6 bg-muted/10">
            <div className="bg-background rounded-lg shadow-sm border border-border flex-1 flex flex-col overflow-hidden">
              <Tabs
                defaultValue="code"
                className="flex-1 flex flex-col overflow-hidden"
              >
                <div className="border-b border-border px-4 flex-shrink-0">
                  <TabsList className="h-12">
                    <TabsTrigger
                      value="code"
                      className="flex items-center gap-2"
                    >
                      <Code className="h-4 w-4" />
                      Code
                    </TabsTrigger>
                    <TabsTrigger
                      value="preview"
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Preview
                    </TabsTrigger>
                  </TabsList>
                </div>
                <div className="flex-1 flex flex-col overflow-hidden p-4">
                  <TabsContent
                    value="code"
                    className="flex-1 m-0 rounded border border-border overflow-hidden"
                  >
                    <div className="h-full max-h-[calc(100vh-16rem)] overflow-auto">
                      <CodeEditor file={selectedFile} />
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="preview"
                    className="flex-1 m-0 rounded border border-border overflow-hidden"
                  >
                    <div className="h-full max-h-[calc(100vh-16rem)] overflow-auto">
                      <FilePreview content={selectedFile?.content || ""} />
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
              <div className="border-t border-border p-4 bg-background flex-shrink-0">
                <form className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Ask a follow-up question..."
                    className="flex-1"
                  />
                  <Button type="submit">Send</Button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
