"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { Building, BuildingStatus, BuildingType } from "@/data/schema"
import { RiBuildingLine } from "@remixicon/react"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { useState } from "react"

const buildingsData: Building[] = [
    {
        id: "1",
        name: "125 Highland Ave",
        imageUrl: "https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "Boston, MA",
        type: "office",
        floors: 12,
        tenants: 8,
        status: "active",
        lastUpdated: "2023-12-15",
        description: "Modern office building in the heart of Boston",
        amenities: ["Parking", "Gym", "Conference Rooms", "Rooftop Terrace"],
        totalSquareFeet: 150000,
        yearBuilt: 2015
    },
    {
        id: "2",
        name: "400 Market Street",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "San Francisco, CA",
        type: "mixed-use",
        floors: 24,
        tenants: 15,
        status: "active",
        lastUpdated: "2023-11-20",
        description: "Mixed-use development with retail and office space",
        amenities: ["Retail Space", "Underground Parking", "Security", "Food Court"],
        totalSquareFeet: 280000,
        yearBuilt: 2018
    }
]

const buildingsColumns: ColumnDef<Building>[] = [
    {
        accessorKey: "name",
        header: "Building name",
        cell: ({ row }) => {
            const name = row.getValue("name") as string
            const imageUrl = row.original.imageUrl

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
                    <span className="font-medium">{name}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "location",
        header: "Location",
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
            const type = row.getValue("type") as BuildingType
            return type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")
        }
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
        cell: ({ row }) => {
            const status = row.getValue("status") as BuildingStatus

            const statusConfig = {
                "active": { label: "• Active", variant: "default" as const },
                "inactive": { label: "• Inactive", variant: "secondary" as const },
                "maintenance": { label: "• Maintenance", variant: "outline" as const },
            }

            const config = statusConfig[status]

            return (
                <Badge variant={config.variant}>
                    {config.label}
                </Badge>
            )
        },
    },
    {
        accessorKey: "lastUpdated",
        header: "Last updated",
    },
]

export default function Buildings() {
    const [data] = useState(buildingsData)

    return (
        <div className="flex flex-col gap-8 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">Buildings</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage and monitor all your buildings in one place
                    </p>
                </div>
                <Button>
                    Add building
                </Button>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex items-center gap-4 p-6">
                    <div className="flex-shrink-0">
                        <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                            <RiBuildingLine className="size-5 text-primary" />
                        </span>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-medium">
                            Do you have employees in other buildings?
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            See if they are on the HqO network. You will be able to manage all your employee workplace needs all in one place.
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <Button variant="outline">
                            Search buildings
                        </Button>
                    </div>
                </div>
            </div>

            <DataTable columns={buildingsColumns} data={data} />
        </div>
    )
} 