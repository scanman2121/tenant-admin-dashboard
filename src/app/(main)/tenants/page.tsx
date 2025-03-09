"use client"

import { Button } from "@/components/Button"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { RiAddLine } from "@remixicon/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Tenants page
const tabs = [
    { name: "All Tenants", href: "/tenants" },
    { name: "Active", href: "/tenants/active" },
    { name: "Inactive", href: "/tenants/inactive" },
] as const

// Mock data for tenants
const tenantsData = [
    {
        id: "1",
        name: "Acme Corporation",
        logoUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        building: "125 Highland Ave",
        industry: "Technology",
        employees: 120,
        leaseStart: "2022-01-15",
        leaseEnd: "2025-01-14",
        status: "Active",
    },
    {
        id: "2",
        name: "Global Enterprises",
        logoUrl: "https://images.unsplash.com/photo-1611095973763-414019e72400?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        building: "400 Market Street",
        industry: "Finance",
        employees: 85,
        leaseStart: "2021-06-01",
        leaseEnd: "2024-05-31",
        status: "Active",
    },
    {
        id: "3",
        name: "Retail Solutions",
        logoUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        building: "75 State Street",
        industry: "Retail",
        employees: 45,
        leaseStart: "2020-03-15",
        leaseEnd: "2023-03-14",
        status: "Inactive",
    },
    {
        id: "4",
        name: "Tech Innovators",
        logoUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        building: "200 Congress Ave",
        industry: "Technology",
        employees: 150,
        leaseStart: "2023-02-01",
        leaseEnd: "2026-01-31",
        status: "Active",
    },
    {
        id: "5",
        name: "Financial Services Inc",
        logoUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        building: "500 Boylston Street",
        industry: "Finance",
        employees: 95,
        leaseStart: "2022-09-01",
        leaseEnd: "2025-08-31",
        status: "Active",
    },
]

// Define columns for the tenants table
const tenantsColumns = [
    {
        accessorKey: "name",
        header: "Tenant Name",
        cell: ({ row }: { row: any }) => {
            const name = row.getValue("name") as string;
            const logoUrl = row.original.logoUrl as string;

            return (
                <div className="flex items-center gap-3">
                    <div className="relative size-8 overflow-hidden rounded-full">
                        <Image
                            src={logoUrl}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span>{name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "building",
        header: "Building",
    },
    {
        accessorKey: "industry",
        header: "Industry",
    },
    {
        accessorKey: "employees",
        header: "Employees",
    },
    {
        accessorKey: "leaseStart",
        header: "Lease Start",
    },
    {
        accessorKey: "leaseEnd",
        header: "Lease End",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: any }) => {
            const status = row.getValue("status") as string
            return (
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status === "Active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }`}>
                    {status}
                </span>
            )
        },
    },
]

export default function Tenants() {
    const pathname = usePathname()
    const [data] = useState(tenantsData)

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                    Tenants
                </h1>
                <Button>
                    <RiAddLine className="size-4 shrink-0 mr-1.5" aria-hidden="true" />
                    Add Tenant
                </Button>
            </div>

            <TabNavigation className="mt-4">
                {tabs.map((tab) => (
                    <TabNavigationLink
                        key={tab.name}
                        asChild
                        active={pathname === tab.href}
                    >
                        <Link href={tab.href}>{tab.name}</Link>
                    </TabNavigationLink>
                ))}
            </TabNavigation>

            <div className="pt-6">
                <DataTable columns={tenantsColumns} data={data} />
            </div>
        </div>
    )
} 