import React from 'react';
import { Folder, FolderOpen, File, ChevronRight, ChevronDown } from 'lucide-react';
import type { FileNode } from '../types';

interface FileExplorerProps {
  files: FileNode[];
  onFileSelect?: (file: FileNode) => void;
}

export function FileExplorer({ files, onFileSelect }: FileExplorerProps) {
  const renderNode = (node: FileNode, depth = 0) => {
    const paddingLeft = `${depth * 1}rem`;

    return (
      <div key={node.name}>
        <div
          className="flex items-center gap-2 py-1 px-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer text-sm"
          style={{ paddingLeft }}
          onClick={() => {
            if (node.type === 'file') {
              onFileSelect?.(node);
            }
          }}
        >
          {node.type === 'folder' ? (
            <FolderOpen className="w-4 h-4 text-blue-500 dark:text-blue-400" />
          ) : (
            <File className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          )}
          <span className="text-gray-700 dark:text-gray-200">{node.name}</span>
        </div>
        {node.type === 'folder' && node.children?.map((child) => 
          renderNode(child, depth + 1)
        )}
      </div>
    );
  };

  return (
    <div className="space-y-1">
      {files.map((file) => renderNode(file))}
    </div>
  );
}