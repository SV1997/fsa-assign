"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { EquipmentRequest } from "../types"
import { fetchRequestGet, fetchRequesDelete } from "../common/NetworkOps"
import { useSelector } from "react-redux"
export const MyRequests: React.FC = () => {
  const [requests, setRequests] = useState<EquipmentRequest[]>([])
  const [loading, setLoading] = useState(true)
  const {user} = useSelector((state: any) => state.auth);
  useEffect(() => {
    loadRequests()
  }, [])

  const loadRequests = async () => {
    try {
      setLoading(true)
      const data:any = await fetchRequestGet(`/requests/getrequestbyid?id=${user.id}` )
      console.log(data.request);
      
      setRequests(data.request)
    } catch (error) {
      console.error("Failed to load requests:", error)
    } finally {
      setLoading(false)
    }
  }

  async function deleteRequest(id:string){
    console.log(id);
    
    const res=await fetchRequesDelete(`/requests/delete-request?id=`+id);
    console.log(res);
    
    // alert("Request Deleted Successfully");
    // loadRequests();
  }

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading requests...</div>
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-foreground mb-6">My Equipment Requests</h3>

      <div className="space-y-4">
        {requests.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">No requests yet</p>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="p-4 border border-border rounded-lg bg-secondary">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-foreground">{request.equipment?.name}</h4>
                  <p className="text-sm text-muted-foreground">{request.equipment?.category}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    request.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : request.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>From: {new Date(request.from).toLocaleDateString()}</p>
                <p>To: {new Date(request.to).toLocaleDateString()}</p>
                <p>Requested: {new Date(request.createdAt).toLocaleDateString()}</p>
                {request.approvedAt && <p>Approved: {new Date(request.approvedAt).toLocaleDateString()}</p>}
              </div>
              <button onClick={()=>{
                deleteRequest(request.id);
              }} className="text-white bg-red-500 px-2 py-2 rounded-3xl">Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
