// mockData.ts
export const categories = ['canteen', 'library', 'events', 'fees'] as const;
export type Category = typeof categories[number];

export interface Transaction {
  id: string;
  studentName: string;
  studentId: string;
  walletAddress: string;
  amount: number;
  category: Category;
  status: 'success' | 'pending';
  timestamp: string;
  blockHash: string;
  description?: string;
  blockNumber: number;
}

const indianNames = [
  'Aarav Sharma', 'Aditi Verma', 'Rohan Patel', 'Neha Gupta',
  'Vikram Singh', 'Pooja Reddy', 'Karan Desai', 'Sneha Joshi',
  'Rahul Nair', 'Ananya Iyer', 'Amit Kumar', 'Priya Das'
];

export const generateRandomHash = () => {
  return '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
};

export const generateMockTransaction = (overrides?: Partial<Transaction>): Transaction => {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const name = indianNames[Math.floor(Math.random() * indianNames.length)];
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    studentName: name,
    studentId: `STU${Math.floor(10000 + Math.random() * 90000)}`,
    walletAddress: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
    amount: Math.floor(Math.random() * 300) + 10,
    category,
    status: Math.random() > 0.1 ? 'success' : 'pending',
    timestamp: new Date().toISOString(),
    blockHash: generateRandomHash(),
    blockNumber: Math.floor(1000000 + Math.random() * 100000),
    ...overrides
  };
};

export const initialTransactions: Transaction[] = Array.from({ length: 15 }, () => generateMockTransaction());
