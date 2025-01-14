import { WebContainer } from "@webcontainer/api";
import { useState, useEffect } from "react";

let webcontainerInstance: WebContainer | null = null;

export default function useWebContainer() {
  const [webContainer, setWebContainer] = useState<WebContainer | null>(null);

  useEffect(() => {
    async function bootWebContainer() {
      if (!webcontainerInstance) {
        webcontainerInstance = await WebContainer.boot();
      }
      setWebContainer(webcontainerInstance);
    }

    bootWebContainer();
  }, []);

  return webContainer;
}
