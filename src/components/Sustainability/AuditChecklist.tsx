// src/components/Sustainability/AuditChecklist.tsx

import React, { useState, useMemo } from 'react';
import { AuditItem } from '../../types/sustainabilityTypes';

interface AuditChecklistProps {
  checklistItems: AuditItem[];
  title?: string;
}

export const AuditChecklist: React.FC<AuditChecklistProps> = ({ checklistItems, title = "Sustainability Audit Checklist" }) => {
  // State to track completed tasks
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  // Toggle completion status of a task
  const handleToggleTask = (id: string) => {
    setCompletedTasks((prev) =>
      prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]
    );
  };

  // Derived state for checklist completion percentage
  const completionPercentage = useMemo(() => {
    return (completedTasks.length / checklistItems.length) * 100;
  }, [completedTasks, checklistItems]);

  return (
    <div className="audit-checklist bg-gray-100 p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <p className="mb-4">Completion: {completionPercentage.toFixed(0)}%</p>
      <progress className="w-full mb-4" value={completionPercentage} max="100"></progress>
      
      <ul className="space-y-2">
        {checklistItems.map((item) => (
          <li key={item.id} className="bg-white p-3 rounded border shadow-sm">
            <div className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={completedTasks.includes(item.id)}
                  onChange={() => handleToggleTask(item.id)}
                  className="mr-2"
                />
                <span className="font-semibold">{item.name}</span>
              </label>
            </div>
            {item.subtasks && item.subtasks.length > 0 && (
              <ul className="ml-6 mt-2 space-y-1">
                {item.subtasks.map((subtask) => (
                  <li key={subtask.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={completedTasks.includes(subtask.id)}
                      onChange={() => handleToggleTask(subtask.id)}
                      className="mr-2"
                    />
                    <span>{subtask.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
