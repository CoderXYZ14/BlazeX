import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      navigate("/builder", { state: { prompt } });
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center">
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
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <Input
                  className="h-16 px-6 text-lg"
                  placeholder="Describe your dream website..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-2 h-12 bg-purple-600 hover:bg-purple-700"
                  size="lg"
                >
                  Generate Website
                </Button>
              </div>
            </form>
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
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 BlazeX. All rights reserved.
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
