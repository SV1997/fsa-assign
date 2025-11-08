"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"
import {useDispatch} from 'react-redux';
import { loginUser } from "../Store/auth/authSlice"
export const Login: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch<any>();

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res=await dispatch(loginUser({ email, password })).unwrap()
      console.log(res);

      navigate("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false) 
    }
  }

  return (
    <div className="min-h-screen bg-linear-gradient-to-br justify-between gap-6 from-background to-secondary flex items-center p-4">
      <div className="w-full h-screen">
        <img className="w-full h-full" src="./download.jpg" alt="" />
      </div>
      <div className="w-full flex flex-col items-center bg-gray-100 justify-center border-2 border-border rounded-lg bg-background/80 shadow-2xl p-6 h-screen mx-auto">
      <div>
        <img src="./login-logo.png" alt="" />
      </div>
        <div className="bg-card rounded-lg  p-8 w-3/4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">College Portal</h1>
            <p className="text-muted-foreground">Equipment Management System</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive text-sm">{error}</p>
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
            <p className="text-muted-foreground text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="space-y-2 text-xs">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
