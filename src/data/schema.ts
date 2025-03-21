export type Usage = {
  requestSubmitted?: string
  requestedResource?: string
  requestedDate?: string
  requestedTime?: string
  requesterName?: string
  email?: string
  bookingInfo?: string
  status: string
  totalPrice?: number
  owner?: string
  costs?: number
  region?: string
  stability?: number
  lastEdited?: string
  transactionId?: string
  transactionDate?: string
  propertyName?: string
  unitNumber?: string
  tenantName?: string
  paymentMethod?: string
  paymentType?: string
  amount?: number
  dueDate?: string
  paymentStatus?: string
  creditId?: string
  creditAmount?: number
  creditReason?: string
  creditAppliedTo?: string
  discountId?: string
  discountType?: string
  discountAmount?: number
  discountPercentage?: number
  discountPeriod?: string
  discountAppliedTo?: string
}

export type VisitorStatus = "checked-in" | "checked-out" | "expected"

export interface Visitor {
  id: string
  checkInTime: string | null
  checkOutTime: string | null
  visitorName: string
  company: string
  hostName: string
  purpose: string
  status: VisitorStatus
  badgeNumber: string
  email?: string
  phone?: string
}

export type OverviewData = {
  date: string
  "Rows written": number
  "Rows read": number
  Queries: number
  "Payments completed": number
  "Sign ups": number
  Logins: number
  "Sign outs": number
  "Support calls": number
}

export type User = {
  id: string
  name: string
  email: string
  role: string
  company: string
  status: "active" | "inactive" | "invited"
  avatarUrl?: string
  initials: string
}

export type Vendor = {
  id: string
  name: string
  logoUrl: string
  category: string
  contact: string
  email: string
  phone: string
  buildings: string[]
  status: "active" | "inactive"
}

export type WorkOrder = {
  id: string
  title: string
  status: "completed" | "in-progress" | "pending"
  priority: "high" | "medium" | "low"
  submittedBy: string
  submittedDate: string
  building: string
}
