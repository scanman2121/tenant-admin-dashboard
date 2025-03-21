import { Usage } from "./schema";

export const roles: { value: string; label: string }[] = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "member",
    label: "Member",
  },
  {
    value: "viewer",
    label: "Tenant admin",
  },
  {
    value: "contributor",
    label: "Property admin",
  },
]

export const statuses: { value: string; label: string; variant: string }[] = [
  {
    value: "Approved",
    label: "Approved",
    variant: "success",
  },
  {
    value: "Pending",
    label: "Pending",
    variant: "warning",
  },
  {
    value: "Rejected",
    label: "Rejected",
    variant: "error",
  },
]

export const regions: { value: string; label: string }[] = [
  {
    value: "US-West 1",
    label: "US-West 1",
  },
  {
    value: "US-West 2",
    label: "US-West 2",
  },
  {
    value: "US-East 1",
    label: "US-East 1",
  },
  {
    value: "US-East 2",
    label: "US-East 2",
  },
  {
    value: "EU-West 1",
    label: "EU-West 1",
  },
  {
    value: "EU-North 1",
    label: "EU-North 1",
  },
  {
    value: "EU-Central 1",
    label: "EU-Central 1",
  },
]

export const conditions: { value: string; label: string }[] = [
  {
    value: "is-equal-to",
    label: "is equal to",
  },
  {
    value: "is-between",
    label: "is between",
  },
  {
    value: "is-greater-than",
    label: "is greater than",
  },
  {
    value: "is-less-than",
    label: "is less than",
  },
]

export const companies: { value: string; label: string }[] = [
  {
    value: "Acme Inc",
    label: "Acme Inc",
  },
  {
    value: "Global Tech",
    label: "Global Tech",
  },
  {
    value: "Innovate Solutions",
    label: "Innovate Solutions",
  },
  {
    value: "Tech Innovators",
    label: "Tech Innovators",
  },
]

export const userStatuses: { value: string; label: string }[] = [
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Inactive",
    label: "Inactive",
  },
]

export const users: {
  name: string
  initials: string
  email: string
  role: string
  company: string
  avatarUrl?: string
  status: string
}[] = [
    {
      name: "Tenny",
      initials: "TY",
      email: "tenny@acme.com",
      role: "viewer",
      company: "Acme Inc",
      status: "active",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Alissia McCalister",
      initials: "AM",
      email: "a.stone@gmail.com",
      role: "viewer",
      company: "Acme Inc",
      status: "active",
    },
    {
      name: "Emily Luisa Bernacle",
      initials: "EB",
      email: "e.luis.bernacle@gmail.com",
      role: "member",
      company: "Acme Inc",
      status: "active",
    },
    {
      name: "Aaron Wave",
      initials: "AW",
      email: "a.flow@acme.com",
      role: "contributor",
      company: "Acme Inc",
      status: "active",
    },
    {
      name: "Thomas Palstein",
      initials: "TP",
      email: "t.palstein@acme.com",
      role: "viewer",
      company: "Acme Inc",
      status: "active",
    },
    {
      name: "Sarah Johnson",
      initials: "SJ",
      email: "s.johnson@gmail.com",
      role: "admin",
      company: "Acme Inc",
      status: "active",
    },
    {
      name: "Megan Katherina Brown",
      initials: "MB",
      email: "m.lovelybrown@gmail.com",
      role: "contributor",
      company: "Acme Inc",
      status: "active",
    },
    {
      name: "John Smith",
      initials: "JS",
      email: "john.smith@example.com",
      role: "admin",
      company: "Acme Corp",
      status: "active",
    },
    {
      name: "Sarah Johnson",
      initials: "SJ",
      email: "sarah.johnson@example.com",
      role: "user",
      company: "Acme Corp",
      status: "active",
    },
    {
      name: "Michael Brown",
      initials: "MB",
      email: "michael.brown@example.com",
      role: "user",
      company: "Acme Corp",
      status: "inactive",
    },
    {
      name: "Emily Davis",
      initials: "ED",
      email: "emily.davis@example.com",
      role: "user",
      company: "Acme Corp",
      status: "active",
    },
    {
      name: "David Wilson",
      initials: "DW",
      email: "david.wilson@example.com",
      role: "admin",
      company: "Acme Corp",
      status: "active",
    },
  ]

