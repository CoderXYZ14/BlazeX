import { CheckCircle, Circle, Loader, XCircle } from "lucide-react";
import type { Step, StepsListProps } from "../../types";

export default function StepsList({ steps }: StepsListProps) {
  const getStatusIcon = (status: Step["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Loader className="w-4 h-4 text-blue-500 animate-spin" />;
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Circle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-2">
      {steps.map((step, index) => (
        <div
          key={`${step.id}-${index}`} // Combine step.id and index to ensure uniqueness
          className="flex items-start gap-2 p-2 rounded-lg hover:bg-accent hover:text-accent-foreground"
        >
          <div className="flex-shrink-0">{getStatusIcon(step.status)}</div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium break-words whitespace-pre-line pr-2">
              {step.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
