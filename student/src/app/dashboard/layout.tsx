'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, History, QrCode, Send, User } from 'lucide-react'
import Lottie from 'lottie-react'
import clsx from 'clsx'
import loadingAnimation from '@/animations/loading.json'

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
  const [internalPath, setInternalPath] = useState(pathname)

  // Global 3-second loading effect on mount and route change
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div className="relative min-h-screen bg-white">
      {/* Global Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
          >
            <div className="w-48 h-48">
              <Lottie animationData={loadingAnimation} loop={true} />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 font-heading text-lg font-bold text-primary-yellow animate-pulse"
            >
              Syncing Blockchain...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="pb-24 pt-4 px-6 md:px-8 max-w-[430px] mx-auto min-h-screen">
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

      {/* Sticky Bottom Nav Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 pointer-events-none">
        <div className="bg-deep-charcoal w-[90%] max-w-[400px] h-16 rounded-2xl flex items-center justify-around px-2 relative shadow-2xl pointer-events-auto">
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
                    "w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-90 z-10",
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
