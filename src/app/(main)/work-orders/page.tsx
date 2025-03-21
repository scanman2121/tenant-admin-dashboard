"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WorkOrder } from "@/data/schema"
import { RiAddLine } from "@remixicon/react"
import { Row } from "@tanstack/react-table"
import { useState } from "react"

const workOrderColumns = [
    {
        accessorKey: "id",
        header: "Work order ID",
        cell: ({ row }: { row: Row<WorkOrder> }) => {
            const id = row.getValue("id") as string
            return (
                <div className="font-medium">
                    {id}
                </div>
            )
        },
        meta: {
            displayName: "Work order ID",
        },
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }: { row: Row<WorkOrder> }) => {
            const title = row.getValue("title") as string
            return (
                <div className="font-medium">
                    {title}
                </div>
            )
        },
        meta: {
            displayName: "Title",
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: Row<WorkOrder> }) => {
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
        },
        meta: {
            displayName: "Status",
        },
    },
    {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }: { row: Row<WorkOrder> }) => {
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
        },
        meta: {
            displayName: "Priority",
        },
    },
    {
        accessorKey: "submittedBy",
        header: "Submitted by",
        cell: ({ row }: { row: Row<WorkOrder> }) => {
            const submittedBy = row.getValue("submittedBy") as string
            return (
                <div className="text-muted-foreground">
                    {submittedBy}
                </div>
            )
        },
        meta: {
            displayName: "Submitted by",
        },
    },
    {
        accessorKey: "submittedDate",
        header: "Submitted date",
        cell: ({ row }: { row: Row<WorkOrder> }) => {
            const submittedDate = row.getValue("submittedDate") as string
            return (
                <div className="text-muted-foreground">
                    {submittedDate}
                </div>
            )
        },
        meta: {
            displayName: "Submitted date",
        },
    },
    {
        accessorKey: "building",
        header: "Building",
        cell: ({ row }: { row: Row<WorkOrder> }) => {
            const building = row.getValue("building") as string
            return (
                <div className="text-muted-foreground">
                    {building}
                </div>
            )
        },
        meta: {
            displayName: "Building",
        },
    },
]

const mockWorkOrders: WorkOrder[] = [
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

const tabs = [
    {
        value: "all",
        label: "All work orders",
    },
    {
        value: "completed",
        label: "Completed",
    },
    {
        value: "in-progress",
        label: "In progress",
    },
    {
        value: "pending",
        label: "Pending",
    },
]

export default function WorkOrdersPage() {
    const [selectedTab, setSelectedTab] = useState("all")

    return (
        <div className="flex flex-col gap-8 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Work Orders</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage and track maintenance requests
                    </p>
                </div>
                <Button>
                    <RiAddLine className="mr-1.5 h-5 w-5" />
                    Create work order
                </Button>
            </div>

            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList>
                    {tabs.map((tab) => (
                        <TabsTrigger key={tab.value} value={tab.value}>
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="all" className="mt-4">
                    <DataTable columns={workOrderColumns} data={mockWorkOrders} />
                </TabsContent>

                <TabsContent value="completed" className="mt-4">
                    <DataTable
                        columns={workOrderColumns}
                        data={mockWorkOrders.filter(order => order.status === "completed")}
                    />
                </TabsContent>

                <TabsContent value="in-progress" className="mt-4">
                    <DataTable
                        columns={workOrderColumns}
                        data={mockWorkOrders.filter(order => order.status === "in-progress")}
                    />
                </TabsContent>

                <TabsContent value="pending" className="mt-4">
                    <DataTable
                        columns={workOrderColumns}
                        data={mockWorkOrders.filter(order => order.status === "pending")}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
} 