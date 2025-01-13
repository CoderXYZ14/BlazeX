import { WebContainer } from "@webcontainer/api";
import { useEffect, useState } from "react";

const useWebContainer = () => {
  const [webcontainer, setWebContainer] = useState<WebContainer>();
  async function main() {
    const webcontainerInstance = await WebContainer.boot();
    setWebContainer(webcontainerInstance);
  }
  useEffect(() => {
    main();
  }, []);
  return webcontainer;
};

export default useWebContainer;
