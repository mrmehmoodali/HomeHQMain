import React from 'react';
import { AlertTriangle, DollarSign, Calendar, PenTool as Tool } from 'lucide-react';
import { useApp } from '../context/AppContext';

function Dashboard() {
  const { bills, tasks, expenses } = useApp();

  const upcomingTasks = tasks.filter(task => new Date(task.date) > new Date());
  const dueSoonBills = bills.filter(bill => {
    const dueDate = new Date(bill.dueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && bill.status === 'pending';
  });

  const totalMonthlyExpenses = expenses.reduce((total, expense) => {
    const expenseDate = new Date(expense.date);
    const currentDate = new Date();
    if (expenseDate.getMonth() === currentDate.getMonth() && 
        expenseDate.getFullYear() === currentDate.getFullYear()) {
      return total + expense.amount;
    }
    return total;
  }, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
        <p className="mt-1 text-gray-500">Here's what's happening with your home</p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
        <div className="p-6 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-blue-600" />
            <h3 className="ml-3 text-lg font-semibold text-blue-900">Upcoming Tasks</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-blue-900">{upcomingTasks.length}</p>
        </div>

        <div className="p-6 bg-green-50 rounded-lg">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-green-600" />
            <h3 className="ml-3 text-lg font-semibold text-green-900">Monthly Expenses</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-green-900">${totalMonthlyExpenses.toFixed(2)}</p>
        </div>

        <div className="p-6 bg-yellow-50 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
            <h3 className="ml-3 text-lg font-semibold text-yellow-900">Due Soon</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-yellow-900">{dueSoonBills.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h3>
          <div className="mt-4 space-y-4">
            {upcomingTasks.slice(0, 5).map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Tool className="w-5 h-5 text-gray-500" />
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <p className="text-sm text-gray-500">{new Date(task.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full ${
                  task.type === 'maintenance' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {task.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Recent Expenses</h3>
          <div className="mt-4 space-y-4">
            {expenses.slice(0, 5).map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-gray-500" />
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">{expense.title}</p>
                    <p className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className="font-medium text-gray-900">
                  ${expense.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;