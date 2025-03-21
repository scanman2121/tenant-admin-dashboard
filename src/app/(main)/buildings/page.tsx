"use client"

import { Button } from "@/components/Button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { RiBuildingLine } from "@remixicon/react"
import Image from "next/image"
import { useState } from "react"

// Mock data for buildings
const buildingsData = [
    {
        id: "1",
        name: "125 Highland Ave",
        imageUrl: "https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "San Francisco, CA",
        type: "Mixed Use",
        floors: 24,
        tenants: 15,
        status: "Active",
        lastUpdated: "2023-11-20",
    }
]

// Define columns for the buildings table
const buildingsColumns = [
    {
        accessorKey: "name",
        header: "Building Name",
        cell: ({ row }: { row: any }) => {
            const name = row.getValue("name") as string;
            const imageUrl = row.original.imageUrl as string;

            return (
                <div className="flex items-center gap-3">
                    <div className="relative size-8 overflow-hidden rounded-md">
                        <Image
                            src={imageUrl}
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

export default function Buildings() {
    const [data] = useState(buildingsData)

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between">
                <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                    Buildings
                </h1>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                        <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary-400/10">
                            <RiBuildingLine className="size-5 text-primary dark:text-primary-400" />
                        </span>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-base font-medium text-gray-900 dark:text-gray-50">
                            Do you have employees in other buildings?
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            See if they are on the HqO network. You will be able to manage all your employee workplace needs all in one place.
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <Button variant="secondary">
                            Search buildings
                        </Button>
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <DataTable columns={buildingsColumns} data={data} />
            </div>
        </div >
    )
} 