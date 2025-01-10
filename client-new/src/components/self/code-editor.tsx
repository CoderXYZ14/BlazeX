import Editor from "@monaco-editor/react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { CodeEditorProps } from "../../types";

export function CodeEditor({ file, onChange }: CodeEditorProps) {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  if (!file || file.type !== "file") {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Select a file to edit
      </div>
    );
  }

  const getLanguage = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "js":
      case "jsx":
        return "javascript";
      case "ts":
      case "tsx":
        return "typescript";
      case "css":
        return "css";
      case "html":
        return "html";
      case "json":
        return "json";
      default:
        return "plaintext";
    }
  };

  return (
    <Editor
      height="100%"
      theme={darkMode ? "vs-dark" : "light"}
      language={getLanguage(file.name)}
      value={file.content}
      onChange={(value) => onChange?.(value || "")}
      options={{
        fontSize: 14,
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        lineNumbers: "on",
        roundedSelection: false,
        padding: { top: 16 },
        automaticLayout: true,
      }}
    />
  );
}
