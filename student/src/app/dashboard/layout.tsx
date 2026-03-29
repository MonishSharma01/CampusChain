'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, History, QrCode, Send, User, Bell } from 'lucide-react'
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
    <div className="relative flex flex-col h-screen overflow-hidden bg-white">
      {/* Premium Top Bar */}
      <header className="sticky top-0 z-40 h-14 bg-deep-charcoal border-b border-white/10 flex items-center justify-between px-4 backdrop-blur-md bg-opacity-95">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-yellow rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-deep-charcoal rounded-sm rotate-45" />
          </div>
          <span className="text-primary-yellow font-heading font-semibold text-lg tracking-tight">
            CampusChain
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 text-white/60 hover:text-primary-yellow transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary-yellow rounded-full border-2 border-deep-charcoal" />
          </button>
          <div className="w-8 h-8 rounded-full bg-primary-yellow text-deep-charcoal text-xs font-bold flex items-center justify-center shadow-lg border border-white/10">
            {initials}
          </div>
        </div>
      </header>

      {/* Main Content Area with Scoped Loading */}
      <div className="flex-1 relative overflow-hidden bg-[#FAFAFA]">
        {/* Scoped Loading Overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm"
            >
              <div className="w-40 h-40">
                <Lottie animationData={loadingAnimation} loop={true} />
              </div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 font-heading text-sm font-bold text-deep-charcoal/40 uppercase tracking-widest animate-pulse"
              >
                Loading...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scrollable Page Content */}
        <div className="h-full overflow-y-auto pb-24 custom-scrollbar">
          <main className="max-w-[430px] mx-auto px-6 py-6">
            <AnimatePresence mode="wait">
              {!loading && (
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {children}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Persistent Bottom Nav Bar */}
      <nav className="absolute bottom-0 left-0 right-0 z-40 flex justify-center pb-6 pointer-events-none">
        <div className="bg-deep-charcoal w-[92%] max-w-[400px] h-16 rounded-2xl flex items-center justify-around px-2 relative shadow-2xl pointer-events-auto border border-white/5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path
            const Icon = item.icon

            if (item.isSpecial) {
              return (
                <button
                  key={item.path}
                  onClick={() => router.push(item.path)}
                  className="relative -top-6 flex items-center justify-center"
                >
                  <div className="absolute inset-0 bg-primary-yellow rounded-full animate-ping opacity-20 scale-150" />
                  <div className={clsx(
                    "w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 z-10 border-4 border-white",
                    isActive ? "bg-bright-accent-yellow" : "bg-primary-yellow"
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
                className="flex flex-col items-center justify-center relative w-12 group transition-all"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-primary-yellow/10 rounded-xl"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className={clsx(
                  "w-5 h-5 mb-1 transition-colors",
                  isActive ? "text-primary-yellow" : "text-white/40 group-hover:text-white/60"
                )} />
                <span className={clsx(
                  "text-[10px] font-medium transition-colors",
                  isActive ? "text-primary-yellow" : "text-white/40 group-hover:text-white/60"
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
