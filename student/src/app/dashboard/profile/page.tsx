'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, ShieldCheck, Trophy, ArrowUpRight, ArrowDownLeft, Wallet, PieChart as PieChartIcon, Settings, LogOut } from 'lucide-react'
import CountUp from 'react-countup'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { student, transactions, rewards, categoryBreakdown } from '../mockData'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'Credits' | 'Debits'>('Credits')

  const creditTransactions = transactions.filter(tx => tx.amount > 0)
  const debitTransactions = transactions.filter(tx => tx.amount < 0)

  const handleLogout = () => {
    // Simple redirect to simulate logout
    router.push('/auth/login')
  }

  return (
    <div className="space-y-8 pb-32">
      {/* Header & Settings */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-extrabold text-deep-charcoal">My Wallet</h1>
        <div className="flex gap-2">
            <button className="p-2 bg-warm-yellow-mist rounded-xl text-deep-charcoal hover:bg-primary-yellow transition-colors">
            <Settings size={20} />
            </button>
            <button 
                onClick={handleLogout}
                className="p-2 bg-red-50 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
            >
            <LogOut size={20} />
            </button>
        </div>
      </div>

      {/* Profile Hero */}
      <div className="flex flex-col items-center">
        <div className="relative group">
          <div className="absolute inset-0 bg-primary-yellow rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
          <div className="relative w-24 h-24 bg-deep-charcoal border-4 border-white rounded-full flex items-center justify-center text-primary-yellow text-3xl font-heading font-extrabold shadow-2xl">
            {student.avatar}
            <div className="absolute -bottom-1 -right-1 bg-primary-yellow w-8 h-8 rounded-full border-4 border-white flex items-center justify-center text-deep-charcoal">
              <ShieldCheck size={16} strokeWidth={3} />
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-xl font-heading font-extrabold text-deep-charcoal leading-tight">{student.name}</h2>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <span className="text-[10px] font-bold px-2 py-1 bg-primary-yellow/10 text-primary-yellow rounded-full border border-primary-yellow/10 uppercase tracking-widest leading-none">ID: {student.id}</span>
            <span className="text-[10px] font-bold px-2 py-1 bg-warm-yellow-mist text-muted-gray rounded-full border border-light-border-gray uppercase tracking-widest leading-none">{student.department}</span>
            <span className="text-[10px] font-bold px-2 py-1 bg-warm-yellow-mist text-muted-gray rounded-full border border-light-border-gray uppercase tracking-widest leading-none">Sem {student.semester}</span>
          </div>
        </div>
      </div>

      {/* Wallet Summary Card */}
      <div className="card-base bg-deep-charcoal text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary-yellow/5 rounded-full -mr-24 -mt-24 blur-3xl pointer-events-none group-hover:bg-primary-yellow/10 transition-colors" />
        
        <div className="flex items-start justify-between">
            <div className="space-y-1">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Total Available</p>
                <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-heading font-extrabold text-primary-yellow">
                        <CountUp end={student.balance} duration={2} />
                    </span>
                    <span className="text-sm font-bold text-white/40 uppercase">CC</span>
                </div>
            </div>
            <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                <Wallet className="text-primary-yellow" size={24} />
            </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Semester Spent</p>
              <p className="text-sm font-heading font-bold">{student.semesterAllocation - student.balance} CC</p>
            </div>
            <p className="text-primary-yellow font-bold text-sm">
                {Math.round(((student.semesterAllocation - student.balance) / student.semesterAllocation) * 100)}%
            </p>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5 shadow-inner">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${((student.semesterAllocation - student.balance) / student.semesterAllocation) * 100}%` }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               className="h-full bg-primary-yellow rounded-full shadow-[0_0_10px_rgba(245,197,24,0.6)]"
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2 text-center pt-6 border-t border-white/5 border-dashed">
            <div>
                <p className="text-[8px] text-white/40 uppercase font-bold tracking-widest mb-1">Allocated</p>
                <p className="text-xs font-heading font-bold text-white/80">{student.semesterAllocation}</p>
            </div>
            <div className="border-x border-white/5">
                <p className="text-[8px] text-white/40 uppercase font-bold tracking-widest mb-1">Earned</p>
                <p className="text-xs font-heading font-bold text-green-400">+525</p>
            </div>
            <div>
                <p className="text-[8px] text-white/40 uppercase font-bold tracking-widest mb-1">Penalty</p>
                <p className="text-xs font-heading font-bold text-red-400">-10</p>
            </div>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-heading font-bold text-deep-charcoal flex items-center gap-2">
                <Trophy size={16} className="text-primary-yellow" /> Rewards Earned
            </h3>
            <span className="text-[10px] font-bold text-primary-yellow uppercase tracking-widest">{rewards.length} Badges</span>
        </div>
        <div className="space-y-3">
          {rewards.map((reward, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="px-4 py-3 bg-white border border-light-border-gray rounded-2xl flex items-center justify-between group hover:border-primary-yellow transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-yellow/10 flex items-center justify-center text-primary-yellow transition-transform group-hover:rotate-12">
                   <Trophy size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-deep-charcoal leading-tight">{reward.title}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[8px] text-muted-gray">{reward.date}</span>
                    <span className="text-[8px] uppercase font-bold text-primary-yellow/60"># {reward.category}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm font-heading font-extrabold text-green-500">+{reward.tokens}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="card-base space-y-6">
        <h3 className="text-sm font-heading font-bold text-deep-charcoal flex items-center gap-2">
            <PieChartIcon size={16} className="text-primary-yellow" /> Spending Insights
        </h3>
        <div className="h-48 w-full -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryBreakdown}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
              <Tooltip 
                cursor={{ fill: '#FFFDE7' }}
                contentStyle={{ backgroundColor: '#1A1A2E', borderRadius: '12px', color: '#fff' }} 
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} animationDuration={1000}>
                 {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                 ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transaction Tabs (Credits/Debits) */}
      <div className="space-y-4">
        <div className="flex p-1 bg-warm-yellow-mist rounded-xl">
           {(['Credits', 'Debits'] as const).map(tab => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={clsx(
                 "flex-1 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all relative overflow-hidden",
                 activeTab === tab ? "text-deep-charcoal" : "text-muted-gray"
               )}
             >
               {activeTab === tab && (
                 <motion.div
                   layoutId="profile-tab"
                   className="absolute inset-0 bg-white shadow-sm border border-primary-yellow/5"
                   transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                 />
               )}
               <span className="relative z-10">{tab}</span>
             </button>
           ))}
        </div>

        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {(activeTab === 'Credits' ? creditTransactions : debitTransactions).slice(0, 5).map((tx, idx) => (
             <div key={tx.id} className="flex items-center justify-between px-2 py-3 border-b border-light-border-gray/50 hover:bg-warm-yellow-mist/20 transition-colors">
                <div className="flex items-center gap-4">
                    <div className={clsx(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        tx.amount > 0 ? "bg-green-100 text-green-500" : "bg-red-50 text-red-400"
                    )}>
                        {tx.amount > 0 ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                    </div>
                    <div>
                        <p className="text-xs font-bold text-deep-charcoal leading-none mb-1">{tx.title}</p>
                        <p className="text-[10px] text-muted-gray">{tx.time}</p>
                    </div>
                </div>
                <p className={clsx(
                    "text-xs font-heading font-extrabold",
                    tx.amount > 0 ? "text-green-500" : "text-deep-charcoal"
                )}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount}
                </p>
             </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
