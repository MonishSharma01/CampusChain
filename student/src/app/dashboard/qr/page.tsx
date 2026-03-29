'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QrCode, X, Zap, CheckCircle2, AlertCircle, Info, Landmark } from 'lucide-react'
import Lottie from 'lottie-react'
import { qrMockPayment, student } from '../mockData'
import successAnimation from '@/animations/success_payment.json'
import loadingAnimation from '@/animations/loading.json'

type QRState = 'SCANNER' | 'CONFIRM' | 'SUCCESS' | 'FAILED'

export default function QRPage() {
  const [state, setState] = useState<QRState>('SCANNER')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSimulateScan = () => {
    setState('CONFIRM')
  }

  const handleConfirm = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      if (student.balance >= qrMockPayment.amount) {
        setState('SUCCESS')
      } else {
        setState('FAILED')
      }
    }, 2000)
  }

  return (
    <div className="relative min-h-[calc(100vh-180px)] flex flex-col">
      <AnimatePresence mode="wait">
        {state === 'SCANNER' && (
          <motion.div
            key="scanner"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col items-center justify-center space-y-12"
          >
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 bg-primary-yellow/10 text-primary-yellow px-4 py-1.5 rounded-full border border-primary-yellow/20">
                <Zap size={14} className="fill-current" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Contactless Payment</span>
              </div>
              <h1 className="text-4xl font-heading font-black text-deep-charcoal tracking-tight">Quick Pay</h1>
              <p className="text-muted-gray text-xs font-bold uppercase tracking-widest opacity-60">Scan Merchant QR to Proceed</p>
            </div>

            {/* Simple Circular Viewfinder Container */}
            <div className="relative w-72 h-72 flex items-center justify-center">
              {/* Static Outer Ring with Subtle Pulse */}
              <motion.div 
                animate={{ scale: [1, 1.02, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 border border-primary-yellow rounded-full"
              />
              
              {/* The Viewfinder Circle */}
              <div className="relative w-64 h-64 rounded-full border-[3px] border-primary-yellow/30 bg-deep-charcoal/5 flex items-center justify-center shadow-inner">
                {/* Subtle Glow */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_rgba(245,197,24,0.1)]" />
                
                <QrCode className="w-20 h-20 text-primary-yellow/30" />
                
                {/* Minimal Center Target */}
                <div className="absolute w-1.5 h-1.5 bg-primary-yellow rounded-full" />
              </div>

              {/* Minimal Corner Brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary-yellow rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary-yellow rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary-yellow rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary-yellow rounded-br-2xl" />
            </div>

            <div className="flex flex-col items-center gap-4 w-full px-6">
              <div className="flex items-center gap-2 text-muted-gray/40">
                <div className="w-1.5 h-1.5 bg-primary-yellow rounded-full animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-widest text-deep-charcoal/60">Ready to Scan</span>
              </div>

              <button
                onClick={handleSimulateScan}
                className="btn-primary w-full max-w-xs h-16 flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(245,197,24,0.3)] group"
              >
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <Zap size={20} className="fill-white" />
                </div>
                <span className="font-black tracking-tight">SIMULATE PAY</span>
              </button>
            </div>
          </motion.div>
        )}

        {state === 'CONFIRM' && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex-1 flex flex-col items-center justify-center p-6"
          >
            <div className="w-full card-base relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-yellow/5 rounded-full -mr-16 -mt-16 blur-2xl" />
              
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 bg-warm-yellow-mist rounded-2xl flex items-center justify-center text-primary-yellow border border-primary-yellow/20 shadow-inner">
                  <Landmark size={32} />
                </div>

                <div className="space-y-1">
                  <span className="bg-primary-yellow/10 text-primary-yellow text-[10px] font-bold px-3 py-1 rounded-full border border-primary-yellow/20 uppercase tracking-widest">
                    {qrMockPayment.category}
                  </span>
                  <h2 className="text-xl font-heading font-extrabold text-deep-charcoal">Confirm Payment</h2>
                  <p className="text-muted-gray text-xs">{qrMockPayment.description}</p>
                </div>

                <div className="w-full bg-warm-yellow-mist/50 rounded-2xl p-6 border border-primary-yellow/10">
                  <p className="text-muted-gray text-[10px] font-bold uppercase tracking-widest mb-1">Paying To</p>
                  <p className="text-deep-charcoal font-bold">{qrMockPayment.adminName}</p>
                  <p className="text-muted-gray text-[10px] uppercase font-bold">{qrMockPayment.adminId}</p>
                  
                  <div className="my-4 border-t border-primary-yellow/10 border-dashed" />
                  
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-4xl font-heading font-extrabold text-primary-yellow">{qrMockPayment.amount}</span>
                    <span className="text-sm font-bold text-deep-charcoal/40 uppercase">CC</span>
                  </div>
                </div>

                <div className="w-full space-y-3">
                  <button
                    onClick={handleConfirm}
                    disabled={isProcessing}
                    className="btn-primary w-full h-14 flex items-center justify-center relative shadow-lg"
                  >
                    {isProcessing ? (
                      <div className="w-10 h-10">
                        <Lottie animationData={loadingAnimation} loop={true} />
                      </div>
                    ) : (
                      "PAY NOW"
                    )}
                  </button>
                  <button
                    onClick={() => setState('SCANNER')}
                    disabled={isProcessing}
                    className="btn-secondary w-full h-14"
                  >
                    CANCEL
                  </button>
                </div>

                <p className="text-muted-gray text-[10px] flex items-center gap-1.5">
                  <Info size={12} /> Encrypted Blockchain Transaction
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {state === 'SUCCESS' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center space-y-8 p-6 text-center"
          >
            <div className="w-64 h-64">
              <Lottie animationData={successAnimation} loop={false} />
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <h1 className="text-3xl font-heading font-extrabold text-deep-charcoal">Payment Success!</h1>
                <p className="text-muted-gray text-sm mt-2">Transaction recorded on blockchain</p>
              </div>

              <div className="card-base bg-green-50/50 border-green-100 p-6 flex flex-col items-center">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-heading font-extrabold text-green-500">-{qrMockPayment.amount}</span>
                  <span className="text-xs font-bold text-green-500/60 font-mono uppercase">CC</span>
                </div>
                <div className="mt-4 pt-4 border-t border-green-100 w-full flex justify-between text-[10px] text-green-700 font-bold uppercase">
                  <span>New Balance</span>
                  <span>{student.balance - qrMockPayment.amount} CC</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setState('SCANNER')}
              className="btn-primary w-full max-w-xs h-14 flex items-center justify-center gap-3 shadow-xl"
            >
              <CheckCircle2 size={20} />
              DONE
            </button>
          </motion.div>
        )}

        {state === 'FAILED' && (
          <motion.div
            key="failed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center space-y-8 p-6 text-center"
          >
            <div className="w-48 h-48 bg-red-100 rounded-full flex items-center justify-center text-red-500 shell-pulse-red">
               <AlertCircle size={80} />
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <h1 className="text-3xl font-heading font-extrabold text-red-600">Payment Failed</h1>
                <p className="text-muted-gray text-sm mt-2">Common Error: Insufficient Wallet Balance</p>
              </div>

              <div className="card-base bg-red-50/50 border-red-100 p-6 flex flex-col items-center">
                <p className="text-xs font-bold text-red-900/60 uppercase tracking-widest mb-1">Required</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-heading font-extrabold text-red-500">{qrMockPayment.amount}</span>
                  <span className="text-xs font-bold text-red-500/60 font-mono uppercase">CC</span>
                </div>
                <div className="mt-4 pt-4 border-t border-red-100 w-full flex justify-between text-[10px] text-red-700 font-bold uppercase">
                  <span>Wallet Balance</span>
                  <span>{student.balance} CC</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setState('SCANNER')}
              className="bg-red-600 text-white w-full max-w-xs h-14 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl hover:bg-red-700 transition"
            >
              <X size={20} />
              TRY AGAIN
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
