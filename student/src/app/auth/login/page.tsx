'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, ShieldCheck } from 'lucide-react'
import Lottie from 'lottie-react'
import loadingAnimation from '@/animations/loading.json'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [formData, setFormData] = useState({ studentId: '', password: '' })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    // Simulate login delay
    setTimeout(() => {
      router.push('/dashboard/home')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary-yellow/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-primary-yellow/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm flex flex-col items-center"
      >
        {/* Logo Section */}
        <div className="mb-12 text-center group">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-primary-yellow/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-deep-charcoal w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl border border-primary-yellow/20">
              <ShieldCheck className="w-10 h-10 text-primary-yellow" />
            </div>
          </div>
          <h1 className="mt-6 text-3xl font-heading font-extrabold text-deep-charcoal tracking-tight">
            Campus<span className="text-primary-yellow">Chain</span>
          </h1>
          <p className="text-muted-gray text-sm mt-2">University Financial Ecosystem</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleLogin} className="w-full space-y-5">
          <div>
            <label className="block text-xs font-semibold text-deep-charcoal mb-1.5 ml-1">Student ID</label>
            <input
              type="text"
              required
              placeholder="e.g. CS2022047"
              className="input-field w-full h-12"
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-deep-charcoal mb-1.5 ml-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="input-field w-full h-12 pr-12"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-gray hover:text-deep-charcoal transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoggingIn}
            className="btn-primary w-full h-12 mt-4 flex items-center justify-center relative overflow-hidden group"
          >
            <AnimatePresence mode="wait">
              {isLoggingIn ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-12 h-12"
                >
                  <Lottie animationData={loadingAnimation} loop={true} />
                </motion.div>
              ) : (
                <motion.span
                  key="text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Sign In
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </form>

        {/* Footer */}
        <p className="mt-12 text-center text-xs text-muted-gray">
          By signing in, you agree to our <span className="text-deep-charcoal font-medium">Terms of Use</span> and <span className="text-deep-charcoal font-medium">Privacy Policy</span>.
        </p>
      </motion.div>
    </div>
  )
}
