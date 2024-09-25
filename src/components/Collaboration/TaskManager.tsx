import React, { useState } from 'react';
import { useTaskManagement } from '../../hooks/useTaskManagement';

export const TaskManager: React.FC = () => {
  const { tasks, assignTask, completeTask } = useTaskManagement();
  const [newTask, setNewTask] = useState('');

  const handleAssign = () => {
    assignTask(newTask);
    setNewTask('');
  };

  return (
    <div className="task-manager">
      <h2 className="text-2xl font-bold mb-4">Task Management</h2>
      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={index} className="my-2 p-4 border">
            <h3>{task.name}</h3>
            <p>Assigned to: {task.assignee}</p>
            <button
              className="mt-2 bg-blue-500 text-white py-1 px-3"
              onClick={() => completeTask(task.id)}
            >
              Complete Task
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
          className="border p-2 w-full"
        />
        <button className="mt-2 bg-green-500 text-white py-2 px-4" onClick={handleAssign}>
          Assign Task
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useTaskManagement } from '../../hooks/useTaskManagement';

export const TaskManager: React.FC = () => {
  const { tasks, assignTask, completeTask, aiSuggestTask } = useTaskManagement();
  const [newTask, setNewTask] = useState('');

  const handleAssign = () => {
    assignTask(newTask);
    setNewTask('');
  };

  const handleAISuggest = () => {
    const suggestedTask = aiSuggestTask();
    setNewTask(suggestedTask);
  };

  return (
    <div className="task-manager">
      <h2 className="text-2xl font-bold mb-4">Task Management</h2>
      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={index} className="my-2 p-4 border">
            <h3>{task.name}</h3>
            <p>Assigned to: {task.assignee}</p>
            <button
              className="mt-2 bg-blue-500 text-white py-1 px-3"
              onClick={() => completeTask(task.id)}
            >
              Complete Task
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
          className="border p-2 w-full"
        />
        <button className="mt-2 bg-green-500 text-white py-2 px-4" onClick={handleAssign}>
          Assign Task
        </button>
        <button className="mt-2 bg-purple-500 text-white py-2 px-4" onClick={handleAISuggest}>
          AI Suggest Task
        </button>
      </div>
    </div>
  );
};
