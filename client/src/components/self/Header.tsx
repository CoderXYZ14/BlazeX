import { Moon, Sun, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { toggleDarkMode } from "../../store/themeSlice";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
interface HeaderProps {}
const Header: React.FC<HeaderProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };
  return (
    <header className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="container  px-4 h-16 flex items-center justify-between ">
        <Link to="/">
          <div className="flex items-center space-x-2 ">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">BlazeX</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggle}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="outline">Sign In</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};
export default Header;
