import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";

import { RootState } from "./store/store.ts";

const App = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
