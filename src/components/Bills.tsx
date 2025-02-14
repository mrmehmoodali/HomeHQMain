import React, { useState } from 'react';
import { PlusCircle, Receipt, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Bill } from '../types';

function Bills() {
  const { bills, addBill, updateBill } = useApp();
  const [isAddingBill, setIsAddingBill] = useState(false);
  const [newBill, setNewBill] = useState<Omit<Bill, 'id'>>({
    name: '',
    amount: 0,
    dueDate: '',
    category: '',
    isAutoPay: false,
    status: 'pending'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBill(newBill);
    setIsAddingBill(false);
    setNewBill({
      name: '',
      amount: 0,
      dueDate: '',
      category: '',
      isAutoPay: false,
      status: 'pending'
    });
  };

  const getStatusIcon = (status: Bill['status']) => {
    switch (status) {
      case 'paid':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'overdue':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bills</h2>
          <p className="mt-1 text-gray-500">Manage your recurring bills and payments</p>
        </div>
        <button
          onClick={() => setIsAddingBill(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Bill
        </button>
      </div>

      {isAddingBill && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Bill</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  value={newBill.name}
                  onChange={(e) => setNewBill({ ...newBill, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  required
                  value={newBill.amount}
                  onChange={(e) => setNewBill({ ...newBill, amount: parseFloat(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  required
                  value={newBill.dueDate}
                  onChange={(e) => setNewBill({ ...newBill, dueDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  required
                  value={newBill.category}
                  onChange={(e) => setNewBill({ ...newBill, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  <option value="Housing">Housing</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Services">Services</option>
                </select>
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoPay"
                checked={newBill.isAutoPay}
                onChange={(e) => setNewBill({ ...newBill, isAutoPay: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="autoPay" className="ml-2 block text-sm text-gray-700">
                Set up auto-pay
              </label>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAddingBill(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Add Bill
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {bills.map((bill) => (
          <div
            key={bill.id}
            className="flex items-center justify-between p-6 bg-white rounded-lg shadow"
          >
            <div className="flex items-center space-x-4">
              <Receipt className="w-8 h-8 text-gray-400" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">{bill.name}</h3>
                <p className="text-sm text-gray-500">Due on {new Date(bill.dueDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">${bill.amount.toFixed(2)}</p>
                <p className="text-sm text-gray-500">{bill.category}</p>
              </div>
              <div className="flex items-center space-x-2">
                {bill.isAutoPay && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Auto-pay
                  </span>
                )}
                {getStatusIcon(bill.status)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bills;