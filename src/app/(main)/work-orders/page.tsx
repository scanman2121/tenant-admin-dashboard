"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RiAddLine } from "@remixicon/react"
import { useState } from "react"

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
            const status = row.getValue("status") as "completed" | "in-progress" | "pending"
            const variants = {
                completed: "default",
                "in-progress": "secondary",
                pending: "outline",
            } as const
            return (
                <Badge variant={variants[status]}>
                    • {status}
                </Badge>
            )
        }
    },
    {
        id: "priority",
        header: "Priority",
        accessorKey: "priority",
        cell: ({ row }: { row: any }) => {
            const priority = row.getValue("priority") as "high" | "medium" | "low"
            const variants = {
                high: "destructive",
                medium: "secondary",
                low: "outline",
            } as const
            return (
                <Badge variant={variants[priority]}>
                    • {priority}
                </Badge>
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
        status: "in-progress",
        priority: "high",
        submittedBy: "John Smith",
        submittedDate: "2024-03-20",
        building: "HQ Building",
    },
    {
        id: "WO-2024-002",
        title: "Light Bulb Replacement",
        status: "pending",
        priority: "low",
        submittedBy: "Sarah Johnson",
        submittedDate: "2024-03-19",
        building: "East Wing",
    },
    {
        id: "WO-2024-003",
        title: "Elevator Maintenance",
        status: "completed",
        priority: "medium",
        submittedBy: "Mike Brown",
        submittedDate: "2024-03-18",
        building: "West Wing",
    },
]

export default function WorkOrdersPage() {
    const [selectedTab, setSelectedTab] = useState("all")

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">Work Orders</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage and track maintenance requests</p>
                </div>
                <Button size="lg">
                    <RiAddLine className="mr-1.5 h-5 w-5" />
                    Create work order
                </Button>
            </div>

            {/* Tabs */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    <DataTable columns={workOrderColumns} data={mockWorkOrdersData} />
                </TabsContent>

                <TabsContent value="completed">
                    <DataTable
                        columns={workOrderColumns}
                        data={mockWorkOrdersData.filter(order => order.status === "completed")}
                    />
                </TabsContent>

                <TabsContent value="in-progress">
                    <DataTable
                        columns={workOrderColumns}
                        data={mockWorkOrdersData.filter(order => order.status === "in-progress")}
                    />
                </TabsContent>

                <TabsContent value="pending">
                    <DataTable
                        columns={workOrderColumns}
                        data={mockWorkOrdersData.filter(order => order.status === "pending")}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
} 