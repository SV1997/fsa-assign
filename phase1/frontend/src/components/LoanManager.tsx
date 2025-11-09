"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import type { Loan } from "../types"
import { getLoans, returnLoan } from "../services/api"
import { fetchRequesPut, fetchRequestGet } from "../common/NetworkOps"

export const LoanManager: React.FC = () => {
  const token = sessionStorage.getItem("accessToken") || '';
  const [loans, setLoans] = useState<Loan[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"active" | "returned">("active")

  useEffect(() => {
    loadLoans()
  }, [])

  const loadLoans = async () => {
    try {
      setLoading(true)
      const data:any = await fetchRequestGet('/loans/getloans')
      setLoans(data.loans||[])
    } catch (error) {
      console.error("Failed to load loans:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleReturn = async (id: string) => {
    if (!token || !confirm("Mark this item as returned?")) return
    try {
      await fetchRequesPut("/loans/returnloan", { id })
      loadLoans()
    } catch (error) {
      console.error("Failed to return loan:", error)
    }
  }

  const filteredLoans = loans.filter((loan) => (filter === "active" ? !loan.returnedAt : loan.returnedAt))

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading loans...</div>
  }

  return (
    <div>
      <div className="mb-6 flex gap-2">
        {(["active", "returned"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status
                ? "bg-primary bg-blue-500 text-white text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
          >
            {status === "active" ? "Active Loans" : "Returned"}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredLoans.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">No loans found</p>
        ) : (
          filteredLoans.map((loan) => (
            <div key={loan.id} className="p-4 border border-border rounded-lg bg-secondary">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-foreground">{loan.borrowerName}</h4>
                  <p className="text-sm text-muted-foreground capitalize">{loan.borrowerRole}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    loan.returnedAt ? "bg-gray-100 text-gray-800" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {loan.returnedAt ? "Returned" : "Active"}
                </span>
              </div>

              <div className="mb-3 text-sm text-muted-foreground">
                <p>Equipment: {loan.equipment?.name || "Unknown"}</p>
                <p>Quantity: {loan.equipment?.quantity}</p>
                <p>Issued: {new Date(loan.from).toLocaleDateString()}</p>
                <p>Due: {new Date(loan.to).toLocaleDateString()}</p>
                {loan.returnedAt && <p>Returned: {new Date(loan.returnedAt).toLocaleDateString()}</p>}
              </div>

              {!loan.returnedAt && (
                <button
                  onClick={() => handleReturn(loan.id)}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Mark as Returned
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
