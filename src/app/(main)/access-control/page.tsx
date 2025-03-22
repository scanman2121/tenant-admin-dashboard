"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader"
import { RiAddLine, RiDoorLockLine, RiKey2Line, RiTeamLine } from "@remixicon/react"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { Card, Grid, Text, Title } from "@tremor/react"

interface AccessControl {
    user: string
    userStatus: string
    lastScan: string
    activationDate: string
    credentialStatus: string
    credential: string
}

// Mock data for access control
const mockAccessData: AccessControl[] = [
    {
        user: "John Doe",
        userStatus: "Active",
        lastScan: "2024-03-15 10:30 AM",
        activationDate: "2024-01-01",
        credentialStatus: "Activated",
        credential: "CARD-001",
    },
    {
        user: "Jane Smith",
        userStatus: "Deactivated",
        lastScan: "2024-03-14 2:15 PM",
        activationDate: "2024-01-02",
        credentialStatus: "Deactivated",
        credential: "CARD-002",
    },
    {
        user: "Bob Johnson",
        userStatus: "Active",
        lastScan: "2024-03-15 9:45 AM",
        activationDate: "2024-01-03",
        credentialStatus: "Activated",
        credential: "CARD-003",
    },
]

const getUserStatusBadge = (status: string) => {
    switch (status) {
        case "Active":
            return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
        case "Deactivated":
            return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Deactivated</Badge>
        case "Deleted":
            return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Deleted</Badge>
        case "Invited":
            return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Invited</Badge>
        default:
            return <Badge variant="outline">{status}</Badge>
    }
}

const getCredentialStatusBadge = (status: string) => {
    switch (status) {
        case "Activated":
            return <span className="text-gray-700">Activated</span>
        case "Deactivated":
            return <span className="text-gray-700">Deactivated</span>
        case "Revoked":
            return <span className="text-red-600">Revoked</span>
        case "Generate":
            return <span className="text-blue-600 cursor-pointer">Generate</span>
        case "Approve":
            return <span className="text-gray-700">Approve</span>
        case "Invited":
            return <span className="text-gray-700">Invited</span>
        default:
            return <span className="text-gray-700">{status}</span>
    }
}

// Filter options
const userStatusOptions = [
    { label: "Active", value: "Active" },
    { label: "Deactivated", value: "Deactivated" },
    { label: "Deleted", value: "Deleted" },
    { label: "Invited", value: "Invited" },
]

const credentialStatusOptions = [
    { label: "Activated", value: "Activated" },
    { label: "Deactivated", value: "Deactivated" },
    { label: "Revoked", value: "Revoked" },
    { label: "Generate", value: "Generate" },
    { label: "Approve", value: "Approve" },
    { label: "Invited", value: "Invited" },
]

const columnHelper = createColumnHelper<AccessControl>()

const accessControlColumns = [
    columnHelper.accessor("user", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="User" />
        ),
        enableSorting: true,
        enableColumnFilter: true,
        filterFn: "includesString" as const,
        meta: {
            className: "text-left",
            displayName: "User",
        },
    }),
    columnHelper.accessor("userStatus", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="User status" />
        ),
        enableSorting: true,
        enableColumnFilter: true,
        filterFn: "equals" as const,
        meta: {
            className: "text-left",
            displayName: "User Status",
            filterOptions: userStatusOptions,
        },
        cell: ({ row }) => getUserStatusBadge(row.getValue("userStatus")),
    }),
    columnHelper.accessor("lastScan", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Last scan" />
        ),
        enableSorting: true,
        enableColumnFilter: true,
        filterFn: "includesString" as const,
        meta: {
            className: "text-left",
            displayName: "Last Scan",
        },
    }),
    columnHelper.accessor("activationDate", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Activation date" />
        ),
        enableSorting: true,
        enableColumnFilter: true,
        filterFn: "includesString" as const,
        meta: {
            className: "text-left",
            displayName: "Activation Date",
        },
    }),
    columnHelper.accessor("credentialStatus", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Credential status" />
        ),
        enableSorting: true,
        enableColumnFilter: true,
        filterFn: "equals" as const,
        meta: {
            className: "text-left",
            displayName: "Credential Status",
            filterOptions: credentialStatusOptions,
        },
        cell: ({ row }) => getCredentialStatusBadge(row.getValue("credentialStatus")),
    }),
    columnHelper.accessor("credential", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Credential" />
        ),
        enableSorting: true,
        enableColumnFilter: true,
        filterFn: "includesString" as const,
        meta: {
            className: "text-left",
            displayName: "Credential",
        },
    }),
] as ColumnDef<AccessControl>[]

export default function AccessControl() {
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
                            {mockAccessData.filter(item => item.credential).length} credentials available
                        </Text>
                        <Button size="md" className="inline-flex items-center">
                            <RiAddLine className="size-4 shrink-0 mr-1.5" aria-hidden="true" />
                            Assign credentials
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <Grid numItemsMd={2} numItemsLg={4} className="gap-6">
                    <Card className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary">
                                <RiKey2Line className="size-4" />
                            </div>
                            <Text>Total credentials</Text>
                        </div>
                        <Title>{mockAccessData.filter(item => item.credential).length}</Title>
                    </Card>

                    <Card className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center size-8 rounded-full bg-green-500/10 text-green-500">
                                <RiTeamLine className="size-4" />
                            </div>
                            <Text>Active users</Text>
                        </div>
                        <Title>{mockAccessData.filter(item => item.userStatus === "Active").length}</Title>
                    </Card>

                    <Card className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center size-8 rounded-full bg-amber-500/10 text-amber-500">
                                <RiKey2Line className="size-4" />
                            </div>
                            <Text>Available credentials</Text>
                        </div>
                        <Title>{mockAccessData.filter(item => item.credential).length}</Title>
                    </Card>

                    <Card className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center size-8 rounded-full bg-blue-500/10 text-blue-500">
                                <RiDoorLockLine className="size-4" />
                            </div>
                            <Text>Access points</Text>
                        </div>
                        <Title>{mockAccessData.length}</Title>
                    </Card>
                </Grid>

                {/* Table */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                    <DataTable
                        columns={accessControlColumns}
                        data={mockAccessData}
                    />
                </div>
            </div>
        </div>
    )
} 