"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { roles } from "@/data/data"
import { User } from "@/data/schema"
import { RiUserAddLine } from "@remixicon/react"
import { Row, Table } from "@tanstack/react-table"
import Image from "next/image"
import { useState } from "react"

const employeesColumns = [
    {
        id: "select",
        header: ({ table }: { table: Table<User> }) => (
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
        cell: ({ row }: { row: Row<User> }) => (
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
        header: "Employee name",
        cell: ({ row }: { row: Row<User> }) => {
            const name = row.getValue("name") as string;
            const email = row.original.email;
            const avatarUrl = row.original.avatarUrl;
            const initials = row.original.initials;

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
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                                {initials}
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="font-medium">
                            {name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {email}
                        </div>
                    </div>
                </div>
            );
        },
        meta: {
            displayName: "Employee name",
        },
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }: { row: Row<User> }) => {
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
        accessorKey: "company",
        header: "Company",
        cell: ({ row }: { row: Row<User> }) => {
            const company = row.getValue("company") as string;
            return <span className="text-muted-foreground">{company}</span>;
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
        cell: ({ row }: { row: Row<User> }) => {
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

const tabs = [
    {
        value: "all",
        label: "All team members",
    },
    {
        value: "active",
        label: "Active",
    },
    {
        value: "inactive",
        label: "Inactive",
    },
    {
        value: "invited",
        label: "Invited",
    },
]

const mockUsers: User[] = [
    {
        id: "1",
        name: "John Smith",
        email: "john.smith@example.com",
        role: "admin",
        company: "Acme Corp",
        status: "active",
        initials: "JS"
    },
    {
        id: "2",
        name: "Emma Davis",
        email: "emma.davis@example.com",
        role: "user",
        company: "Tech Solutions",
        status: "invited",
        initials: "ED"
    },
    {
        id: "3",
        name: "Michael Brown",
        email: "michael.brown@example.com",
        role: "manager",
        company: "Global Services",
        status: "inactive",
        initials: "MB"
    }
]

export default function Employees() {
    const [data] = useState(mockUsers)
    const [selectedTab, setSelectedTab] = useState("all")

    return (
        <div className="flex flex-col gap-8 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Team Members</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your team members and their access
                    </p>
                </div>
                <Button>
                    <RiUserAddLine className="mr-1.5 h-5 w-5" />
                    Add team member
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
                    <DataTable columns={employeesColumns} data={data} />
                </TabsContent>

                <TabsContent value="active" className="mt-4">
                    <DataTable
                        columns={employeesColumns}
                        data={data.filter(user => user.status === "active")}
                    />
                </TabsContent>

                <TabsContent value="inactive" className="mt-4">
                    <DataTable
                        columns={employeesColumns}
                        data={data.filter(user => user.status === "inactive")}
                    />
                </TabsContent>

                <TabsContent value="invited" className="mt-4">
                    <DataTable
                        columns={employeesColumns}
                        data={data.filter(user => user.status === "invited")}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
} 