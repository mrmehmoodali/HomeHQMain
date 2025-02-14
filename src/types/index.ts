export interface Bill {
  id: number;
  name: string;
  amount: number;
  dueDate: string;
  category: string;
  isAutoPay: boolean;
  status: 'paid' | 'pending' | 'overdue';
}

export interface Task {
  id: number;
  title: string;
  date: string;
  type: 'maintenance' | 'bill';
  status: 'completed' | 'pending';
}

export interface Expense {
  id: number;
  title: string;
  amount: number;
  date: string;
  category: string;
}

export interface Warranty {
  id: number;
  item: string;
  manufacturer: string;
  purchaseDate: string;
  expiryDate: string;
  coverage: string;
  documents: string[];
  status: 'active' | 'expired';
}

export interface Document {
  id: number;
  title: string;
  category: string;
  uploadDate: string;
  url: string;
  tags: string[];
}

export interface Budget {
  id: number;
  category: string;
  planned: number;
  actual: number;
  month: string;
  year: number;
}

export interface Vendor {
  id: number;
  name: string;
  category: string;
  phone: string;
  email: string;
  rating: number;
  lastUsed?: string;
  notes?: string;
}