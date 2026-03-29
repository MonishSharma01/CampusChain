'use client';
import { useState } from 'react';
import { Search, Lock, Unlock, Eye, X } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { initialTransactions } from '@/lib/mockData';
import styles from './Students.module.css';

interface Student {
  id: string;
  name: string;
  balance: number;
  spent: number;
  isActive: boolean;
}

const initialStudents: Student[] = [
  { id: 'STU94210', name: 'Aarav Sharma', balance: 1250, spent: 450, isActive: true },
  { id: 'STU81922', name: 'Aditi Verma', balance: 450, spent: 1200, isActive: true },
  { id: 'STU53912', name: 'Rohan Patel', balance: 80, spent: 2100, isActive: false },
  { id: 'STU11029', name: 'Neha Gupta', balance: 920, spent: 150, isActive: true },
  { id: 'STU39210', name: 'Vikram Singh', balance: 2100, spent: 890, isActive: true },
  { id: 'STU84921', name: 'Pooja Reddy', balance: 50, spent: 4000, isActive: true },
];

const CATEGORY_COLORS = ['#F5C518', '#FFD700', '#1A1A2E', '#E2E8F0'];
const chartData = [
  { name: 'Canteen', value: 45 },
  { name: 'Library', value: 20 },
  { name: 'Events', value: 15 },
  { name: 'Fees', value: 20 },
];

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const toggleStatus = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStudents(students.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="title-xl">Student Directory</h1>
        <p className={styles.subtitle}>Manage student wallets and view individual spending behavior.</p>
      </header>

      <Card className={styles.tableCard} padding="none">
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search students..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student</th>
                <th>ID</th>
                <th>Token Balance</th>
                <th>Total Spent</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className={styles.row}>
                  <td className={styles.boldCell}>{student.name}</td>
                  <td className={styles.monoCell}>{student.id}</td>
                  <td className={styles.amountCell}>{student.balance.toLocaleString()} CC</td>
                  <td className={styles.spentCell}>{student.spent.toLocaleString()} CC</td>
                  <td>
                    <Badge 
                      label={student.isActive ? 'Active' : 'Frozen'} 
                      variant={student.isActive ? 'success' : 'warning'} 
                    />
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button 
                        onClick={() => setSelectedStudent(student)}
                        className={styles.iconBtn}
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={(e) => toggleStatus(student.id, e)}
                        className={`${styles.iconBtn} ${student.isActive ? styles.btnDanger : styles.btnSuccess}`}
                        title={student.isActive ? 'Freeze Wallet' : 'Unfreeze Wallet'}
                      >
                        {student.isActive ? <Lock size={18} /> : <Unlock size={18} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={6} className={styles.emptyTable}>No students found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Details Modal */}
      {selectedStudent && (
        <div className={styles.modalOverlay} onClick={() => setSelectedStudent(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedStudent(null)}>
              <X size={24} />
            </button>
            
            <div className={styles.modalHeader}>
              <div className={styles.studentAvatar}>{selectedStudent.name.charAt(0)}</div>
              <div>
                <h2>{selectedStudent.name}</h2>
                <p>{selectedStudent.id}</p>
              </div>
            </div>

            <div className={styles.modalGrid}>
              <div className={styles.chartSection}>
                <h3>Spending Breakdown</h3>
                <div className={styles.chartWrapper}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={chartData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value">
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-card)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className={styles.recentSection}>
                <h3>Recent Transactions</h3>
                <div className={styles.recentList}>
                  {initialTransactions.slice(0, 3).map(tx => (
                    <div key={tx.id} className={styles.recentTx}>
                      <div className={styles.txMeta}>
                        <span className={styles.txDesc}>{tx.category.toUpperCase()}</span>
                        <span className={styles.txTime}>{new Date(tx.timestamp).toLocaleDateString()}</span>
                      </div>
                      <span className={styles.txAmount}>{tx.amount} CC</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
