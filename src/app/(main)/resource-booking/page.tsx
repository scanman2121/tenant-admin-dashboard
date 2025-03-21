"use client"

import { Button } from "@/components/Button"
import { PageHeader } from "@/components/PageHeader"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { RiAddLine } from "@remixicon/react"

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
        location: "Floor 1",
        status: "Available"
    },
    {
        id: "2",
        name: "Conference Room B",
        type: "Meeting Room",
        capacity: "20",
        location: "Floor 2",
        status: "Booked"
    },
    {
        id: "3",
        name: "Phone Booth 1",
        type: "Phone Booth",
        capacity: "1",
        location: "Floor 1",
        status: "Available"
    }
]

export default function ResourceBooking() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Resource booking"
                customButtons={
                    <Button className="flex items-center gap-2">
                        <RiAddLine className="size-5" />
                        Book a resource
                    </Button>
                }
            />
            <div className="rounded-lg border bg-card">
                <DataTable
                    data={mockResourceBookingData}
                    columns={resourceBookingColumns}
                />
            </div>
        </div>
    )
} 