export const invitedUsers: {
  initials: string
  email: string
  role: string
  expires: number
}[] = [
    {
      initials: "LP",
      email: "lydia.posh@gmail.com",
      role: "viewer",
      expires: 12,
    },
    {
      initials: "AW",
      email: "awidburg@bluewin.ch",
      role: "viewer",
      expires: 8,
    },
  ]

export const usage: Usage[] = [
  // Transactions
  {
    transactionId: "TRX-2023-001",
    transactionDate: "04/15/2023",
    propertyName: "Riverside Apartments",
    unitNumber: "301",
    tenantName: "Michael Johnson",
    paymentMethod: "Credit Card",
    paymentType: "Rent",
    amount: 1850.00,
    dueDate: "04/01/2023",
    paymentStatus: "Completed",
    status: "Approved",
  },
  {
    transactionId: "TRX-2023-002",
    transactionDate: "04/10/2023",
    propertyName: "Oakwood Heights",
    unitNumber: "205",
    tenantName: "Sarah Williams",
    paymentMethod: "Bank Transfer",
    paymentType: "Rent",
    amount: 2100.00,
    dueDate: "04/01/2023",
    paymentStatus: "Completed",
    status: "Approved",
  },
  {
    transactionId: "TRX-2023-003",
    transactionDate: "04/03/2023",
    propertyName: "Parkview Condos",
    unitNumber: "512",
    tenantName: "David Chen",
    paymentMethod: "Check",
    paymentType: "Rent + Utilities",
    amount: 2350.00,
    dueDate: "04/01/2023",
    paymentStatus: "Completed",
    status: "Approved",
  },
  {
    transactionId: "TRX-2023-004",
    transactionDate: "04/05/2023",
    propertyName: "Riverside Apartments",
    unitNumber: "107",
    tenantName: "Emily Rodriguez",
    paymentMethod: "Credit Card",
    paymentType: "Rent",
    amount: 1650.00,
    dueDate: "04/01/2023",
    paymentStatus: "Pending",
    status: "Pending",
  },
  {
    transactionId: "TRX-2023-005",
    transactionDate: "04/02/2023",
    propertyName: "Oakwood Heights",
    unitNumber: "310",
    tenantName: "James Wilson",
    paymentMethod: "Bank Transfer",
    paymentType: "Rent + Parking",
    amount: 2250.00,
    dueDate: "04/01/2023",
    paymentStatus: "Completed",
    status: "Approved",
  },
  // Credits
  {
    creditId: "CRD-2023-001",
    transactionDate: "04/12/2023",
    propertyName: "Riverside Apartments",
    unitNumber: "301",
    tenantName: "Michael Johnson",
    creditAmount: 150.00,
    creditReason: "Maintenance Inconvenience",
    creditAppliedTo: "May Rent",
    status: "Approved",
  },
  {
    creditId: "CRD-2023-002",
    transactionDate: "04/08/2023",
    propertyName: "Parkview Condos",
    unitNumber: "512",
    tenantName: "David Chen",
    creditAmount: 75.00,
    creditReason: "Referral Bonus",
    creditAppliedTo: "May Rent",
    status: "Approved",
  },
  {
    creditId: "CRD-2023-003",
    transactionDate: "04/15/2023",
    propertyName: "Oakwood Heights",
    unitNumber: "205",
    tenantName: "Sarah Williams",
    creditAmount: 200.00,
    creditReason: "Overpayment Refund",
    creditAppliedTo: "Account Balance",
    status: "Pending",
  },
  // Discounts
  {
    discountId: "DSC-2023-001",
    transactionDate: "04/01/2023",
    propertyName: "Riverside Apartments",
    unitNumber: "107",
    tenantName: "Emily Rodriguez",
    discountType: "Early Payment",
    discountAmount: 50.00,
    discountPercentage: 3,
    discountPeriod: "April 2023",
    discountAppliedTo: "April Rent",
    status: "Approved",
  },
  {
    discountId: "DSC-2023-002",
    transactionDate: "04/01/2023",
    propertyName: "Oakwood Heights",
    unitNumber: "310",
    tenantName: "James Wilson",
    discountType: "Loyalty",
    discountAmount: 100.00,
    discountPercentage: 5,
    discountPeriod: "April 2023",
    discountAppliedTo: "April Rent",
    status: "Approved",
  },
  {
    discountId: "DSC-2023-003",
    transactionDate: "04/01/2023",
    propertyName: "Parkview Condos",
    unitNumber: "512",
    tenantName: "David Chen",
    discountType: "Renewal Incentive",
    discountAmount: 150.00,
    discountPercentage: 7,
    discountPeriod: "April-June 2023",
    discountAppliedTo: "Quarterly Rent",
    status: "Pending",
  },
  // Keep some of the original data
  {
    requestSubmitted: "03/06/2025",
    requestedResource: "The Longboard Room",
    requestedDate: "03/19/2025",
    requestedTime: "10:45 AM - 12:30 PM",
    requesterName: "Lucy Mitchell",
    email: "lucy.mitchell@example.com",
    bookingInfo: "-",
    status: "Approved",
    totalPrice: 0.00,
  },
  {
    requestSubmitted: "03/05/2025",
    requestedResource: "Conference Room A",
    requestedDate: "03/20/2025",
    requestedTime: "2:00 PM - 4:00 PM",
    requesterName: "John Smith",
    email: "john.smith@example.com",
    bookingInfo: "Team meeting",
    status: "Pending",
    totalPrice: 150.00,
  },
  {
    requestSubmitted: "03/04/2025",
    requestedResource: "Training Room",
    requestedDate: "03/18/2025",
    requestedTime: "9:00 AM - 5:00 PM",
    requesterName: "Sarah Johnson",
    email: "sarah.j@example.com",
    bookingInfo: "Annual training",
    status: "Approved",
    totalPrice: 500.00,
  },
  {
    owner: "Jane Smith",
    status: "live",
    costs: 6087.11,
    region: "US-East 2",
    stability: 91,
    lastEdited: "22/09/2023 10:45",
  },
  {
    owner: "Alejandro Garcia",
    status: "live",
    costs: 7234.56,
    region: "EU-West 1",
    stability: 12,
    lastEdited: "17/05/2021 08:32",
  },
  {
    owner: "Wei Zhang",
    status: "inactive",
    costs: 0,
    region: "US-West 2",
    stability: 0,
    lastEdited: "10/11/2022 15:24",
  },
  {
    owner: "Maria Rossi",
    status: "live",
    costs: 8190.77,
    region: "US-East 1",
    stability: 8,
    lastEdited: "05/06/2023 12:16",
  },
  {
    owner: "Nina Müller",
    status: "archived",
    costs: 7609.32,
    region: "EU-North 1",
    stability: 20,
    lastEdited: "23/01/2022 11:11",
  },
  {
    owner: "Liam O'Sullivan",
    status: "live",
    costs: 5204.98,
    region: "US-West 1",
    stability: 18,
    lastEdited: "14/03/2023 14:45",
  },
  {
    owner: "Amir Fleischlin",
    status: "inactive",
    costs: 0,
    region: "EU-Central 1",
    stability: 0,
    lastEdited: "12/02/2023 09:12",
  },
  {
    owner: "Yuki Tanaka",
    status: "live",
    costs: 9874.56,
    region: "US-East 1",
    stability: 6,
    lastEdited: "19/08/2022 16:03",
  },
  {
    owner: "Fatima Al-Farsi",
    status: "live",
    costs: 5486.99,
    region: "EU-West 1",
    stability: 12,
    lastEdited: "29/11/2021 17:25",
  },
  {
    owner: "Olga Ivanova",
    status: "live",
    costs: 6120.45,
    region: "US-West 2",
    stability: 9,
    lastEdited: "07/12/2023 07:14",
  },
  {
    owner: "Pierre Dubois",
    status: "live",
    costs: 4834.11,
    region: "EU-Central 1",
    stability: 15,
    lastEdited: "28/04/2023 10:45",
  },
  {
    owner: "Sara Johansson",
    status: "live",
    costs: 5302.22,
    region: "US-East 2",
    stability: 97,
    lastEdited: "03/10/2022 08:33",
  },
  {
    owner: "Ahmed Hassan",
    status: "live",
    costs: 6221.54,
    region: "US-West 1",
    stability: 11,
    lastEdited: "22/07/2022 14:16",
  },
  {
    owner: "Emily Brown",
    status: "archived",
    costs: 6129.99,
    region: "EU-North 1",
    stability: 22,
    lastEdited: "18/01/2022 12:45",
  },
  {
    owner: "Carlos Sanchez",
    status: "live",
    costs: 4850.33,
    region: "US-East 1",
    stability: 13,
    lastEdited: "05/06/2021 18:33",
  },
  {
    owner: "Hannah Kim",
    status: "live",
    costs: 7902.11,
    region: "EU-West 1",
    stability: 91,
    lastEdited: "11/05/2023 11:00",
  },
  {
    owner: "David Johnson",
    status: "live",
    costs: 6789.77,
    region: "US-West 2",
    stability: 10,
    lastEdited: "19/09/2023 17:17",
  },
  {
    owner: "Linda Anderson",
    status: "live",
    costs: 7434.22,
    region: "US-East 2",
    stability: 9,
    lastEdited: "27/03/2023 14:28",
  },
  {
    owner: "Michael Lee",
    status: "archived",
    costs: 7290.01,
    region: "EU-Central 1",
    stability: 12,
    lastEdited: "23/11/2022 15:13",
  },
  {
    owner: "Sophia Lopez",
    status: "live",
    costs: 8921.34,
    region: "EU-North 1",
    stability: 16,
    lastEdited: "08/05/2023 08:56",
  },
  {
    owner: "Robert White",
    status: "live",
    costs: 6834.23,
    region: "US-West 1",
    stability: 8,
    lastEdited: "29/04/2022 19:27",
  },
  {
    owner: "Mia Wang",
    status: "inactive",
    costs: 0,
    region: "US-West 2",
    stability: 14,
    lastEdited: "30/12/2023 13:01",
  },
  {
    owner: "James Taylor",
    status: "live",
    costs: 4321.56,
    region: "EU-West 1",
    stability: 5,
    lastEdited: "18/06/2021 10:49",
  },
  {
    owner: "Victoria Martinez",
    status: "archived",
    costs: 5120.33,
    region: "US-East 1",
    stability: 19,
    lastEdited: "24/02/2022 14:02",
  },
  {
    owner: "William Harris",
    status: "live",
    costs: 9211.42,
    region: "EU-North 1",
    stability: 11,
    lastEdited: "22/07/2021 12:33",
  },
  {
    owner: "Isabella Clark",
    status: "inactive",
    costs: 0,
    region: "US-East 2",
    stability: 6,
    lastEdited: "13/09/2022 16:22",
  },
  {
    owner: "Alexander Young",
    status: "live",
    costs: 4534.88,
    region: "US-West 1",
    stability: 17,
    lastEdited: "09/10/2023 17:44",
  },
  {
    owner: "Grace Patel",
    status: "live",
    costs: 8245.99,
    region: "EU-Central 1",
    stability: 9,
    lastEdited: "29/07/2022 11:56",
  },
  {
    owner: "Daniel Wilson",
    status: "archived",
    costs: 7890.77,
    region: "EU-West 1",
    stability: 14,
    lastEdited: "10/11/2021 15:08",
  },
  {
    owner: "Charlotte Thompson",
    status: "live",
    costs: 8911.44,
    region: "US-East 1",
    stability: 10,
    lastEdited: "06/08/2021 09:17",
  },
  {
    owner: "Olivia Anderson",
    status: "inactive",
    costs: 0,
    region: "EU-West 1",
    stability: 12,
    lastEdited: "25/05/2022 10:05",
  },
  {
    owner: "Henry Brown",
    status: "live",
    costs: 5500.12,
    region: "US-West 2",
    stability: 15,
    lastEdited: "07/01/2023 08:33",
  },
  {
    owner: "Ethan Davis",
    status: "live",
    costs: 7200.98,
    region: "EU-Central 1",
    stability: 8,
    lastEdited: "21/09/2023 13:00",
  },
  {
    owner: "Amelia Wilson",
    status: "live",
    costs: 8321.56,
    region: "US-East 2",
    stability: 18,
    lastEdited: "12/06/2021 11:45",
  },
  {
    owner: "Lucas Martin",
    status: "live",
    costs: 4534.99,
    region: "US-West 1",
    stability: 11,
    lastEdited: "30/03/2022 14:14",
  },
  {
    owner: "Mason Clark",
    status: "live",
    costs: 6890.11,
    region: "EU-North 1",
    stability: 7,
    lastEdited: "14/05/2023 12:36",
  },
  {
    owner: "Emma Robinson",
    status: "live",
    costs: 7990.01,
    region: "US-East 1",
    stability: 13,
    lastEdited: "18/10/2022 09:25",
  },
  {
    owner: "Benjamin Lewis",
    status: "archived",
    costs: 5412.23,
    region: "EU-Central 1",
    stability: 20,
    lastEdited: "22/02/2022 15:55",
  },
  {
    owner: "Ava Walker",
    status: "live",
    costs: 7123.98,
    region: "US-West 2",
    stability: 9,
    lastEdited: "27/08/2023 18:33",
  },
  {
    owner: "Elijah Young",
    status: "live",
    costs: 6445.33,
    region: "EU-West 1",
    stability: 8,
    lastEdited: "02/07/2021 17:14",
  },
  {
    owner: "Sophia Hall",
    status: "inactive",
    costs: 0,
    region: "US-East 1",
    stability: 10,
    lastEdited: "15/04/2023 10:45",
  },
  {
    owner: "Matthew Harris",
    status: "live",
    costs: 7634.67,
    region: "EU-North 1",
    stability: 11,
    lastEdited: "06/09/2023 11:23",
  },
  {
    owner: "Aiden Thompson",
    status: "archived",
    costs: 4900.88,
    region: "US-West 1",
    stability: 14,
    lastEdited: "20/10/2021 16:05",
  },
  {
    owner: "Chloe Martinez",
    status: "live",
    costs: 5234.44,
    region: "US-East 2",
    stability: 17,
    lastEdited: "11/11/2023 08:55",
  },
  {
    owner: "Oliver Davis",
    status: "inactive",
    costs: 0,
    region: "EU-West 1",
    stability: 12,
    lastEdited: "18/08/2022 14:34",
  },
  {
    owner: "Emily Clark",
    status: "live",
    costs: 7688.55,
    region: "EU-Central 1",
    stability: 9,
    lastEdited: "22/04/2023 12:11",
  },
  {
    owner: "Jack Lewis",
    status: "archived",
    costs: 6344.89,
    region: "US-West 2",
    stability: 19,
    lastEdited: "10/02/2021 11:45",
  },
  {
    owner: "Lily Walker",
    status: "live",
    costs: 5003.78,
    region: "EU-West 1",
    stability: 8,
    lastEdited: "23/07/2022 14:33",
  },
  {
    owner: "Jackson Martinez",
    status: "inactive",
    costs: 0,
    region: "US-East 1",
    stability: 7,
    lastEdited: "07/05/2023 09:27",
  },
  {
    owner: "Avery Hall",
    status: "live",
    costs: 8432.45,
    region: "EU-Central 1",
    stability: 11,
    lastEdited: "16/03/2022 15:44",
  },
  {
    owner: "Logan Harris",
    status: "archived",
    costs: 7120.39,
    region: "EU-North 1",
    stability: 21,
    lastEdited: "01/01/2022 16:18",
  },
]

export const visitorStatuses: { value: string; label: string; variant: string }[] = [
  {
    value: "Checked In",
    label: "Checked In",
    variant: "success",
  },
  {
    value: "Checked Out",
    label: "Checked Out",
    variant: "default",
  },
  {
    value: "Expected",
    label: "Expected",
    variant: "warning",
  },
]

export const visitors = [
  {
    checkInTime: "09:30 AM",
    visitorName: "Sarah Johnson",
    company: "Acme Corp",
    hostName: "Michael Chen",
    purpose: "Client Meeting",
    status: "Checked In",
    checkOutTime: null,
    badgeNumber: "V1001",
  },
  {
    checkInTime: "10:15 AM",
    visitorName: "James Wilson",
    company: "Tech Solutions",
    hostName: "Emily Brown",
    purpose: "Interview",
    status: "Checked Out",
    checkOutTime: "11:45 AM",
    badgeNumber: "V1002",
  },
  {
    checkInTime: "02:00 PM",
    visitorName: "Maria Garcia",
    company: "Global Services",
    hostName: "David Kim",
    purpose: "Vendor Meeting",
    status: "Expected",
    checkOutTime: null,
    badgeNumber: "V1003",
  },
]
