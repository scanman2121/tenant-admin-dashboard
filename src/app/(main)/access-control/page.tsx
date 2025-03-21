"use client"

import { DataTable } from "@/components/ui/data-table/DataTable"
import { useState } from "react"

// Define columns for the access control table
const accessControlColumns = [
    {
        id: "name",
        header: "Name",
        accessorKey: "name",
    },
    {
        id: "type",
        header: "Type",
        accessorKey: "type",
    },
    {
        id: "location",
        header: "Location",
        accessorKey: "location",
    },
    {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: ({ row }: { row: any }) => {
            const status = row.getValue("status") as string
            return (
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    {status}
                </span>
            )
        }
    }
]

// Mock data for access control
const mockAccessControlData = [
    {
        id: "1",
        name: "Main Entrance",
        type: "Door",
        location: "Ground Floor",
        status: "Active",
    },
    {
        id: "2",
        name: "Parking Gate",
        type: "Gate",
        location: "Basement",
        status: "Active",
    },
    {
        id: "3",
        name: "Office Area",
        type: "Door",
        location: "2nd Floor",
        status: "Active",
    },
]

export default function AccessControl() {
    const [data] = useState(mockAccessControlData)

    return (
        <div className="container mx-auto px-4 py-6 lg:px-8 lg:py-8">
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                            Access Control
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage access points and permissions
                        </p>
                    </div>
                </div>
                <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                    <DataTable columns={accessControlColumns} data={data} />
                </div>
            </div>
        </div>
    )
} 