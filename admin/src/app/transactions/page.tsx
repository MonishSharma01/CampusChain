'use client';
import { useState, Fragment } from 'react';
import { Search, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { initialTransactions, categories, Category } from '@/lib/mockData';
import styles from './Transactions.module.css';

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<Category | 'all'>('all');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newSet = new Set(expandedRows);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedRows(newSet);
  };

  const filteredTransactions = initialTransactions.filter(tx => {
    const matchesSearch = tx.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tx.walletAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || tx.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="title-xl">Ledger Audit</h1>
        <p className={styles.subtitle}>Raw blockchain records of all student transactions.</p>
      </header>

      <Card className={styles.tableCard} padding="none">
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search by student or wallet 0x..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.filterBox}>
            <Filter size={18} className={styles.filterIcon} />
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as Category | 'all')}
              className={styles.filterSelect}
            >
              <option value="all">All Categories</option>
              {categories.map(c => (
                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th>Student</th>
                <th>Wallet</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => {
                const isExpanded = expandedRows.has(tx.id);
                return (
                  <Fragment key={tx.id}>
                    <tr 
                      className={`${styles.row} ${isExpanded ? styles.rowExpanded : ''}`}
                      onClick={() => toggleRow(tx.id)}
                    >
                      <td className={styles.chevronCell}>
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </td>
                      <td className={styles.boldCell}>{tx.studentName}</td>
                      <td className={styles.monoCell}>{tx.walletAddress}</td>
                      <td><Badge label={tx.category} variant={tx.category} /></td>
                      <td className={styles.amountCell}>{tx.amount} CC</td>
                      <td><Badge label={tx.status} variant={tx.status} /></td>
                      <td className={styles.timeCell}>{new Date(tx.timestamp).toLocaleTimeString()}</td>
                    </tr>
                    {isExpanded && (
                      <tr className={styles.expandedContentRow}>
                        <td colSpan={7}>
                          <div className={styles.expandedContent}>
                            <div className={styles.detailGrid}>
                              <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Full Transaction Hash</span>
                                <span className={styles.detailValueMono}>{tx.blockHash}</span>
                              </div>
                              <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Block Number</span>
                                <span className={styles.detailValue}>{tx.blockNumber.toLocaleString()}</span>
                              </div>
                              <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Confirmation Status</span>
                                <span className={styles.detailValueSuccess}>Confirmed</span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={7} className={styles.emptyTable}>
                    No transactions found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
