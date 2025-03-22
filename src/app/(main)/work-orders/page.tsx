"use client"

import { Button } from "@/components/Button"
import { Checkbox } from "@/components/Checkbox"
import { PageHeader } from "@/components/PageHeader"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { RiAddLine } from "@remixicon/react"
import { Row, Table } from "@tanstack/react-table"
import { useState } from "react"

// Define the WorkOrder type based on the data structure
type WorkOrder = {
    id: string
    title: string
    status: string
    priority: string
    submittedBy: string
    submittedDate: string
    building: string
}

// Mock data for work orders
const workOrders: WorkOrder[] = [
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

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case "completed":
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
        case "in progress":
            return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
        case "pending":
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
}

const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
        case "high":
            return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        case "medium":
            return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
        case "low":
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
}

// Define columns for the work orders table
const workOrderColumns = [
    {
        id: "select",
        header: ({ table }: { table: Table<WorkOrder> }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected()
                        ? true
                        : table.getIsSomePageRowsSelected()
                            ? "indeterminate"
                            : false
                }
                onCheckedChange={(value) => {
                    table.toggleAllPageRowsSelected(!!value)
                }}
                aria-label="Select all"
            />
        ),
        cell: ({ row }: { row: Row<WorkOrder> }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => {
                    row.toggleSelected(!!value)
                }}
                onClick={(e) => {
                    e.stopPropagation()
                }}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
        meta: {
            displayName: "Select",
        },
    },
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }: { row: Row<WorkOrder> }) => (
            <span className="font-medium text-gray-900 dark:text-gray-50">
                {row.getValue("id")}
            </span>
        ),
        meta: {
            displayName: "ID",
        },
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }: { row: Row<WorkOrder> }) => (
            <span className="text-gray-900 dark:text-gray-50">
                {row.getValue("title")}
            </span>
        ),
        meta: {
            displayName: "Title",
        },
        enableColumnFilter: true,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: Row<WorkOrder> }) => {
            const status = row.getValue("status") as string;
            return (
                <Badge className={getStatusColor(status)} variant="secondary">
                    {status}
                </Badge>
            );
        },
        meta: {
            displayName: "Status",
            filterOptions: [
                { label: "Completed", value: "Completed" },
                { label: "In Progress", value: "In Progress" },
                { label: "Pending", value: "Pending" },
            ],
        },
        filterFn: "equals" as const,
        enableColumnFilter: true,
    },
    {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }: { row: Row<WorkOrder> }) => {
            const priority = row.getValue("priority") as string;
            return (
                <Badge className={getPriorityColor(priority)} variant="secondary">
                    {priority}
                </Badge>
            );
        },
        meta: {
            displayName: "Priority",
            filterOptions: [
                { label: "High", value: "High" },
                { label: "Medium", value: "Medium" },
                { label: "Low", value: "Low" },
            ],
        },
        filterFn: "equals" as const,
        enableColumnFilter: true,
    },
    {
        accessorKey: "submittedBy",
        header: "Submitted by",
        cell: ({ row }: { row: Row<WorkOrder> }) => (
            <span className="text-gray-600 dark:text-gray-400">
                {row.getValue("submittedBy")}
            </span>
        ),
        meta: {
            displayName: "Submitted by",
        },
        enableColumnFilter: true,
    },
    {
        accessorKey: "submittedDate",
        header: "Submitted date",
        cell: ({ row }: { row: Row<WorkOrder> }) => (
            <span className="text-gray-600 dark:text-gray-400">
                {row.getValue("submittedDate")}
            </span>
        ),
        meta: {
            displayName: "Submitted date",
        },
    },
    {
        accessorKey: "building",
        header: "Building",
        cell: ({ row }: { row: Row<WorkOrder> }) => (
            <span className="text-gray-600 dark:text-gray-400">
                {row.getValue("building")}
            </span>
        ),
        meta: {
            displayName: "Building",
        },
        filterFn: "equals" as const,
        enableColumnFilter: true,
    },
]

export default function WorkOrdersPage() {
    const [data] = useState<WorkOrder[]>(workOrders)

    return (
        <div className="space-y-6">
            <PageHeader
                title="Work orders"
                customButtons={
                    <Button size="md" className="inline-flex items-center">
                        <RiAddLine className="size-4 shrink-0 mr-1.5" aria-hidden="true" />
                        Create work order
                    </Button>
                }
            />

            <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                <DataTable columns={workOrderColumns} data={data} />
            </div>
        </div>
    )
} 