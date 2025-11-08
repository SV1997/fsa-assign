"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginUser } from "../Store/auth/authSlice"

export const Login: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch<any>()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await dispatch(loginUser({ email, password })).unwrap()
      console.log(res)
      navigate("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/40 to-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl">
        <div className="grid md:grid-cols-[1.1fr_minmax(0,1fr)] bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Left: college portal illustration */}
          <div className="relative hidden md:block bg-sky-50">
            <img
              src="/login-illustration.png" // put a college portal style image here
              alt="College portal illustration"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/40 to-transparent" />

            <div className="absolute bottom-5 left-5 right-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-sky-700 shadow-sm border border-sky-100">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                Campus Equipment Portal · Always available
              </div>

              <p className="mt-3 text-sm text-slate-700 max-w-sm">
                Reserve lab equipment, project kits, and other resources from a single,
                easy-to-use college portal.
              </p>
            </div>
          </div>

          {/* Right: login form */}
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">
                Equipment Management System
              </h1>
              <p className="text-sm text-slate-500">
                Sign in with your college credentials to continue
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg border border-red-100 bg-red-50 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/60 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition"
                  placeholder="you@college.edu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/60 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="text-sky-600 hover:text-sky-700 font-semibold">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400">
                Use your institutional credentials to sign in. If you don&apos;t have an
                account, please contact the administrator.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
