"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { roles, users } from "@/data/data"
import { RiUserAddLine } from "@remixicon/react"
import { Row, Table } from "@tanstack/react-table"
import Image from "next/image"
import { useState } from "react"

// Define columns for the employees table
const employeesColumns = [
    {
        id: "select",
        header: ({ table }: { table: Table<any> }) => (
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
        cell: ({ row }: { row: Row<any> }) => (
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
        accessorKey: "name",
        header: "Employee",
        cell: ({ row }: { row: any }) => {
            const name = row.getValue("name") as string;
            const email = row.original.email as string;
            const avatarUrl = row.original.avatarUrl as string;
            const initials = row.original.initials as string;

            return (
                <div className="flex items-center gap-3">
                    <div className="relative size-8 overflow-hidden rounded-full">
                        {avatarUrl ? (
                            <Image
                                src={avatarUrl}
                                alt={name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                {initials}
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="font-medium text-gray-900 dark:text-gray-50">
                            {name}
                        </div>
                        <div className="text-sm text-gray-500">
                            {email}
                        </div>
                    </div>
                </div>
            );
        },
        meta: {
            displayName: "Employee",
        },
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }: { row: any }) => {
            const role = row.getValue("role") as string;
            const roleLabel = roles.find(r => r.value === role)?.label || role;

            return (
                <span className="capitalize">{roleLabel}</span>
            );
        },
        meta: {
            displayName: "Role",
        },
        filterFn: "equals" as const,
        enableColumnFilter: true,
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }: { row: any }) => {
            const email = row.getValue("email") as string;
            return <span className="text-gray-600 dark:text-gray-400">{email}</span>;
        },
        meta: {
            displayName: "Email",
        },
    },
    {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }: { row: any }) => {
            const company = row.getValue("company") as string;
            return <span className="text-gray-600 dark:text-gray-400">{company}</span>;
        },
        meta: {
            displayName: "Company",
        },
        filterFn: "equals" as const,
        enableColumnFilter: true,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: any }) => {
            const status = row.getValue("status") as "active" | "inactive" | "invited"
            const variants = {
                active: "default",
                inactive: "secondary",
                invited: "outline",
            } as const
            return (
                <Badge variant={variants[status]}>
                    • {status}
                </Badge>
            );
        },
        meta: {
            displayName: "Status",
        },
        filterFn: "equals" as const,
        enableColumnFilter: true,
    },
]

export default function Employees() {
    const [data] = useState(users)
    const [selectedTab, setSelectedTab] = useState("all")

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">Team Members</h1>
                <Button size="lg" onClick={() => { }}>
                    <RiUserAddLine className="mr-1.5 h-5 w-5" />
                    Add team member
                </Button>
            </div>

            {/* Tabs */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="inactive">Inactive</TabsTrigger>
                    <TabsTrigger value="invited">Invited</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    <DataTable columns={employeesColumns} data={data} />
                </TabsContent>

                <TabsContent value="active">
                    <DataTable
                        columns={employeesColumns}
                        data={data.filter(user => user.status === "active")}
                    />
                </TabsContent>

                <TabsContent value="inactive">
                    <DataTable
                        columns={employeesColumns}
                        data={data.filter(user => user.status === "inactive")}
                    />
                </TabsContent>

                <TabsContent value="invited">
                    <DataTable
                        columns={employeesColumns}
                        data={data.filter(user => user.status === "invited")}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
} 