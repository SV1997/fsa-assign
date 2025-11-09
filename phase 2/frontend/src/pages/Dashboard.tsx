"use client"

import type React from "react"
import { useSelector } from "react-redux"
import { AdminDashboard } from "../components/AdminDashboard"
import { StudentDashboard } from "../components/StudentDashboard"
import { fetchRequestGet } from "../common/NetworkOps"
import { useEffect, useState } from "react"
export const Dashboard: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth)
  const firstName = user?.name?.split(" ")[0] || "there"
  const role = user?.role || "STUDENT"
  const isAdmin = role === "ADMIN"
  const [availableEquipment, setAvailableEquipment] =useState<number | null>(null);
  const [pendingRequests, setPendingRequests] =useState<number | null>(null);
  const [pendingsLoans, setPendingsLoans] =useState<number | null>(null);
  const fetchData= async()=>{
    const response:any= await fetchRequestGet( "/equipment/available-count" )
    console.log(response);
    
    if(response){
      setAvailableEquipment(response.count);
    }
    const response2:any= await fetchRequestGet( "/requests/number-of-pending-requests" )
          setPendingRequests(response2.requests);
    const response3:any= await fetchRequestGet( "/loans/number-of-pending-loans" )
    setPendingsLoans(response3.loans);

  }
  useEffect(()=>{
    fetchData();
  },[])
  
  return (
    <div className="space-y-8">
      {/* Hero / heading */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-sky-600">
            Welcome back, {firstName} 👋
          </p>
          <h1 className="mt-1 text-2xl md:text-3xl font-semibold text-slate-900">
            {isAdmin ? "Admin overview" : "Your equipment overview"}
          </h1>
          <p className="mt-2 text-sm text-slate-500 max-w-xl">
            {isAdmin
              ? "Monitor inventory, approve student requests, and manage active loans for your campus."
              : "Browse available equipment, check request status, and keep track of your active loans."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {!isAdmin && (
            <button
              className="px-4 py-2 rounded-full bg-sky-600 text-white text-sm font-semibold hover:bg-sky-700 transition-colors"
            >
              + New Request
            </button>
          )}
          {isAdmin && (
            <button className="px-4 py-2 rounded-full border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              View pending approvals
            </button>
          )}
        </div>
      </section>

      {/* Stat cards – static for now, later you can fill real counts */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Available equipment
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {availableEquipment || '--'}
          </p>
         
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Active loans
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {pendingsLoans}
          </p>
         
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Pending requests
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {pendingRequests}
          </p>
          
        </div>
      </section>

      {/* Existing detailed dashboards */}
      <section className="mt-4">
        {user.role==="ADMIN" ? <AdminDashboard /> : <StudentDashboard />}
      </section>
    </div>
  )
}
