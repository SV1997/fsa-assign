export type UserRole = "admin" | "student" | "staff"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

export interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>
  logout: () => void
}

export interface Equipment {
  id: string
  name: string
  condition: string
  category: string
  available: number
  quantity: number
  createdAt: string
}

export interface EquipmentRequest {
  id: string
  equipmentId: string
  equipment: any
  requesterId: string
  requester:any,
  requesterRole: UserRole
  from: string
  to: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
  approvedAt?: string
  approvedBy?: string
}

export interface Loan {
  id: string
  equipmentId: string
  equipment?: Equipment
  requestId: string
  borrowerId: string
  borrowerName: string
  borrowerRole: UserRole
  quantity: number
  from: string
  issuedBy: string
  returnedAt?: string
  to: string
}

// User types based on Prisma schema

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: UserRole
  createdAt: Date
}

export interface UpdateUserPayload {
  name?: string
  email?: string
  role?: UserRole
}
