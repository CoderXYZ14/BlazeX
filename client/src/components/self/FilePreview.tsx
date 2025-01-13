"use client";

import { WebContainer } from "@webcontainer/api";
import { useEffect, useState } from "react";

interface FilePreviewProps {
  files: any[];
  webContainer: WebContainer;
}

export function FilePreview({ files, webContainer }: FilePreviewProps) {
  const [url, setUrl] = useState<string>("");
  async function main() {
    const installProcess = await webContainer.spawn("npm", ["install"]);
    installProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          console.log(data);
        },
      })
    );

    await webContainer.spawn("npm", ["run", "dev"]);

    // Wait for `server-ready` event
    webContainer.on("server-ready", (port, url) => {
      // ...
      console.log(url);
      console.log(port);
      setUrl(url);
    });
  }
  useEffect(() => {
    main();
  }, []);
  return (
    <div className="w-full h-full bg-background border rounded-lg overflow-hidden">
      {url && <iframe src={url} className="w-full h-[calc(100%-36px)]" />}
    </div>
  );
}
