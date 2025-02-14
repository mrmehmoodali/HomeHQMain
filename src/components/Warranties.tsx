import React, { useState } from 'react';
import { PlusCircle, Shield, AlertTriangle, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Warranty } from '../types';

function Warranties() {
  const { warranties, addWarranty, updateWarranty } = useApp();
  const [isAddingWarranty, setIsAddingWarranty] = useState(false);
  const [newWarranty, setNewWarranty] = useState<Omit<Warranty, 'id'>>({
    item: '',
    manufacturer: '',
    purchaseDate: '',
    expiryDate: '',
    coverage: '',
    documents: [],
    status: 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWarranty(newWarranty);
    setIsAddingWarranty(false);
    setNewWarranty({
      item: '',
      manufacturer: '',
      purchaseDate: '',
      expiryDate: '',
      coverage: '',
      documents: [],
      status: 'active'
    });
  };

  const getWarrantyStatus = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry <= 0) {
      return { status: 'expired', className: 'bg-red-100 text-red-800' };
    } else if (daysUntilExpiry <= 30) {
      return { status: 'expiring soon', className: 'bg-yellow-100 text-yellow-800' };
    }
    return { status: 'active', className: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Warranties</h2>
          <p className="mt-1 text-gray-500">Track your product warranties and coverage</p>
        </div>
        <button
          onClick={() => setIsAddingWarranty(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Warranty
        </button>
      </div>

      {isAddingWarranty && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Warranty</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Item Name</label>
                <input
                  type="text"
                  required
                  value={newWarranty.item}
                  onChange={(e) => setNewWarranty({ ...newWarranty, item: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
                <input
                  type="text"
                  required
                  value={newWarranty.manufacturer}
                  onChange={(e) => setNewWarranty({ ...newWarranty, manufacturer: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Purchase Date</label>
                <input
                  type="date"
                  required
                  value={newWarranty.purchaseDate}
                  onChange={(e) => setNewWarranty({ ...newWarranty, purchaseDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="date"
                  required
                  value={newWarranty.expiryDate}
                  onChange={(e) => setNewWarranty({ ...newWarranty, expiryDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Coverage Details</label>
                <textarea
                  required
                  value={newWarranty.coverage}
                  onChange={(e) => setNewWarranty({ ...newWarranty, coverage: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAddingWarranty(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Add Warranty
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {warranties.map((warranty) => {
          const { status, className } = getWarrantyStatus(warranty.expiryDate);
          return (
            <div key={warranty.id} className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-900">{warranty.item}</h3>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full ${className}`}>
                    {status}
                  </span>
                </div>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Manufacturer</p>
                    <p className="font-medium text-gray-900">{warranty.manufacturer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Purchase Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(warranty.purchaseDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expiry Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(warranty.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Documents</p>
                    <div className="flex space-x-2">
                      {warranty.documents.map((doc, index) => (
                        <button
                          key={index}
                          className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          <span className="text-sm">View</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Coverage</p>
                  <p className="mt-1 text-gray-900">{warranty.coverage}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Warranties;