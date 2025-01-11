export interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Step {
  id: string;
  title: string;
  description: string;
  status: "pending" | "running" | "completed" | "error";
  code?: string;
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
}
export interface Step {
  id: string;
  title: string;
  description: string;
  status: "pending" | "running" | "completed" | "error";
  code?: string;
}

export interface FileNode {
  name: string;
  type: "file" | "folder";
  content?: string;
  expanded?: boolean;
  children?: FileNode[];
}

export interface StepsListProps {
  steps: Step[];
}

export interface FileExplorerProps {
  files: FileNode[];
  onFileSelect: (file: FileNode) => void;
  onToggleExpand: (file: FileNode) => void;
}
