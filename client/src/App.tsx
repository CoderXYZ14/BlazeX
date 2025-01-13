import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import Header from "./components/self/Header";
import { RootState } from "./store/store";

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
    <div className="h-screen max-w-screen-2xl flex flex-col mx-auto">
      <Header />

      <Outlet />
    </div>
  );
};

export default App;
