'use client';
import { useState, useEffect } from 'react';
import { BookOpen, AlertCircle, Clock } from 'lucide-react';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import styles from './Library.module.css';

interface BorrowRecord {
  id: string;
  studentName: string;
  bookName: string;
  borrowDate: string;
  returnDate: string;
  isLate: boolean;
  fineAmount: number;
}

const initialRecords: BorrowRecord[] = [
  { id: '1', studentName: 'Aarav Sharma', bookName: 'Introduction to Algorithms', borrowDate: '2026-03-10', returnDate: '2026-03-24', isLate: true, fineAmount: 45 },
  { id: '2', studentName: 'Neha Gupta', bookName: 'Clean Code', borrowDate: '2026-03-20', returnDate: '2026-04-03', isLate: false, fineAmount: 0 },
  { id: '3', studentName: 'Rohan Patel', bookName: 'Design Patterns', borrowDate: '2026-03-05', returnDate: '2026-03-19', isLate: true, fineAmount: 90 },
  { id: '4', studentName: 'Aditi Verma', bookName: 'The Pragmatic Programmer', borrowDate: '2026-03-22', returnDate: '2026-04-05', isLate: false, fineAmount: 0 },
];

export default function LibraryPage() {
  const [records, setRecords] = useState<BorrowRecord[]>(initialRecords);

  // Simulate live fine increasing for late books (1 CC every 3 seconds for dramatic effect)
  useEffect(() => {
    const interval = setInterval(() => {
      setRecords(prev => prev.map(record => {
        if (record.isLate) {
          return { ...record, fineAmount: record.fineAmount + 1 };
        }
        return record;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="title-xl">Library Control Center</h1>
        <p className={styles.subtitle}>Monitor campus book borrows and live fine accumulations algorithmically tracked on-chain.</p>
      </header>

      <div className={styles.grid}>
        <div className={styles.mainCol}>
          <Card padding="none">
            <div className={styles.tableHeader}>
              <h2 className={styles.cardTitle}>Active Borrows</h2>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Book Title</th>
                    <th>Borrowed</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Accrued Fine</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map(record => (
                    <tr key={record.id} className={record.isLate ? styles.lateRow : ''}>
                      <td className={styles.boldCell}>{record.studentName}</td>
                      <td>
                        <div className={styles.bookCell}>
                          <BookOpen size={16} className={styles.bookIcon} />
                          {record.bookName}
                        </div>
                      </td>
                      <td className={styles.dateCell}>{record.borrowDate}</td>
                      <td className={styles.dateCell}>{record.returnDate}</td>
                      <td>
                        {record.isLate 
                          ? <Badge label="Overdue" variant="warning" />
                          : <Badge label="Active" variant="success" />
                        }
                      </td>
                      <td>
                        {record.isLate ? (
                          <div className={styles.fineDisplay}>
                            <span className={styles.fineAmount}>{record.fineAmount} CC</span>
                            <span className={styles.pulseDot}></span>
                          </div>
                        ) : (
                          <span className={styles.noFine}>-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className={styles.sideCol}>
          <Card className={styles.alertCard}>
            <div className={styles.alertHeader}>
              <AlertCircle className={styles.alertIcon} size={24} />
              <h3>Fine Generation Active</h3>
            </div>
            <p className={styles.alertText}>
              Overdue books are actively accumulating fines via smart contract. The system deducts balances instantly when returning.
            </p>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Total Overdue</span>
              <span className={styles.statValue}>{records.filter(r => r.isLate).length} Books</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
