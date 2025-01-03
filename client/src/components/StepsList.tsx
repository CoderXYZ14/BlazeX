import React from 'react';
import { CheckCircle, Circle, Loader, XCircle } from 'lucide-react';
import type { Step } from '../types';

interface StepsListProps {
  steps: Step[];
}

export function StepsList({ steps }: StepsListProps) {
  const getStatusIcon = (status: Step['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'running':
        return <Loader className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Circle className="w-4 h-4 text-gray-300 dark:text-gray-600" />;
    }
  };

  return (
    <div className="space-y-2">
      {steps.map((step) => (
        <div
          key={step.id}
          className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          {getStatusIcon(step.status)}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">{step.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{step.description}</p>
            {step.code && (
              <pre className="mt-2 p-2 bg-gray-50 dark:bg-gray-900 rounded text-xs overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200">{step.code}</code>
              </pre>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}