"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { CheckCircle2, XCircle, Clock3, ListFilter, Calendar, Handshake, Loader2 } from "lucide-react"
import type { EquipmentRequest } from "../types"
import { fetchRequestGet, fetchRequesPost, fetchRequesPut } from "../common/NetworkOps"

export const RequestManager: React.FC = () => {
  const token = sessionStorage.getItem("accessToken")
  const [requests, setRequests] = useState<EquipmentRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending")

  // NEW: Lend modal state
  const [lendModal, setLendModal] = useState<{
    open: boolean
    request: EquipmentRequest | null
    from: string
    to: string
    error?: string
    submitting: boolean
  }>({ open: false, request: null, from: "", to: "", submitting: false })

  useEffect(() => {
    loadRequests()
  }, [])

  const loadRequests = async () => {
    try {
      setLoading(true)
      const data: any = await fetchRequestGet("/requests/getRequests")
      setRequests(data.requests || [])
    } catch (error) {
      console.error("Failed to load requests:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: string) => {
    if (!token) return
    try {
      await fetchRequesPut("/requests/approverequest", JSON.stringify({ id }))
      loadRequests()
    } catch (error) {
      console.error("Failed to approve request:", error)
    }
  }

  const handleReject = async (id: string) => {
    if (!token) return
    try {
      await fetchRequesPut("/requests/rejectrequest", JSON.stringify({ id }))
      loadRequests()
    } catch (error) {
      console.error("Failed to reject request:", error)
    }
  }

  // Helper: format a JS Date or ISO string to yyyy-mm-dd for <input type="date">
  const toDateInput = (value: string | Date) => {
    try {
      const d = typeof value === "string" ? new Date(value) : value
      if (Number.isNaN(d.getTime())) return ""
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, "0")
      const day = String(d.getDate()).padStart(2, "0")
      return `${year}-${month}-${day}`
    } catch {
      return ""
    }
  }

  // Open the modal with sensible defaults
  const openLendModal = (req: EquipmentRequest) => {
    setLendModal({
      open: true,
      request: req,
      from: toDateInput(req.from ?? new Date()),
      to: toDateInput(req.to ?? new Date()),
      submitting: false,
      error: undefined,
    })
  }

  const closeLendModal = useCallback(() => {
    setLendModal((s) => ({ ...s, open: false, request: null, error: undefined }))
  }, [])

  // NEW: handleLoan now accepts dates and posts them
  const handleLoan = async () => {
    if (!lendModal.request) return
    const { request } = lendModal

    // Basic validation
    if (!lendModal.from || !lendModal.to) {
      return setLendModal((s) => ({ ...s, error: "Please select both From and To dates." }))
    }
    const fromDate = new Date(lendModal.from)
    const toDate = new Date(lendModal.to)
    if (fromDate > toDate) {
      return setLendModal((s) => ({ ...s, error: "‘From’ date cannot be after ‘To’ date." }))
    }

    try {
      setLendModal((s) => ({ ...s, submitting: true, error: undefined }))
      setLoading(true)

      const borrowerId = JSON.parse(sessionStorage.getItem("user") || "{}").id

      const payload = {
        equipmentId: request.equipment.id,
        requestId: request.id,
        borrowerId,
        from: new Date(lendModal.from + "T00:00:00").toISOString(),
        to: new Date(lendModal.to + "T23:59:59").toISOString(),
      }

      const data = await fetchRequesPost("/loans/createloan", JSON.stringify(payload))
      console.log("create loan ->", data)

      closeLendModal()
      await loadRequests()
    } catch (error) {
      console.error("Failed to create loan:", error)
      setLendModal((s) => ({ ...s, error: "Failed to create loan. Please try again.", submitting: false }))
    } finally {
      setLoading(false)
    }
  }

  // Allow Esc to close the modal
  useEffect(() => {
    if (!lendModal.open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeLendModal()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lendModal.open, closeLendModal])

  const filteredRequests = requests.filter((req) => filter === "all" || req.status.toLocaleLowerCase() === filter)

  // —— UI CALCULATIONS (no data/logic changes) ——
  const counts = {
    all: requests.length,
    pending: requests.filter((r) => r.status.toLowerCase() === "pending").length,
    approved: requests.filter((r) => r.status.toLowerCase() === "approved").length,
    rejected: requests.filter((r) => r.status.toLowerCase() === "rejected").length,
  }

  const TABS: { key: typeof filter; label: string; icon: React.ElementType }[] = [
    { key: "all", label: "All", icon: ListFilter },
    { key: "pending", label: "Pending", icon: Clock3 },
    { key: "approved", label: "Approved", icon: CheckCircle2 },
    { key: "rejected", label: "Rejected", icon: XCircle },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky tab bar */}
      <div className="sticky top-0 z-20 border-b border-border/60 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between py-3">
            <h1 className="text-xl font-semibold text-foreground">Requests</h1>
            {loading && (
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading
              </span>
            )}
          </div>

          {/* Tablist */}
          <div role="tablist" aria-label="Request filters" className="relative">
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {TABS.map(({ key, label, icon: Icon }) => {
                const active = filter === key
                return (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={active}
                    aria-controls={`panel-${key}`}
                    onClick={() => setFilter(key)}
                    className={`group inline-flex items-center gap-2 rounded-xl px-3 sm:px-4 py-2 text-sm font-medium transition-all outline-none ring-1 ring-transparent 
                      ${active ? "bg-primary text-primary-foreground shadow-sm  bg-blue-400" : "bg-secondary text-foreground hover:bg-secondary/80"}
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                    <span className={`ml-1 rounded-full px-1.5 py-0.5 text-xs font-semibold ${active ? "bg-primary-foreground/20"  : "bg-muted"}`}>
                      {counts[key] as number}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl p-4">
        {filteredRequests.length === 0 ? (
          <div id={`panel-${filter}`} role="tabpanel" className="rounded-2xl border border-border bg-card/60 p-12 text-center">
            <p className="text-muted-foreground">No {filter === "all" ? "" : filter} requests found</p>
          </div>
        ) : (
          <div id={`panel-${filter}`} role="tabpanel" className="space-y-4">
            {filteredRequests.map((request) => (
              <div key={request.id} className="rounded-2xl border border-border bg-card/70 p-4 shadow-sm transition hover:shadow-md">
                <div className="mb-3 flex items-start justify-between">
                  <div className="min-w-0">
                    <h4 className="truncate font-semibold text-foreground">{request.requester.name || "Unknown"}</h4>
                    <p className="mt-0.5 truncate text-sm text-muted-foreground capitalize">{request.requesterRole}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset
                      ${request.status === "pending" ? "bg-yellow-100 text-yellow-800 ring-yellow-300 dark:bg-yellow-900/40 dark:text-yellow-200 dark:ring-yellow-700" :
                        request.status === "approved" ? "bg-green-100 text-green-800 ring-green-300 dark:bg-green-900/40 dark:text-green-200 dark:ring-green-700" :
                        "bg-red-100 text-red-800 ring-red-300 dark:bg-red-900/40 dark:text-red-200 dark:ring-red-700"}
                    `}
                  >
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </div>

                <div className="mb-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                  <div className="flex items-center gap-2"><Handshake className="h-4 w-4" />Equipment: <span className="text-foreground">{request.equipment.name || "Unknown"}</span></div>
                  <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />From: <span className="text-foreground">{new Date(request.from).toLocaleDateString()}</span></div>
                  <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />To: <span className="text-foreground">{new Date(request.to).toLocaleDateString()}</span></div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => openLendModal(request)}
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                  >
                    <Handshake className="h-4 w-4" /> Lend
                  </button>

                  {request.status.toLocaleLowerCase() === "pending" && (
                    <div className="flex flex-1 gap-2 sm:flex-none">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {lendModal.open && lendModal.request && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={closeLendModal} aria-hidden="true" />
          {/* Dialog */}
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <h3 className="text-lg font-semibold mb-1">Create Loan</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {lendModal.request.equipment.name} • Requested by {lendModal.request.requester.name}
            </p>

            <div className="grid grid-cols-1 gap-4">
              <label className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">From</span>
                <input
                  type="date"
                  value={lendModal.from}
                  onChange={(e) => setLendModal((s) => ({ ...s, from: e.target.value, error: undefined }))}
                  className="rounded-lg border border-input bg-background px-3 py-2"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">To</span>
                <input
                  type="date"
                  value={lendModal.to}
                  onChange={(e) => setLendModal((s) => ({ ...s, to: e.target.value, error: undefined }))}
                  className="rounded-lg border border-input bg-background px-3 py-2"
                />
              </label>

              {lendModal.error && <div className="text-sm text-destructive">{lendModal.error}</div>}

              <div className="mt-2 flex items-center justify-end gap-2">
                <button onClick={closeLendModal} className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80">Cancel</button>
                <button onClick={handleLoan} disabled={lendModal.submitting} className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60">
                  {lendModal.submitting ? "Creating..." : "Create Loan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
