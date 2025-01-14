import { WebContainer } from "@webcontainer/api";
import { useEffect, useState } from "react";

interface FilePreviewProps {
  files: any[];
  webContainer: WebContainer;
}
export function FilePreview({ files, webContainer }: FilePreviewProps) {
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function main() {
      if (!webContainer) return;

      setIsLoading(true);
      const installProcess = await webContainer.spawn("npm", ["install"]);
      installProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            console.log(data);
          },
        })
      );

      await webContainer.spawn("npm", ["run", "dev"]);

      webContainer.on("server-ready", (port, url) => {
        console.log(`Server ready at ${url} (port ${port})`);
        setUrl(url);
      });

      setIsLoading(false);
    }

    main();
  }, [webContainer]);

  return (
    <div className="w-full h-full bg-background border rounded-lg overflow-hidden">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
            <p className="text-muted-foreground">
              Setting up preview environment...
            </p>
            <p className="text-sm text-muted-foreground">
              This might take a few moments
            </p>
          </div>
        </div>
      ) : url ? (
        <iframe src={url} className="w-full h-[calc(100%-36px)]" />
      ) : null}
    </div>
  );
}
