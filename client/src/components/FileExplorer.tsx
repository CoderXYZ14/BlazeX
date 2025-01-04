import React, { useState } from "react";
import {
  Folder,
  FolderOpen,
  File,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import type { FileNode } from "../types";

interface FileExplorerProps {
  files: FileNode[];
  onFileSelect?: (file: FileNode) => void;
}

export function FileExplorer({ files, onFileSelect }: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set()
  );

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const renderNode = (node: FileNode, path: string = "", depth = 0) => {
    const fullPath = `${path}/${node.name}`;
    const isExpanded = expandedFolders.has(fullPath);
    const paddingLeft = `${depth * 1.5}rem`;

    return (
      <div key={fullPath}>
        <div
          className="flex items-center gap-2 py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
          style={{ paddingLeft }}
          onClick={() => {
            if (node.type === "folder") {
              toggleFolder(fullPath);
            } else {
              onFileSelect?.(node);
            }
          }}
        >
          {node.type === "folder" && (
            <span className="text-gray-500 dark:text-gray-400">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </span>
          )}
          {node.type === "folder" ? (
            isExpanded ? (
              <FolderOpen className="w-4 h-4 text-blue-500 dark:text-blue-400" />
            ) : (
              <Folder className="w-4 h-4 text-blue-500 dark:text-blue-400" />
            )
          ) : (
            <File className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          )}
          <span className="text-sm text-gray-700 dark:text-gray-200">
            {node.name}
          </span>
        </div>
        {node.type === "folder" &&
          isExpanded &&
          node.children?.map((child) => renderNode(child, fullPath, depth + 1))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          File Explorer
        </h2>
        <div className="space-y-1">{files.map((file) => renderNode(file))}</div>
      </div>
    </div>
  );
}
