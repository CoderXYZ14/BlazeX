import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Moon, Sun, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [prompt, setPrompt] = useState("");

  return (
    <div className="min-h-screen bg-background transition-colors">
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">BlazeX</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
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

      <main className="flex flex-col items-center justify-center">
        <section className="container mx-auto px-4 py-16 flex flex-col items-center justify-center space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              What do you want to build?
            </h1>
            <p className="text-lg text-muted-foreground max-w-[600px]">
              Create stunning websites instantly with AI-powered web
              development. Just describe what you want to build.
            </p>
          </div>

          <div className="w-full max-w-2xl space-y-4">
            <div className="relative">
              <Input
                className="h-16 px-6 text-lg"
                placeholder="Describe your dream website..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button
                className="absolute right-2 top-2 h-12 bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                Generate Website
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Try: "Create a modern portfolio website" or "Build an e-commerce
              site for artisanal coffee"
            </p>
          </div>

          <div className="mt-16 space-y-4">
            <p className="text-sm text-muted-foreground">
              Popular templates to get started
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Portfolio",
                "E-commerce",
                "Blog",
                "Landing Page",
                "Dashboard",
              ].map((template) => (
                <Button key={template} variant="outline" className="min-w-32">
                  {template}
                </Button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">BlazeX</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Building the future of web development with AI
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 BlazeX. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">
                Terms
              </a>
              <a href="#" className="hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
