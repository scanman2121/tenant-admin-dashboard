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
}

export type Visitor = {
  checkInTime: string
  visitorName: string
  company: string
  hostName: string
  purpose: string
  status: string
  checkOutTime: string | null
  badgeNumber: string
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
