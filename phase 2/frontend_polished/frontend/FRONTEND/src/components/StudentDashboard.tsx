"use client"

import type React from "react"
import { useState } from "react"
import { EquipmentBrowser } from "./EquipmentBrowser"
import { MyRequests } from "./MyRequests"

type StudentTab = "browse" | "requests"

export const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<StudentTab>("browse")

  const tabs = [
    { id: "browse", label: "Browse Equipment", icon: "🔍" },
    { id: "requests", label: "My Requests", icon: "📋" },
  ]

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-6">Dashboard</h2>

        <div className="flex gap-2 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as StudentTab)}
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
        {activeTab === "browse" && <EquipmentBrowser />}
        {activeTab === "requests" && <MyRequests />}
      </div>
    </div>
  )
}
