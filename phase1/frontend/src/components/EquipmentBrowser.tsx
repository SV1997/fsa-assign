"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import type { Equipment } from "../types"
import { getEquipment, createRequest } from "../services/api"
import { fetchRequestGet, fetchRequesPost } from "../common/NetworkOps"
import { useSelector } from "react-redux"
export const EquipmentBrowser: React.FC = () => {
  const token= sessionStorage.getItem("accessToken") || '';
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [requestingId, setRequestingId] = useState<string | null>(null)
  const [showRequestForm, setShowRequestForm] = useState(false)
    const { user } = useSelector((state: any) => state.auth);

  const [requestData, setRequestData] = useState({
    equipmentId: "",
    requesterId: user.id,
    from: "",
    to: "",
  })
  useEffect(() => {
    loadEquipment()
  }, [searchQuery, selectedCategory])

  const loadEquipment = async () => {
    try {
      setLoading(true)
      const data:any = (await fetchRequestGet('/equipment/getallequipment'));;
      console.log(data.equipment);

      setEquipment(data.equipment || [])
    } catch (error) {
      console.error("Failed to load equipment:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRequestClick = (equipmentId: string) => {
    setRequestingId(equipmentId)
    setRequestData({ ...requestData, equipmentId })
    setShowRequestForm(true)
  }

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return
    
    try {
      await fetchRequesPost('/requests/createrequest', JSON.stringify(requestData));
      setShowRequestForm(false)
      setRequestData({ equipmentId: "", from: "", to: "", requesterId: user.id })
      alert("Request submitted successfully!")
    } catch (error) {
      console.error("Failed to submit request:", error)
      alert("Failed to submit request")
    }
  }

  const categories = [...new Set(equipment.map((e) => e.category))]

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading equipment...</div>
  }

  return (
    <div>
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search equipment..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === ""
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {showRequestForm && (
        <form onSubmit={handleSubmitRequest} className="mb-6 p-4 bg-secondary rounded-lg border border-border">
          <h4 className="font-semibold text-foreground mb-4">Request Equipment</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">From Date</label>
              <input
                type="date"
                value={requestData.from}
                onChange={(e) => setRequestData({ ...requestData, from: e.target.value })}
                required
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">To Date</label>
              <input
                type="date"
                value={requestData.to}
                onChange={(e) => setRequestData({ ...requestData, to: e.target.value })}
                required
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium hover:bg-primary/90"
            >
              Submit Request
            </button>
            <button
              type="button"
              onClick={() => setShowRequestForm(false)}
              className="flex-1 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {equipment.map((item) => (
          <div
            key={item.id}
            className="p-4 border border-border rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <h4 className="font-semibold text-foreground mb-2">{item.name}</h4>
            <p className="text-sm text-muted-foreground mb-3">{item.condition}</p>
            <div className="flex justify-between items-center mb-4 text-sm">
              <span className="text-muted-foreground">{item.category}</span>
              <span className="font-medium text-green-600">{item.available} Available</span>
            </div>
            <button
              onClick={() => handleRequestClick(item.id)}
              disabled={item.available === 0}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {item.available === 0 ? "Out of Stock" : "Request"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
