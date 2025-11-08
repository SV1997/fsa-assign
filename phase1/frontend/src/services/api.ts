const API_BASE = "http://localhost:3000/api"

export const apiCall = async (endpoint: string, method = "GET", body?: any, token?: string) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }

  return response.json()
}

// Equipment APIs
export const getEquipment = (query?: string, category?: string, available?: boolean) => {
  let url = "/equipment?"
  if (query) url += `q=${query}&`
  if (category) url += `category=${category}&`
  if (available !== undefined) url += `available=${available}`
  return apiCall(url)
}

export const createEquipment = (data: any, token: string) => apiCall("/equipment", "POST", data, token)

export const updateEquipment = (id: string, data: any, token: string) => apiCall(`/equipment/${id}`, "PUT", data, token)

export const deleteEquipment = (id: string, token: string) => apiCall(`/equipment/${id}`, "DELETE", undefined, token)

// Request APIs
export const createRequest = (data: any, token: string) => apiCall("/requests", "POST", data, token)

export const getMyRequests = (token: string) => apiCall("/requests/mine", "GET", undefined, token)

export const getAllRequests = (token: string) => apiCall("/requests", "GET", undefined, token)

export const approveRequest = (id: string, autoIssue: boolean, token: string) =>
  apiCall(`/requests/${id}/approve`, "PATCH", { autoIssue }, token)

export const rejectRequest = (id: string, token: string) => apiCall(`/requests/${id}/reject`, "PATCH", {}, token)

// Loan APIs
export const getLoans = (token: string) => apiCall("/loans", "GET", undefined, token)

export const issueLoan = (data: any, token: string) => apiCall("/loans", "PATCH", data, token)

export const returnLoan = (id: string, token: string) => apiCall(`/loans/${id}/return`, "PATCH", {}, token)

// Meta APIs
export const getMe = (token: string) => apiCall("/me", "GET", undefined, token)
