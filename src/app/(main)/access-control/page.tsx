"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RiAddLine, RiDoorLockLine, RiKey2Line, RiTeamLine } from "@remixicon/react"
import { Card, Grid, Text, Title } from "@tremor/react"
import { useState } from "react"

// Define columns for the credentials table
const credentialsColumns = [
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
        id: "assignedTo",
        header: "Assigned to",
        accessorKey: "assignedTo",
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
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                    status === "Inactive" ? "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300" :
                        "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                    }`}>
                    {status}
                </span>
            )
        }
    }
]

// Mock data for credentials
const mockCredentialsData = [
    {
        id: "1",
        name: "Key Card #A1234",
        type: "Key Card",
        assignedTo: "John Smith",
        location: "All Access",
        status: "Active",
    },
    {
        id: "2",
        name: "Mobile Pass #M5678",
        type: "Mobile",
        assignedTo: "Sarah Johnson",
        location: "Main Entrance, Office Area",
        status: "Active",
    },
    {
        id: "3",
        name: "Key Fob #F9012",
        type: "Key Fob",
        assignedTo: "-",
        location: "Parking Gate",
        status: "Inactive",
    },
    {
        id: "4",
        name: "Key Card #A5678",
        type: "Key Card",
        assignedTo: "Emily Davis",
        location: "Limited Access",
        status: "Pending",
    },
]

// Mock data for dashboard metrics
const dashboardMetrics = {
    totalCredentials: 50,
    availableCredentials: 12,
    activeUsers: 38,
    accessPoints: 15,
}

export default function AccessControl() {
    const [selectedTab, setSelectedTab] = useState("all")

    return (
        <div className="container mx-auto px-4 py-6 lg:px-8 lg:py-8">
            <div className="flex flex-col gap-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                            Access control
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage credentials and access points
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Text className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full whitespace-nowrap">
                            {dashboardMetrics.availableCredentials} credentials available
                        </Text>
                        <Button size="md" className="inline-flex items-center">
                            <RiAddLine className="size-4 shrink-0 mr-1.5" aria-hidden="true" />
                            Assign credentials
                        </Button>
                    </div>
                </div>

                {/* Tabs */}
                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="all">All access points</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="inactive">Inactive</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                            <DataTable columns={credentialsColumns} data={mockCredentialsData} />
                        </div>
                    </TabsContent>

                    <TabsContent value="active">
                        <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                            <DataTable
                                columns={credentialsColumns}
                                data={mockCredentialsData.filter(cred => cred.status === "Active")}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="inactive">
                        <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                            <DataTable
                                columns={credentialsColumns}
                                data={mockCredentialsData.filter(cred => cred.status === "Inactive")}
                            />
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Stats Grid */}
                <Grid numItemsMd={2} numItemsLg={4} className="gap-6">
                    <Card className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary">
                                <RiKey2Line className="size-4" />
                            </div>
                            <Text>Total credentials</Text>
                        </div>
                        <Title>{dashboardMetrics.totalCredentials}</Title>
                    </Card>

                    <Card className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center size-8 rounded-full bg-green-500/10 text-green-500">
                                <RiTeamLine className="size-4" />
                            </div>
                            <Text>Active users</Text>
                        </div>
                        <Title>{dashboardMetrics.activeUsers}</Title>
                    </Card>

                    <Card className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center size-8 rounded-full bg-amber-500/10 text-amber-500">
                                <RiKey2Line className="size-4" />
                            </div>
                            <Text>Available credentials</Text>
                        </div>
                        <Title>{dashboardMetrics.availableCredentials}</Title>
                    </Card>

                    <Card className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center size-8 rounded-full bg-blue-500/10 text-blue-500">
                                <RiDoorLockLine className="size-4" />
                            </div>
                            <Text>Access points</Text>
                        </div>
                        <Title>{dashboardMetrics.accessPoints}</Title>
                    </Card>
                </Grid>
            </div>
        </div>
    )
} 