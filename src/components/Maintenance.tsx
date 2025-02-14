import React, { useState } from 'react';
import { PlusCircle, PenTool as Tool, CheckCircle2, Clock, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Task } from '../types';

function Maintenance() {
  const { tasks, addTask, updateTask } = useApp();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({
    title: '',
    date: '',
    type: 'maintenance',
    status: 'pending'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(newTask);
    setIsAddingTask(false);
    setNewTask({
      title: '',
      date: '',
      type: 'maintenance',
      status: 'pending'
    });
  };

  const toggleTaskStatus = (taskId: number, currentStatus: Task['status']) => {
    updateTask(taskId, {
      status: currentStatus === 'completed' ? 'pending' : 'completed'
    });
  };

  const maintenanceTasks = tasks.filter(task => task.type === 'maintenance');

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Maintenance</h2>
          <p className="mt-1 text-gray-500">Track and manage home maintenance tasks</p>
        </div>
        <button
          onClick={() => setIsAddingTask(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Task
        </button>
      </div>

      {isAddingTask && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Maintenance Task</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Task Name</label>
                <input
                  type="text"
                  required
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  required
                  value={newTask.date}
                  onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAddingTask(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Pending Tasks</h3>
            </div>
            <div className="p-6 space-y-4">
              {maintenanceTasks
                .filter(task => task.status === 'pending')
                .map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <Tool className="w-6 h-6 text-gray-400" />
                      <div>
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        <p className="text-sm text-gray-500">Due: {new Date(task.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleTaskStatus(task.id, task.status)}
                      className="p-2 text-gray-400 hover:text-green-500"
                    >
                      <CheckCircle2 className="w-6 h-6" />
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Completed Tasks</h3>
            </div>
            <div className="p-6 space-y-4">
              {maintenanceTasks
                .filter(task => task.status === 'completed')
                .map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg opacity-75"
                  >
                    <div className="flex items-center space-x-4">
                      <Tool className="w-6 h-6 text-green-500" />
                      <div>
                        <h4 className="font-medium text-gray-900 line-through">{task.title}</h4>
                        <p className="text-sm text-gray-500">Completed</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleTaskStatus(task.id, task.status)}
                      className="p-2 text-green-500 hover:text-gray-400"
                    >
                      <CheckCircle2 className="w-6 h-6" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maintenance;