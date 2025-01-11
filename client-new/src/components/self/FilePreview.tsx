"use client";

export function FilePreview({ content }: { content: string }) {
  return (
    <div className="w-full h-full bg-background border rounded-lg overflow-hidden">
      <div className="h-9 border-b flex items-center px-4 bg-muted">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>
      <iframe
        srcDoc={content}
        className="w-full h-[calc(100%-36px)]"
        sandbox="allow-scripts"
      />
    </div>
  );
}
