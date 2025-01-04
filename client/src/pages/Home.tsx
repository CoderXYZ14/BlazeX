import { Code2 } from "lucide-react";
import { PromptInput } from "../components/PromptInput";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="bg-blue-500 dark:bg-blue-600 p-3 rounded-full">
            <Code2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Website Builder AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Describe your dream website, and let AI handle the rest. Get a fully
            functional website with just a prompt.
          </p>
          <PromptInput />
        </div>
      </div>
    </div>
  );
}
