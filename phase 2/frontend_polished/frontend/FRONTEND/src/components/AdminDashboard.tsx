"use client"

import type React from "react"
import { useState } from "react"
import { EquipmentManager } from "./EquipmentManager"
import { RequestManager } from "./RequestManager"
import { LoanManager } from "./LoanManager"
import { MyRequests } from "./MyRequests"
import { EquipmentBrowser } from "./EquipmentBrowser"
import UserMaster from "./User-Master"

type AdminTab = "equipment" | "requests" | "loans" | "browse" | "my-requests" | "user-management"

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>("equipment")

  const tabs = [
    { id: "equipment", label: "Equipment", icon: "📦" },
    { id: "requests", label: "Requests", icon: "📋" },
    { id: "loans", label: "Loans", icon: "🔑" },
    { id: "browse", label: "Browse", icon: "🔍" },
    { id: "my-requests", label: "My Requests", icon: "📋" },
    { id: "user-management", label: "User Management", icon: "👥" },
  ]

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-6">Admin Dashboard</h2>

        <div className="flex gap-2 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`px-4 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        {activeTab === "equipment" && <EquipmentManager />}
        {activeTab === "requests" && <RequestManager />}
        {activeTab === "loans" && <LoanManager />}
        {activeTab === "browse" && <EquipmentBrowser />}
        {activeTab === "my-requests" && <MyRequests />}
        {activeTab === "user-management" && <UserMaster />}
      </div>
    </div>
  )
}
