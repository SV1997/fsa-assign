"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Equipment } from "../types"
import { fetchRequesDelete, fetchRequesPost, fetchRequesPut, fetchRequestGet } from "../common/NetworkOps"

export const EquipmentManager: React.FC = () => {
  const token = sessionStorage.getItem("accessToken") || '';
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [categaries, setCategaries] = useState<string[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    condition: "",
    category: "",
    quantity: 0,
    available: 0,
  })

  useEffect(() => {
    loadEquipment()
  }, [])

  const loadEquipment = async () => {
    try {
      setLoading(true)
      const data:any = (await fetchRequestGet('/equipment/getallequipment'));;
      setEquipment(data.equipment || [])
    } catch (error) {
      console.error("Failed to load equipment:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return

    try {
      let res;
      if (editingId) {
        res=await fetchRequesPut("/equipment/updateequipment",{ id: editingId, ...formData})
      } else {
        res=await fetchRequesPost("/equipment/addequipment",{ ...formData})
      }
      console.log(res);
      
      if(res){
            setShowForm(false)
      }
      setFormData({ name: "", condition: "", category: "", quantity: 0, available: 0 })
      setEditingId(null)
      loadEquipment()
    } catch (error) {
      console.error("Failed to save equipment:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!token || !confirm("Are you sure?")) return
    try {
      await fetchRequesDelete("/equipment/deleteequipment?id="+id)
      loadEquipment()
    } catch (error) {
      console.error("Failed to delete equipment:", error)
    }
  }

  const handleEdit = (item: Equipment) => {
    setFormData({
      name: item.name,
      condition: item.condition,
      category: item.category,
      quantity: item.quantity,
      available: item.available,
    })
    setEditingId(item.id)
    setShowForm(true)
  }

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading equipment...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-foreground">Equipment Inventory</h3>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData({ name: "", condition: "", category: "", quantity: 0, available: 0 })
          }}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          {showForm ? "Cancel" : "+ Add Equipment"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-secondary rounded-lg border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Equipment Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <label htmlFor="category">Category</label>
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <label htmlFor="condition">Condition</label>
            <textarea
              id="condition"
              placeholder="Condition"
              value={formData.condition}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary md:col-span-2"
            />
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              placeholder="Total Quantity"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: Number.parseInt(e.target.value) })}
              required
              min="1"
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <label htmlFor="available">Available</label>
            <input
              type="number"
              id="available"
              placeholder="Total Available"
              value={formData.available}
              onChange={(e) => setFormData({ ...formData, available: Number.parseInt(e.target.value) })}
              required
              min="0"
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            {editingId ? "Update Equipment" : "Add Equipment"}
          </button>
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
            <div className="flex justify-between items-center mb-3 text-sm">
              <span className="text-muted-foreground">Category: {item.category}</span>
              <span className={`font-medium ${item.available > 0 ? "text-green-600" : "text-red-600"}`}>
                {item.available}/{item.quantity} Available
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="flex-1 px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="flex-1 px-3 py-1 bg-destructive text-destructive-foreground rounded text-sm hover:bg-destructive/90 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
