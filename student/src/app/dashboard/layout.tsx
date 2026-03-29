'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, History, QrCode, Send, User, Bell, Search } from 'lucide-react'
import Lottie from 'lottie-react'
import clsx from 'clsx'
import loadingAnimation from '@/animations/loading.json'
import { student } from './mockData'

const NAV_ITEMS = [
  { label: 'Home', icon: Home, path: '/dashboard/home' },
  { label: 'History', icon: History, path: '/dashboard/transactions' },
  { label: 'QR', icon: QrCode, path: '/dashboard/qr', isSpecial: true },
  { label: 'Transfer', icon: Send, path: '/dashboard/transfer' },
  { label: 'Profile', icon: User, path: '/dashboard/profile' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const initials = student.name.split(' ').map(n => n[0]).join('').slice(0, 2)

  // Global 3-second loading effect on route change
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div className="relative flex flex-col h-screen overflow-hidden bg-[#F8F9FA]">
      {/* Premium Glassmorphism Top Bar */}
      <header className="sticky top-0 z-50 h-16 bg-deep-charcoal/90 border-b border-white/5 flex items-center justify-between px-6 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-yellow to-bright-accent-yellow rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative w-10 h-10 bg-deep-charcoal rounded-xl flex items-center justify-center border border-white/10">
              <div className="w-5 h-5 border-2 border-primary-yellow rounded-sm rotate-45 flex items-center justify-center">
                <div className="w-1 h-1 bg-primary-yellow rounded-full" />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-heading font-extrabold text-lg leading-tight tracking-tight">
              Campus<span className="text-primary-yellow">Chain</span>
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Mainnet Live</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2.5 text-white/40 hover:text-primary-yellow hover:bg-white/5 rounded-full transition-all">
            <Search size={18} />
          </button>
          <button className="p-2.5 text-white/60 hover:text-primary-yellow hover:bg-white/5 rounded-full transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary-yellow rounded-full border-2 border-deep-charcoal" />
          </button>
          <div className="flex items-center gap-3 pl-3 border-l border-white/10">
            <div className="flex flex-col items-end hidden xs:flex">
              <span className="text-[10px] text-white/40 font-bold uppercase tracking-tight">Student</span>
              <span className="text-xs text-white font-black">{student.name.split(' ')[0]}</span>
            </div>
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-primary-yellow rounded-xl blur opacity-0 group-hover:opacity-20 transition" />
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary-yellow to-bright-accent-yellow text-deep-charcoal text-sm font-black flex items-center justify-center shadow-lg border-2 border-white/20 transform hover:-translate-y-0.5 transition-all">
                {initials}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area with Scoped Loading */}
      <div className="flex-1 relative overflow-hidden">
        {/* Scoped Loading Overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-white/95 backdrop-blur-md"
            >
              <div className="w-48 h-48">
                <Lottie animationData={loadingAnimation} loop={true} />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-1"
              >
                <p className="font-heading text-xs font-black text-deep-charcoal uppercase tracking-[0.3em]">
                  Securing Connection
                </p>
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1 h-1 bg-primary-yellow rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scrollable Page Content */}
        <div className="h-full overflow-y-auto pb-32 custom-scrollbar">
          <main className="max-w-[430px] mx-auto px-6 py-8">
            <AnimatePresence mode="wait">
              {!loading && (
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                >
                  {children}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Persistent Bottom Nav Bar - Now FIXED */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-8 pointer-events-none">
        <div className="bg-deep-charcoal/95 backdrop-blur-xl w-[92%] max-w-[400px] h-20 rounded-[2.5rem] flex items-center justify-around px-4 relative shadow-[0_20px_50px_rgba(0,0,0,0.4)] pointer-events-auto border border-white/10">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path
            const Icon = item.icon

            if (item.isSpecial) {
              return (
                <button
                  key={item.path}
                  onClick={() => router.push(item.path)}
                  className="relative -top-8 flex items-center justify-center group"
                >
                  {/* Simple Outer Glow - Minimal Animation */}
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-primary-yellow rounded-full blur-2xl"
                  />
                  
                  {/* Static Border Accent */}
                  <div className="absolute inset-0 border-2 border-white/10 rounded-full -m-1 scale-125" />
                  
                  {/* Outer Glow */}
                  <div className={clsx(
                    "absolute inset-0 bg-primary-yellow rounded-full blur-xl transition-opacity duration-500",
                    isActive ? "opacity-40" : "opacity-20 group-hover:opacity-40"
                  )} />
                  
                  <div className={clsx(
                    "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90 z-10 border-4",
                    isActive 
                      ? "bg-primary-yellow border-white scale-110" 
                      : "bg-primary-yellow border-white group-hover:scale-105"
                  )}>
                    <Icon className="w-8 h-8 text-deep-charcoal" />
                  </div>
                </button>
              )
            }

            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className="flex flex-col items-center justify-center relative w-14 h-14 group transition-all"
              >
                {isActive && (
                  <>
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/5 rounded-2xl"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                    {/* Active Pointer */}
                    <motion.div 
                      layoutId="nav-pointer"
                      className="absolute -bottom-1 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_#fff]"
                    />
                  </>
                )}
                <Icon className={clsx(
                  "w-6 h-6 mb-1 transition-all duration-300",
                  isActive 
                    ? "text-primary-yellow scale-110 drop-shadow-[0_0_8px_rgba(245,197,24,0.5)]" 
                    : "text-white/30 group-hover:text-white/60 group-hover:scale-110"
                )} />
                <span className={clsx(
                  "text-[9px] font-black uppercase tracking-widest transition-colors duration-300",
                  isActive ? "text-primary-yellow" : "text-white/20 group-hover:text-white/40"
                )}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
