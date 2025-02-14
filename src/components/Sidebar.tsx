import React from 'react';
import { Home, Receipt, PenTool as Tool, Shield, FileBox, PiggyBank, Users, Calendar } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: Home, id: 'dashboard' },
  { name: 'Bills', icon: Receipt, id: 'bills' },
  { name: 'Maintenance', icon: Tool, id: 'maintenance' },
  { name: 'Warranties', icon: Shield, id: 'warranties' },
  { name: 'Documents', icon: FileBox, id: 'documents' },
  { name: 'Budget', icon: PiggyBank, id: 'budget' },
  { name: 'Vendors', icon: Users, id: 'vendors' },
  { name: 'Calendar', icon: Calendar, id: 'calendar' },
];

interface SidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

function Sidebar({ onNavigate, currentPage }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200">
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">HomeHQ</h1>
      </div>
      <nav className="px-4 py-4">
        {navigation.map((item) => (
          <button
            key={item.name}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center w-full px-2 py-2 mt-1 text-sm font-medium rounded-md
              ${currentPage === item.id
                ? 'text-blue-700 bg-blue-50'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;