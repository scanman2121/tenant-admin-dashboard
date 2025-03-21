"use client"

import { DataTable } from "@/components/ui/data-table/DataTable"
import { useState } from "react"

// Define columns for the resource booking table
const resourceBookingColumns = [
    {
        id: "name",
        header: "Resource",
        accessorKey: "name",
    },
    {
        id: "type",
        header: "Type",
        accessorKey: "type",
    },
    {
        id: "capacity",
        header: "Capacity",
        accessorKey: "capacity",
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
            const isAvailable = status === "Available"
            return (
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${isAvailable
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                    }`}>
                    {status}
                </span>
            )
        }
    }
]

// Mock data for resource booking
const mockResourceBookingData = [
    {
        id: "1",
        name: "Conference Room A",
        type: "Meeting Room",
        capacity: "10",
        location: "2nd Floor",
        status: "Available",
    },
    {
        id: "2",
        name: "Desk 101",
        type: "Hot Desk",
        capacity: "1",
        location: "3rd Floor",
        status: "Booked",
    },
    {
        id: "3",
        name: "Training Room",
        type: "Meeting Room",
        capacity: "20",
        location: "1st Floor",
        status: "Available",
    },
]

export default function ResourceBooking() {
    const [data] = useState(mockResourceBookingData)

    return (
        <div className="container mx-auto px-4 py-6 lg:px-8 lg:py-8">
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                            Resource Booking
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Book meeting rooms, desks, and other resources
                        </p>
                    </div>
                </div>
                <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                    <DataTable columns={resourceBookingColumns} data={data} />
                </div>
            </div>
        </div>
    )
} 