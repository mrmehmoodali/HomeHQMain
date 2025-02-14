import React from 'react';
import { Home, Receipt, PenTool as Tool, Shield, FileBox, PiggyBank, Users, Calendar } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Bills from './components/Bills';
import Maintenance from './components/Maintenance';
import Warranties from './components/Warranties';
import { AppProvider } from './context/AppContext';

function App() {
  const [currentPage, setCurrentPage] = React.useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'bills':
        return <Bills />;
      case 'maintenance':
        return <Maintenance />;
      case 'warranties':
        return <Warranties />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar onNavigate={setCurrentPage} currentPage={currentPage} />
        <main className="flex-1">
          {renderPage()}
        </main>
      </div>
    </AppProvider>
  );
}

export default App;