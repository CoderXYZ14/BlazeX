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
      {steps.map((step) => (
        <div
          key={step.id}
          className="flex items-start gap-2 p-2 rounded-lg hover:bg-accent hover:text-accent-foreground"
        >
          {getStatusIcon(step.status)}
          <div>
            <h3 className="text-sm font-medium">{step.title}</h3>
            {/* <p className="text-xs text-muted-foreground">{step.description}</p> */}
            {/* {step.code && (
              <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto">
                <code>{step.code}</code>
              </pre>
            )} */}
          </div>
        </div>
      ))}
    </div>
  );
}
