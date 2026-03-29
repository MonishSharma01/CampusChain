'use client';

import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts';
import { Activity, Coins, Wallet, Users } from 'lucide-react';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import Badge from '@/components/Badge';
import { initialTransactions, generateMockTransaction, Transaction, generateRandomHash } from '@/lib/mockData';
import styles from './Dashboard.module.css';

// Chart Data Mocks
const trendData = [
  { name: 'Mon', amount: 4000 },
  { name: 'Tue', amount: 3000 },
  { name: 'Wed', amount: 5000 },
  { name: 'Thu', amount: 2780 },
  { name: 'Fri', amount: 6890 },
  { name: 'Sat', amount: 8390 },
  { name: 'Sun', amount: 7490 },
];

const categoryData = [
  { name: 'Canteen', value: 45 },
  { name: 'Library', value: 15 },
  { name: 'Events', value: 25 },
  { name: 'Fees', value: 15 },
];

const CATEGORY_COLORS = ['#F5C518', '#FFD700', '#1A1A2E', '#E2E8F0'];

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions.slice(0, 5));
  const [latestBlock, setLatestBlock] = useState({ number: 1045290, hash: generateRandomHash() });

  useEffect(() => {
    const interval = setInterval(() => {
      const newTx = generateMockTransaction();
      setTransactions(prev => [newTx, ...prev].slice(0, 6));
      setLatestBlock(prev => ({
        number: prev.number + 1,
        hash: newTx.blockHash
      }));
    }, 4500); // New tx every 4.5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className="title-xl">Campus Economy Overview</h1>
          <p className={styles.subtitle}>Tracking all student token activity globally.</p>
        </div>
      </header>

      <section className={styles.statsGrid}>
        <StatCard title="Total Distributed" value={1425000} suffix=" CC" icon={<Coins />} />
        <StatCard title="Collected Today" value={24500} suffix=" CC" icon={<Wallet />} />
        <StatCard title="Total Transactions" value={84092} icon={<Activity />} />
        <StatCard title="Active Students" value={4250} icon={<Users />} />
      </section>

      <div className={styles.mainGrid}>
        <div className={styles.chartsColumn}>
          <Card className={styles.chartCard}>
            <h3 className={styles.cardTitle}>Campus-Wide Spending Trend</h3>
            <div className={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F5C518" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#F5C518" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-card)' }} />
                  <Area type="monotone" dataKey="amount" stroke="#F5C518" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className={styles.subChartsGrid}>
            <Card className={styles.chartCard}>
              <h3 className={styles.cardTitle}>Category Breakdown</h3>
              <div className={styles.chartWrapperSmall}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-card)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className={styles.chartCard}>
              <h3 className={styles.cardTitle}>Token Circulation</h3>
              <div className={styles.chartWrapperSmall}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={10} data={[{ name: 'Circulation', uv: 78, fill: '#F5C518' }]}>
                    <RadialBar background dataKey="uv" cornerRadius={10} />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className={styles.radialText}>
                      78%
                    </text>
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>

        <div className={styles.feedColumn}>
          <Card className={styles.feedCard}>
            <div className={styles.feedHeader}>
              <h3 className={styles.cardTitle}>Live Transaction Feed</h3>
              <div className={styles.pulseIndicator}></div>
            </div>
            <div className={styles.txList}>
              {transactions.map((tx, idx) => (
                <div key={tx.id} className={`${styles.txItem} ${idx === 0 ? 'animate-slide-in flash-bg' : ''}`}>
                  <div className={styles.txInfo}>
                    <div className={styles.txName}>{tx.studentName}</div>
                    <div className={styles.txTime}>{new Date(tx.timestamp).toLocaleTimeString()}</div>
                  </div>
                  <Badge label={tx.category} variant={tx.category} />
                  <div className={styles.txAmount}>{tx.amount} CC</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className={styles.blockchainCard}>
            <h3 className={styles.cardTitle}>Network Status</h3>
            <div className={styles.networkStats}>
              <div className={styles.networkStat}>
                <span className={styles.statLabel}>Latest Block</span>
                <span className={styles.statValue}>#{latestBlock.number.toLocaleString()}</span>
              </div>
              <div className={styles.networkStat}>
                <span className={styles.statLabel}>Block Hash</span>
                <span className={styles.statHash}>{latestBlock.hash.substring(0, 16)}...</span>
              </div>
              <div className={styles.networkStat}>
                <span className={styles.statLabel}>Status</span>
                <span className={styles.statStatus}>Syncing <span className={styles.dotPulse}></span></span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
