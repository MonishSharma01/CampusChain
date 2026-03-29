'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Bell, Zap, Send, History, Gift, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import CountUp from 'react-countup'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { student, transactions, weeklySpending, categoryBreakdown } from '../mockData'
import clsx from 'clsx'

const QUICK_ACTIONS = [
  { label: 'Scan QR', icon: Zap, path: '/dashboard/qr', color: 'bg-primary-yellow' },
  { label: 'Send', icon: Send, path: '/dashboard/transfer', color: 'bg-blue-500' },
  { label: 'History', icon: History, path: '/dashboard/transactions', color: 'bg-green-500' },
  { label: 'Rewards', icon: Gift, path: '/dashboard/profile', color: 'bg-purple-500' },
]

export default function HomePage() {
  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div>
        <h2 className="text-muted-gray text-xs font-semibold uppercase tracking-wider">{greeting()}</h2>
        <h1 className="text-2xl font-heading font-extrabold text-deep-charcoal">{student.name.split(' ')[0]} 👋</h1>
      </div>

      {/* Balance Hero Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-deep-charcoal rounded-3xl p-8 text-white overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-yellow/10 rounded-full blur-3xl -mr-16 -mt-16" />
        
        <p className="text-white/60 text-sm font-medium">Available Balance</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-4xl font-heading font-extrabold text-primary-yellow">
            <CountUp end={student.balance} duration={2} separator="," />
          </span>
          <span className="text-xl font-heading font-bold text-white/40">CC</span>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex justify-between text-xs">
            <span className="text-white/60">Semester Usage</span>
            <span className="text-primary-yellow font-bold">
              {Math.round((student.balance / student.semesterAllocation) * 100)}% Left
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(student.balance / student.semesterAllocation) * 100}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-primary-yellow shadow-[0_0_10px_rgba(245,197,24,0.5)]"
            />
          </div>
          <div className="flex justify-between text-[10px] text-white/40 font-mono">
            <span>ALLOCATED: {student.semesterAllocation} CC</span>
            <span>PERIOD: {student.semesterStart} - {student.semesterEnd}</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-4 gap-4">
        {QUICK_ACTIONS.map((action, idx) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col items-center space-y-2 group"
          >
            <div className={clsx(
              "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all group-hover:-translate-y-1 group-hover:shadow-xl",
              action.color
            )}>
              <action.icon size={20} />
            </div>
            <span className="text-[10px] font-bold text-deep-charcoal/60 uppercase group-hover:text-deep-charcoal transition-colors">
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Spending Trend Chart */}
      <div className="card-base">
        <h3 className="text-sm font-heading font-bold text-deep-charcoal mb-6">Spending Trend</h3>
        <div className="h-48 w-full -ml-4" tabIndex={-1} style={{ outline: 'none' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklySpending} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} style={{ outline: 'none' }}>
              <defs>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F5C518" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#F5C518" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A1A2E', 
                  border: '1px solid #F5C518', 
                  borderRadius: '12px',
                  color: '#fff' 
                }}
                itemStyle={{ color: '#F5C518' }}
              />
              <Area 
                type="monotone" 
                dataKey="canteen" 
                stroke="#F5C518" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorSpend)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="card-base flex flex-col items-center">
        <h3 className="w-full text-sm font-heading font-bold text-deep-charcoal mb-6">Category Breakdown</h3>
        <div className="h-48 w-full relative" tabIndex={-1} style={{ outline: 'none' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart style={{ outline: 'none' }}>
              <Pie
                data={categoryBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                animationDuration={1000}
              >
                {categoryBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} style={{ outline: 'none' }} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] text-muted-gray uppercase font-bold tracking-widest">Top Exp</span>
            <span className="text-lg font-heading font-extrabold text-deep-charcoal">Canteen</span>
          </div>
        </div>
        
        {/* Custom Legend */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4">
          {categoryBreakdown.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs font-bold text-deep-charcoal/80">{item.name}</span>
              <span className="text-[10px] text-muted-gray">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-heading font-bold text-deep-charcoal">Recent Activity</h3>
          <button className="text-[10px] font-bold text-primary-yellow hover:underline">SEE ALL →</button>
        </div>
        <div className="space-y-3">
          {transactions.slice(0, 4).map((tx, idx) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + (idx * 0.1) }}
              className="flex items-center justify-between p-4 bg-white border border-light-border-gray rounded-2xl group hover:border-primary-yellow transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={clsx(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                  tx.amount > 0 ? "bg-green-500/10 text-green-500" : "bg-primary-yellow/10 text-primary-yellow"
                )}>
                  {tx.amount > 0 ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-deep-charcoal leading-tight">{tx.title}</h4>
                  <p className="text-[10px] text-muted-gray">{tx.time}</p>
                </div>
              </div>
              <div className={clsx(
                "font-heading font-extrabold text-sm",
                tx.amount > 0 ? "text-green-500" : "text-deep-charcoal"
              )}>
                {tx.amount > 0 ? '+' : ''}{tx.amount} CC
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
