"use client"

import { Button } from "@/components/ui/button"
import { DistributeCreditsModal } from "@/components/ui/credits/DistributeCreditsModal"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { RiCoinLine } from "@remixicon/react"
import { useState } from "react"

interface Employee {
    id: number
    name: string
    email: string
    credits: number
    department: string
}

interface Transaction {
    id: number
    employee: string
    amount: number
    date: string
    purpose: string
    status: string
}

// Mock data for employees credits
const employeesData: Employee[] = [
    { id: 1, name: "John Smith", email: "john.smith@company.com", credits: 500, department: "Engineering" },
    { id: 2, name: "Sarah Johnson", email: "sarah.j@company.com", credits: 750, department: "Marketing" },
    { id: 3, name: "Mike Brown", email: "mike.b@company.com", credits: 300, department: "Sales" },
]

// Mock data for transactions
const transactionsData: Transaction[] = [
    { id: 1, employee: "John Smith", amount: 50, date: "2024-03-15", purpose: "Lunch order", status: "Completed" },
    { id: 2, employee: "Sarah Johnson", amount: 25, date: "2024-03-14", purpose: "Coffee break", status: "Completed" },
    { id: 3, employee: "Mike Brown", amount: 100, date: "2024-03-13", purpose: "Team event", status: "Pending" },
]

// Column definitions for employees table
const employeeColumns = [
    { header: "Name", accessorKey: "name" },
    { header: "Email", accessorKey: "email" },
    { header: "Department", accessorKey: "department" },
    {
        header: "Credits balance",
        accessorKey: "credits",
        cell: ({ row }: { row: { original: Employee } }) => (
            <div className="flex items-center gap-1">
                <RiCoinLine className="text-yellow-500" />
                {row.original.credits}
            </div>
        )
    },
]

// Column definitions for transactions table
const transactionColumns = [
    { header: "Employee", accessorKey: "employee" },
    {
        header: "Amount",
        accessorKey: "amount",
        cell: ({ row }: { row: { original: Transaction } }) => (
            <div className="flex items-center gap-1">
                <RiCoinLine className="text-yellow-500" />
                {row.original.amount}
            </div>
        )
    },
    {
        header: "Date",
        accessorKey: "date",
        cell: ({ row }: { row: { original: Transaction } }) => new Date(row.original.date).toLocaleDateString()
    },
    { header: "Purpose", accessorKey: "purpose" },
    {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }: { row: { original: Transaction } }) => (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${row.original.status === "Completed"
                ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400"
                }`}>
                • {row.original.status}
            </span>
        )
    },
]

export default function CreditsPage() {
    const [activeTab, setActiveTab] = useState("employees")
    const [isDistributeModalOpen, setIsDistributeModalOpen] = useState(false)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">Credits</h1>
                <Button size="lg" onClick={() => setIsDistributeModalOpen(true)}>
                    <RiCoinLine className="mr-1.5 h-5 w-5" />
                    Distribute credits
                </Button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-800">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab("employees")}
                        className={`
              whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors
              ${activeTab === "employees"
                                ? "border-primary text-primary"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-200"
                            }
            `}
                    >
                        Employees
                    </button>
                    <button
                        onClick={() => setActiveTab("transactions")}
                        className={`
              whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors
              ${activeTab === "transactions"
                                ? "border-primary text-primary"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-200"
                            }
            `}
                    >
                        Transactions
                    </button>
                </nav>
            </div>

            {/* Tab content */}
            <div className="mt-6">
                {activeTab === "employees" ? (
                    <DataTable
                        columns={employeeColumns}
                        data={employeesData}
                    />
                ) : (
                    <DataTable
                        columns={transactionColumns}
                        data={transactionsData}
                    />
                )}
            </div>

            {/* Distribute Credits Modal */}
            <DistributeCreditsModal
                isOpen={isDistributeModalOpen}
                onClose={() => setIsDistributeModalOpen(false)}
                employees={employeesData}
            />
        </div>
    )
} 