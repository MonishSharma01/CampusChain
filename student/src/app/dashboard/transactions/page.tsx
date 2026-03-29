'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, AlertCircle, ArrowUpRight, ArrowDownLeft, BookOpen, Clock, Copy, CheckCircle2 } from 'lucide-react'
import { transactions, activeFine } from '../mockData'
import clsx from 'clsx'

const CATEGORIES = ['All', 'Canteen', 'Library', 'Events', 'Fees', 'Transfer', 'Reward']

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState('All')
  const [fineAmount, setFineAmount] = useState(activeFine.currentFine)
  const [showFine, setShowFine] = useState(true)
  const [expandedTx, setExpandedTx] = useState<string | null>(null)
  const [copiedHash, setCopiedHash] = useState<string | null>(null)

  // Live ticking fine counter simulation
  useEffect(() => {
    if (!showFine) return
    const interval = setInterval(() => {
      setFineAmount(prev => prev + 0.01)
    }, 2000)
    return () => clearInterval(interval)
  }, [showFine])

  const filteredTransactions = activeTab === 'All' 
    ? transactions 
    : transactions.filter(tx => tx.category.toLowerCase() === activeTab.toLowerCase())

  const handleCopyHash = (hash: string) => {
    setCopiedHash(hash)
    setTimeout(() => setCopiedHash(null), 2000)
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-extrabold text-deep-charcoal">History</h1>
        <div className="flex items-center gap-2">
          <button className="p-2 bg-warm-yellow-mist rounded-xl text-deep-charcoal hover:bg-primary-yellow transition-colors">
            <Search size={20} />
          </button>
          <button className="p-2 bg-warm-yellow-mist rounded-xl text-deep-charcoal hover:bg-primary-yellow transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Active Fine Alert Card */}
      <AnimatePresence>
        {showFine && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-red-50 border-2 border-red-100 rounded-3xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-100/50 rounded-full -mr-8 -mt-8 blur-2xl group-hover:blur-3xl transition-all" />
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">
                  <AlertCircle size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-red-900 font-bold text-sm">Outstanding Library Fine</h3>
                  <p className="text-red-700/70 text-[10px] mt-0.5 uppercase tracking-wider font-bold">
                    {activeFine.bookName}
                  </p>
                  
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p className="text-red-900/60 text-[10px] font-bold uppercase">Current Fine</p>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-3xl font-heading font-extrabold text-red-600">
                          {fineAmount.toFixed(2)}
                        </span>
                        <span className="text-xs font-bold text-red-600/60">CC</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowFine(false)}
                      className="bg-red-600 text-white text-xs font-bold py-2.5 px-6 rounded-xl hover:bg-red-700 transition-all shadow-md active:scale-95"
                    >
                      PAY NOW
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-red-100 flex items-center gap-4 text-[10px] text-red-500/70 font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1"><BookOpen size={12} /> DUEDATE: {activeFine.dueDate}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {activeFine.daysOverdue} DAYS OVERDUE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={clsx(
              "px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0",
              activeTab === category 
                ? "bg-primary-yellow border-primary-yellow text-deep-charcoal shadow-lg shadow-primary-yellow/20" 
                : "bg-white border-light-border-gray text-muted-gray hover:border-primary-yellow hover:text-deep-charcoal"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      <div className="space-y-6">
        <div className="space-y-3">
          {filteredTransactions.map((tx, idx) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setExpandedTx(expandedTx === tx.id ? null : tx.id)}
              className={clsx(
                "bg-white border rounded-2xl p-4 transition-all cursor-pointer group",
                expandedTx === tx.id ? "border-primary-yellow shadow-xl" : "border-light-border-gray hover:border-primary-yellow"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={clsx(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                    tx.amount > 0 ? "bg-green-500/10 text-green-500" : "bg-primary-yellow/10 text-primary-yellow"
                  )}>
                    {tx.amount > 0 ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-deep-charcoal leading-tight">{tx.title}</h4>
                      <span className="text-[8px] px-1.5 py-0.5 bg-warm-yellow-mist border border-primary-yellow/20 rounded-full font-bold uppercase text-primary-yellow/80">
                        {tx.category}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-gray mt-0.5">{tx.time}</p>
                  </div>
                </div>
                <div className={clsx(
                  "font-heading font-extrabold text-sm",
                  tx.amount > 0 ? "text-green-500" : "text-deep-charcoal"
                )}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount} CC
                </div>
              </div>

              {/* Expanded Tx Details */}
              <AnimatePresence>
                {expandedTx === tx.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-dashed border-light-border-gray space-y-3">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-muted-gray font-bold uppercase tracking-widest">Transaction Hash</span>
                        <div className="flex items-center gap-2">
                          <code className="bg-warm-yellow-mist px-2 py-1 rounded text-primary-yellow font-mono">{tx.hash}</code>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyHash(tx.hash);
                            }}
                            className="p-1 hover:bg-warm-yellow-mist rounded transition-colors"
                          >
                            {copiedHash === tx.hash ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} className="text-muted-gray" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-muted-gray font-bold uppercase tracking-widest">Block Confirmation</span>
                        <span className="text-deep-charcoal font-bold">12,482 Blocks Approved</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-muted-gray font-bold uppercase tracking-widest">Digital Signature</span>
                        <span className="text-green-500 font-bold flex items-center gap-1">
                          <CheckCircle2 size={12} /> VERIFIED ON CHAIN
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
