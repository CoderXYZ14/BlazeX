import type { FileNode } from "../types";

interface FilePreviewProps {
  file: FileNode | null;
}

export function FilePreview({ file }: FilePreviewProps) {
  if (!file) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
        Select a file to view its contents
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {file.name}
        </h2>
      </div>
      <pre className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-x-auto">
        <code className="text-sm text-gray-800 dark:text-gray-200">
          {file.content || "No content available"}
        </code>
      </pre>
    </div>
  );
}
