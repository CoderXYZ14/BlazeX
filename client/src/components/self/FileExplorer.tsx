import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  FileCode,
} from "lucide-react";
import { Button } from "../ui/button";
import type { FileNode, FileExplorerProps } from "../../types";

function FileTreeNode({
  file,
  depth = 0,
  onFileSelect,
  onToggleExpand,
}: {
  file: FileNode;
  depth?: number;
  onFileSelect: (file: FileNode) => void;
  onToggleExpand: (file: FileNode) => void;
}) {
  const paddingLeft = `${depth * 1.25}rem`;

  return (
    <div>
      <Button
        variant="ghost"
        className="w-full justify-start h-8 px-2 font-normal hover:bg-accent hover:text-accent-foreground"
        onClick={() =>
          file.type === "folder" ? onToggleExpand(file) : onFileSelect(file)
        }
        style={{ paddingLeft }}
      >
        {file.type === "folder" &&
          (file.expanded ? (
            <ChevronDown className="h-4 w-4 mr-1" />
          ) : (
            <ChevronRight className="h-4 w-4 mr-1" />
          ))}
        {file.type === "folder" &&
          (file.expanded ? (
            <FolderOpen className="h-4 w-4 mr-2 text-primary" />
          ) : (
            <Folder className="h-4 w-4 mr-2 text-primary" />
          ))}
        {file.type === "file" && (
          <FileCode className="h-4 w-4 mr-2 text-muted-foreground" />
        )}
        <span className="truncate">{file.name}</span>
      </Button>
      {file.type === "folder" &&
        file.expanded &&
        file.children?.map((child) => (
          <FileTreeNode
            key={child.name}
            file={child}
            depth={depth + 1}
            onFileSelect={onFileSelect}
            onToggleExpand={onToggleExpand}
          />
        ))}
    </div>
  );
}

export default function FileExplorer({
  files,
  onFileSelect,
  onToggleExpand,
}: FileExplorerProps) {
  return (
    <div className="w-full overflow-auto">
      {files.map((file) => (
        <FileTreeNode
          key={file.name}
          file={file}
          onFileSelect={onFileSelect}
          onToggleExpand={onToggleExpand}
        />
      ))}
    </div>
  );
}
