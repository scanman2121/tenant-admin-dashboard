"use client"

import { Button } from "@/components/Button"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { RiAddLine } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

// Define tabs for the Buildings page
const tabs = [
    { name: "All Buildings", href: "/buildings" },
    { name: "Active", href: "/buildings/active" },
    { name: "Inactive", href: "/buildings/inactive" },
] as const

// Mock data for buildings
const allBuildingsData = [
    {
        id: "1",
        name: "125 Highland Ave",
        location: "Boston, MA",
        type: "Office",
        floors: 12,
        tenants: 8,
        status: "Active",
        lastUpdated: "2023-12-15",
    },
    {
        id: "2",
        name: "400 Market Street",
        location: "San Francisco, CA",
        type: "Mixed Use",
        floors: 24,
        tenants: 15,
        status: "Active",
        lastUpdated: "2023-11-20",
    },
    {
        id: "3",
        name: "75 State Street",
        location: "New York, NY",
        type: "Retail",
        floors: 3,
        tenants: 5,
        status: "Inactive",
        lastUpdated: "2023-10-05",
    },
    {
        id: "4",
        name: "200 Congress Ave",
        location: "Austin, TX",
        type: "Office",
        floors: 18,
        tenants: 12,
        status: "Active",
        lastUpdated: "2024-01-10",
    },
    {
        id: "5",
        name: "500 Boylston Street",
        location: "Boston, MA",
        type: "Office",
        floors: 15,
        tenants: 10,
        status: "Active",
        lastUpdated: "2024-02-01",
    },
]

// Define columns for the buildings table
const buildingsColumns = [
    {
        accessorKey: "name",
        header: "Building Name",
    },
    {
        accessorKey: "location",
        header: "Location",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "floors",
        header: "Floors",
    },
    {
        accessorKey: "tenants",
        header: "Tenants",
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
    {
        accessorKey: "lastUpdated",
        header: "Last Updated",
    },
]

export default function BuildingsInactive() {
    const pathname = usePathname()
    const [data, setData] = useState<typeof allBuildingsData>([])

    // Filter for inactive buildings only
    useEffect(() => {
        const inactiveBuildings = allBuildingsData.filter(building => building.status === "Inactive")
        setData(inactiveBuildings)
    }, [])

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                    Buildings
                </h1>
                <Button>
                    <RiAddLine className="size-4 shrink-0 mr-1.5" aria-hidden="true" />
                    Add Building
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
                <DataTable columns={buildingsColumns} data={data} />
            </div>
        </div>
    )
} 