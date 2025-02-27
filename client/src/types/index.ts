export interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}
export enum StepType {
  CreateFile,
  CreateFolder,
  EditFile,
  DeleteFile,
  RunScript,
}

export interface Step {
  id: string;
  title: string;
  description: string;
  type?: StepType;
  status: "pending" | "running" | "completed" | "error";
  code?: string;
  path?: string;
}
export interface StepsListProps {
  steps: Step[];
}

export interface FileExplorerProps {
  files: FileNode[];
  onFileSelect: (file: FileNode) => void;
  onToggleExpand: (file: FileNode) => void;
}

export interface CodeEditorProps {
  file: FileNode | null;
}

export interface FileNode {
  name: string;
  type: "file" | "folder";
  content?: string;
  expanded?: boolean;
  children?: FileNode[];
  path?: string;
}

export interface StepsListProps {
  steps: Step[];
}

export interface FileExplorerProps {
  files: FileNode[];
  onFileSelect: (file: FileNode) => void;
  onToggleExpand: (file: FileNode) => void;
}
