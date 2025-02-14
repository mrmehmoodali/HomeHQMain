import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Bill, Task, Expense, Warranty, Document, Budget, Vendor } from '../types';

interface AppContextType {
  bills: Bill[];
  tasks: Task[];
  expenses: Expense[];
  warranties: Warranty[];
  documents: Document[];
  budgets: Budget[];
  vendors: Vendor[];
  addBill: (bill: Omit<Bill, 'id'>) => void;
  updateBill: (id: number, bill: Partial<Bill>) => void;
  deleteBill: (id: number) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: number, task: Partial<Task>) => void;
  deleteTask: (id: number) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  addWarranty: (warranty: Omit<Warranty, 'id'>) => void;
  updateWarranty: (id: number, warranty: Partial<Warranty>) => void;
  deleteWarranty: (id: number) => void;
  addDocument: (document: Omit<Document, 'id'>) => void;
  updateDocument: (id: number, document: Partial<Document>) => void;
  deleteDocument: (id: number) => void;
  addBudget: (budget: Omit<Budget, 'id'>) => void;
  updateBudget: (id: number, budget: Partial<Budget>) => void;
  addVendor: (vendor: Omit<Vendor, 'id'>) => void;
  updateVendor: (id: number, vendor: Partial<Vendor>) => void;
  deleteVendor: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialBills: Bill[] = [
  {
    id: 1,
    name: 'Mortgage',
    amount: 1500,
    dueDate: '2024-03-25',
    category: 'Housing',
    isAutoPay: true,
    status: 'pending'
  },
  {
    id: 2,
    name: 'Electric Bill',
    amount: 145.75,
    dueDate: '2024-03-15',
    category: 'Utilities',
    isAutoPay: false,
    status: 'paid'
  }
];

const initialTasks: Task[] = [
  { id: 1, title: 'HVAC Maintenance', date: '2024-03-20', type: 'maintenance', status: 'pending' },
  { id: 2, title: 'Property Tax Due', date: '2024-03-31', type: 'bill', status: 'pending' }
];

const initialExpenses: Expense[] = [
  { id: 1, title: 'Water Bill', amount: 85.50, date: '2024-03-01', category: 'Utilities' },
  { id: 2, title: 'Electricity', amount: 145.75, date: '2024-03-05', category: 'Utilities' }
];

const initialWarranties: Warranty[] = [
  {
    id: 1,
    item: 'Refrigerator',
    manufacturer: 'Samsung',
    purchaseDate: '2023-01-15',
    expiryDate: '2028-01-15',
    coverage: 'Parts and Labor',
    documents: ['warranty-card.pdf'],
    status: 'active'
  },
  {
    id: 2,
    item: 'HVAC System',
    manufacturer: 'Carrier',
    purchaseDate: '2022-06-01',
    expiryDate: '2027-06-01',
    coverage: 'Full System Coverage',
    documents: ['warranty-registration.pdf', 'service-contract.pdf'],
    status: 'active'
  }
];

const initialDocuments: Document[] = [
  {
    id: 1,
    title: 'Home Insurance Policy',
    category: 'Insurance',
    uploadDate: '2024-01-01',
    url: 'insurance-policy.pdf',
    tags: ['insurance', 'policy', 'home']
  },
  {
    id: 2,
    title: 'Property Deed',
    category: 'Legal',
    uploadDate: '2023-12-15',
    url: 'property-deed.pdf',
    tags: ['legal', 'property', 'deed']
  }
];

const initialBudgets: Budget[] = [
  {
    id: 1,
    category: 'Utilities',
    planned: 300,
    actual: 285.50,
    month: '03',
    year: 2024
  },
  {
    id: 2,
    category: 'Maintenance',
    planned: 200,
    actual: 150,
    month: '03',
    year: 2024
  }
];

const initialVendors: Vendor[] = [
  {
    id: 1,
    name: 'ABC Plumbing',
    category: 'Plumbing',
    phone: '555-0123',
    email: 'contact@abcplumbing.com',
    rating: 4.5,
    lastUsed: '2024-02-15',
    notes: 'Reliable emergency service'
  },
  {
    id: 2,
    name: 'XYZ Electric',
    category: 'Electrical',
    phone: '555-0124',
    email: 'service@xyzelectric.com',
    rating: 5,
    lastUsed: '2024-01-20',
    notes: 'Licensed for all electrical work'
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [bills, setBills] = useState<Bill[]>(initialBills);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [warranties, setWarranties] = useState<Warranty[]>(initialWarranties);
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);

  const addBill = (bill: Omit<Bill, 'id'>) => {
    const newBill = { ...bill, id: bills.length + 1 };
    setBills([...bills, newBill]);
  };

  const updateBill = (id: number, updatedBill: Partial<Bill>) => {
    setBills(bills.map(bill => bill.id === id ? { ...bill, ...updatedBill } : bill));
  };

  const deleteBill = (id: number) => {
    setBills(bills.filter(bill => bill.id !== id));
  };

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = { ...task, id: tasks.length + 1 };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: number, updatedTask: Partial<Task>) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: expenses.length + 1 };
    setExpenses([...expenses, newExpense]);
  };

  const addWarranty = (warranty: Omit<Warranty, 'id'>) => {
    const newWarranty = { ...warranty, id: warranties.length + 1 };
    setWarranties([...warranties, newWarranty]);
  };

  const updateWarranty = (id: number, updatedWarranty: Partial<Warranty>) => {
    setWarranties(warranties.map(warranty => 
      warranty.id === id ? { ...warranty, ...updatedWarranty } : warranty
    ));
  };

  const deleteWarranty = (id: number) => {
    setWarranties(warranties.filter(warranty => warranty.id !== id));
  };

  const addDocument = (document: Omit<Document, 'id'>) => {
    const newDocument = { ...document, id: documents.length + 1 };
    setDocuments([...documents, newDocument]);
  };

  const updateDocument = (id: number, updatedDocument: Partial<Document>) => {
    setDocuments(documents.map(document =>
      document.id === id ? { ...document, ...updatedDocument } : document
    ));
  };

  const deleteDocument = (id: number) => {
    setDocuments(documents.filter(document => document.id !== id));
  };

  const addBudget = (budget: Omit<Budget, 'id'>) => {
    const newBudget = { ...budget, id: budgets.length + 1 };
    setBudgets([...budgets, newBudget]);
  };

  const updateBudget = (id: number, updatedBudget: Partial<Budget>) => {
    setBudgets(budgets.map(budget =>
      budget.id === id ? { ...budget, ...updatedBudget } : budget
    ));
  };

  const addVendor = (vendor: Omit<Vendor, 'id'>) => {
    const newVendor = { ...vendor, id: vendors.length + 1 };
    setVendors([...vendors, newVendor]);
  };

  const updateVendor = (id: number, updatedVendor: Partial<Vendor>) => {
    setVendors(vendors.map(vendor =>
      vendor.id === id ? { ...vendor, ...updatedVendor } : vendor
    ));
  };

  const deleteVendor = (id: number) => {
    setVendors(vendors.filter(vendor => vendor.id !== id));
  };

  return (
    <AppContext.Provider value={{
      bills,
      tasks,
      expenses,
      warranties,
      documents,
      budgets,
      vendors,
      addBill,
      updateBill,
      deleteBill,
      addTask,
      updateTask,
      deleteTask,
      addExpense,
      addWarranty,
      updateWarranty,
      deleteWarranty,
      addDocument,
      updateDocument,
      deleteDocument,
      addBudget,
      updateBudget,
      addVendor,
      updateVendor,
      deleteVendor
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}