import { Moon, Sun, Zap } from "lucide-react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/self/Header";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useEffect } from "react";

function App() {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
