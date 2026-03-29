'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, User, ChevronRight, CheckCircle2, X, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import Lottie from 'lottie-react'
import { friends, transactions, student } from '../mockData'
import successAnimation from '@/animations/success_payment.json'
import loadingAnimation from '@/animations/loading.json'
import clsx from 'clsx'

export default function TransferPage() {
  const [recipient, setRecipient] = useState({ id: '', name: '', dept: '', avatar: '' })
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transferSuccess, setTransferSuccess] = useState(false)

  const handleFriendSelect = (friend: any) => {
    setRecipient(friend)
  }

  const handleSend = () => {
    if (!recipient.id || !amount) return
    setShowConfirm(true)
  }

  const handleConfirm = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setTransferSuccess(true)
      // Reset form after 3 seconds
      setTimeout(() => {
        setTransferSuccess(false)
        setShowConfirm(false)
        setRecipient({ id: '', name: '', dept: '', avatar: '' })
        setAmount('')
        setNote('')
      }, 3000)
    }, 2000)
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-extrabold text-deep-charcoal">Transfer</h1>
        <div className="bg-warm-yellow-mist px-4 py-2 rounded-full border border-primary-yellow/20 flex items-center gap-2">
          <span className="text-[10px] font-bold text-muted-gray uppercase tracking-widest">Balance</span>
          <span className="text-sm font-heading font-extrabold text-primary-yellow">{student.balance} CC</span>
        </div>
      </div>

      {/* Friends Row */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-muted-gray uppercase tracking-widest ml-1">Send to Friends</h3>
        <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
          {friends.map((friend) => (
            <button
              key={friend.id}
              onClick={() => handleFriendSelect(friend)}
              className="group flex flex-col items-center gap-2"
            >
              <div className={clsx(
                "w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all group-active:scale-95 shadow-lg group-hover:shadow-xl",
                recipient.id === friend.id ? "bg-primary-yellow border-primary-yellow" : "bg-white border-light-border-gray hover:border-primary-yellow"
              )}>
                <span className={clsx(
                  "font-heading font-bold text-lg",
                  recipient.id === friend.id ? "text-deep-charcoal" : "text-muted-gray group-hover:text-primary-yellow"
                )}>
                  {friend.avatar}
                </span>
              </div>
              <span className="text-[10px] font-bold text-deep-charcoal/60 truncate w-16 text-center">{friend.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Transfer Form */}
      <div className="card-base space-y-5">
        <div>
          <label className="block text-[10px] font-bold text-muted-gray uppercase tracking-widest mb-1.5 ml-1">Recipient ID</label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. CS2022031"
              value={recipient.id}
              onChange={(e) => setRecipient({ ...recipient, id: e.target.value, name: '' })}
              className="input-field w-full pl-12 h-14"
            />
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-gray" size={20} />
          </div>
          {recipient.name && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 flex items-center justify-between p-2 bg-warm-yellow-mist rounded-xl border border-primary-yellow/20"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-yellow flex items-center justify-center text-[10px] font-bold">
                  {recipient.avatar || recipient.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-deep-charcoal">{recipient.name}</p>
                  <p className="text-[10px] text-muted-gray">{recipient.dept}</p>
                </div>
              </div>
              <button 
                onClick={() => setRecipient({ id: '', name: '', dept: '', avatar: '' })}
                className="p-1 hover:bg-white rounded-full transition-colors text-muted-gray"
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </div>

        <div>
          <label className="block text-[10px] font-bold text-muted-gray uppercase tracking-widest mb-1.5 ml-1">Token Amount</label>
          <div className="relative">
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-field w-full h-14 pr-12 text-center text-xl font-heading font-extrabold text-primary-yellow"
              min="1"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-heading font-bold text-muted-gray">CC</span>
          </div>
          
          <div className="mt-3 bg-warm-yellow-mist/40 p-3 rounded-xl border border-primary-yellow/5">
            <div className="flex justify-between text-[8px] font-bold uppercase tracking-widest text-muted-gray mb-1.5">
              <span>Daily Limit</span>
              <span className="text-primary-yellow">420 CC Remaining</span>
            </div>
            <div className="h-1 bg-white/50 rounded-full overflow-hidden">
              <div className="h-full bg-primary-yellow w-1/5" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-muted-gray uppercase tracking-widest mb-1.5 ml-1">Transfer Note</label>
          <input
            type="text"
            placeholder="Add a note... (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="input-field w-full h-12 text-xs"
          />
        </div>

        <button
          onClick={handleSend}
          disabled={!recipient.id || !amount}
          className="btn-primary w-full h-14 flex items-center justify-center gap-3 shadow-xl disabled:opacity-50 disabled:hover:scale-100"
        >
          <Send size={20} />
          SEND TOKENS
        </button>
      </div>

      {/* Confirmation Modal Overlay */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isProcessing && setShowConfirm(false)}
              className="absolute inset-0 bg-deep-charcoal/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl relative z-10 border border-warm-yellow-mist"
            >
              <AnimatePresence mode="wait">
                {transferSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center text-center space-y-6"
                  >
                    <div className="w-48 h-48">
                      <Lottie animationData={successAnimation} loop={false} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-extrabold text-deep-charcoal">Tokens Sent!</h3>
                      <p className="text-muted-gray text-xs mt-2">Successful Peer-to-Peer Transfer</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="confirm-form"
                    className="space-y-6"
                  >
                    <div className="text-center space-y-2">
                        <h3 className="text-xl font-heading font-extrabold text-deep-charcoal">Are you sure?</h3>
                        <p className="text-muted-gray text-xs">This action is irreversible on blockchain</p>
                    </div>

                    <div className="bg-warm-yellow-mist p-6 rounded-2xl border border-primary-yellow/10 flex flex-col items-center space-y-4">
                      <div className="flex items-center gap-10">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-sm font-bold shadow-sm border border-primary-yellow/10">ME</div>
                          <p className="text-[10px] font-bold mt-1 uppercase text-muted-gray">Me</p>
                        </div>
                        <ChevronRight className="text-primary-yellow" />
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-primary-yellow flex items-center justify-center text-sm font-bold shadow-sm">{recipient.avatar || recipient.name.charAt(0) || '?'}</div>
                          <p className="text-[10px] font-bold mt-1 uppercase text-muted-gray">{recipient.name.split(' ')[0] || 'Peer'}</p>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-4xl font-heading font-extrabold text-primary-yellow">{amount}</span>
                          <span className="text-sm font-bold text-deep-charcoal/40 uppercase">CC</span>
                        </div>
                        {note && <p className="text-[10px] text-muted-gray italic mt-1">"{note}"</p>}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={handleConfirm}
                        disabled={isProcessing}
                        className="btn-primary w-full h-14 flex items-center justify-center"
                      >
                        {isProcessing ? (
                          <div className="w-10 h-10">
                            <Lottie animationData={loadingAnimation} loop={true} />
                          </div>
                        ) : (
                          "CONFIRM SEND"
                        )}
                      </button>
                      <button
                        onClick={() => setShowConfirm(false)}
                        disabled={isProcessing}
                        className="btn-secondary w-full h-14"
                      >
                        CANCEL
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Recent Transfers */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-heading font-bold text-deep-charcoal">Recent Transfers</h3>
        <div className="space-y-3">
          {transactions.filter(tx => tx.category === 'transfer').slice(0, 3).map((tx, idx) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + (idx * 0.1) }}
              className="flex items-center justify-between p-4 bg-white border border-light-border-gray rounded-2xl group hover:border-primary-yellow transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-warm-yellow-mist flex items-center justify-center text-primary-yellow shadow-inner">
                  {tx.amount > 0 ? <ArrowDownLeft size={18} /> : <div className="font-heading font-bold text-xs">{tx.title.split(' ')[2]?.charAt(0) || 'P'}</div>}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-deep-charcoal leading-tight">{tx.title}</h4>
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
