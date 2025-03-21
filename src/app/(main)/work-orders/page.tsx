"use client"

import { DataTable } from "@/components/ui/data-table/DataTable"
import { Button } from "@tremor/react"

// Define columns for the work orders table
const workOrderColumns = [
    {
        id: "id",
        header: "ID",
        accessorKey: "id",
    },
    {
        id: "title",
        header: "Title",
        accessorKey: "title",
    },
    {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: ({ row }: { row: any }) => {
            const status = row.getValue("status") as string
            return (
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status === "Completed" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                        status === "In Progress" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" :
                            "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                    }`}>
                    {status}
                </span>
            )
        }
    },
    {
        id: "priority",
        header: "Priority",
        accessorKey: "priority",
        cell: ({ row }: { row: any }) => {
            const priority = row.getValue("priority") as string
            return (
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${priority === "High" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" :
                        priority === "Medium" ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" :
                            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    }`}>
                    {priority}
                </span>
            )
        }
    },
    {
        id: "submittedBy",
        header: "Submitted by",
        accessorKey: "submittedBy",
    },
    {
        id: "submittedDate",
        header: "Submitted date",
        accessorKey: "submittedDate",
    },
    {
        id: "building",
        header: "Building",
        accessorKey: "building",
    },
]

// Mock data for work orders
const mockWorkOrdersData = [
    {
        id: "WO-2024-001",
        title: "Broken AC in Meeting Room 3",
        status: "In Progress",
        priority: "High",
        submittedBy: "John Smith",
        submittedDate: "2024-03-20",
        building: "HQ Building",
    },
    {
        id: "WO-2024-002",
        title: "Light Bulb Replacement",
        status: "Pending",
        priority: "Low",
        submittedBy: "Sarah Johnson",
        submittedDate: "2024-03-19",
        building: "East Wing",
    },
    {
        id: "WO-2024-003",
        title: "Elevator Maintenance",
        status: "Completed",
        priority: "Medium",
        submittedBy: "Mike Brown",
        submittedDate: "2024-03-18",
        building: "West Wing",
    },
]

export default function WorkOrdersPage() {
    return (
        <div className="container mx-auto px-4 py-6 lg:px-8 lg:py-8">
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                            Work orders
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage and track maintenance requests
                        </p>
                    </div>
                    <Button
                        variant="primary"
                        size="sm"
                        className="whitespace-nowrap"
                    >
                        Create work order
                    </Button>
                </div>

                {/* Table */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                    <DataTable columns={workOrderColumns} data={mockWorkOrdersData} />
                </div>
            </div>
        </div>
    )
} 