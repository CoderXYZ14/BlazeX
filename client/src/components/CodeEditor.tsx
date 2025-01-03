import React from 'react';
import Editor from '@monaco-editor/react';
import type { FileNode } from '../types';

interface CodeEditorProps {
  file: FileNode | null;
  isDark: boolean;
}

export function CodeEditor({ file, isDark }: CodeEditorProps) {
  if (!file) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800">
        Select a file to view its contents
      </div>
    );
  }

  const getLanguage = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'js':
      case 'jsx':
        return 'javascript';
      case 'ts':
      case 'tsx':
        return 'typescript';
      case 'css':
        return 'css';
      case 'html':
        return 'html';
      case 'json':
        return 'json';
      default:
        return 'plaintext';
    }
  };

  return (
    <div className="w-full h-full">
      <Editor
        height="100%"
        theme={isDark ? 'vs-dark' : 'light'}
        language={getLanguage(file.name)}
        value={file.content || ''}
        options={{
          readOnly: true,
          minimap: { enabled: true },
          fontSize: 14,
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          lineNumbers: 'on',
          folding: true,
          automaticLayout: true,
        }}
      />
    </div>
  );
}