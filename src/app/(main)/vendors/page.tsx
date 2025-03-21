"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Vendor } from "@/data/schema"
import { RiAddLine } from "@remixicon/react"
import { Row } from "@tanstack/react-table"
import Image from "next/image"
import { useState } from "react"

const vendorsData: Vendor[] = [
    {
        id: "1",
        name: "Maintenance Pro",
        logoUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Maintenance",
        contact: "John Smith",
        email: "john@maintenancepro.com",
        phone: "617-555-1234",
        buildings: ["125 Highland Ave", "500 Boylston Street"],
        status: "active",
    },
    {
        id: "2",
        name: "Clean Team Services",
        logoUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Cleaning",
        contact: "Sarah Johnson",
        email: "sarah@cleanteam.com",
        phone: "415-555-6789",
        buildings: ["400 Market Street", "200 Congress Ave"],
        status: "active",
    },
    {
        id: "3",
        name: "Security Solutions",
        logoUrl: "https://images.unsplash.com/photo-1611095973763-414019e72400?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Security",
        contact: "Michael Brown",
        email: "michael@securitysolutions.com",
        phone: "212-555-4321",
        buildings: ["75 State Street"],
        status: "inactive",
    },
    {
        id: "4",
        name: "Green Landscaping",
        logoUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Landscaping",
        contact: "Lisa Green",
        email: "lisa@greenlandscaping.com",
        phone: "512-555-8765",
        buildings: ["200 Congress Ave", "125 Highland Ave"],
        status: "active",
    },
    {
        id: "5",
        name: "Tech Support Inc",
        logoUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "IT Services",
        contact: "David Lee",
        email: "david@techsupport.com",
        phone: "617-555-9876",
        buildings: ["500 Boylston Street", "400 Market Street"],
        status: "active",
    },
]

const vendorsColumns = [
    {
        accessorKey: "name",
        header: "Vendor name",
        cell: ({ row }: { row: Row<Vendor> }) => {
            const name = row.getValue("name") as string;
            const logoUrl = row.original.logoUrl;
            const email = row.original.email;

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
                    <div>
                        <div className="font-medium">
                            {name}
                        </div>
                        <div className="hidden text-sm text-muted-foreground md:block">
                            {email}
                        </div>
                    </div>
                </div>
            );
        },
        meta: {
            displayName: "Vendor name",
        },
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }: { row: Row<Vendor> }) => {
            const category = row.getValue("category") as string;
            return (
                <div className="hidden md:block">
                    {category}
                </div>
            );
        },
        meta: {
            displayName: "Category",
        },
    },
    {
        accessorKey: "contact",
        header: "Contact person",
        cell: ({ row }: { row: Row<Vendor> }) => {
            const contact = row.getValue("contact") as string;
            return (
                <div className="hidden lg:block">
                    {contact}
                </div>
            );
        },
        meta: {
            displayName: "Contact person",
        },
    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }: { row: Row<Vendor> }) => {
            const phone = row.getValue("phone") as string;
            return (
                <div className="hidden lg:block text-muted-foreground">
                    {phone}
                </div>
            );
        },
        meta: {
            displayName: "Phone",
        },
    },
    {
        accessorKey: "buildings",
        header: "Buildings",
        cell: ({ row }: { row: Row<Vendor> }) => {
            const buildings = row.getValue("buildings") as string[]
            return (
                <div className="hidden xl:block text-muted-foreground">
                    {buildings.map((building, index) => (
                        <span key={index} className="inline-block mr-1 last:mr-0">
                            {building}{index < buildings.length - 1 ? ", " : ""}
                        </span>
                    ))}
                </div>
            )
        },
        meta: {
            displayName: "Buildings",
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: Row<Vendor> }) => {
            const status = row.getValue("status") as "active" | "inactive"
            const variants = {
                active: "default",
                inactive: "secondary",
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
]

const tabs = [
    {
        value: "all",
        label: "All vendors",
    },
    {
        value: "active",
        label: "Active",
    },
    {
        value: "inactive",
        label: "Inactive",
    },
]

export default function Vendors() {
    const [data] = useState(vendorsData)
    const [selectedTab, setSelectedTab] = useState("all")

    return (
        <div className="flex flex-col gap-8 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Vendors</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your vendors and service providers
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline">
                        Browse marketplace
                    </Button>
                    <Button>
                        <RiAddLine className="mr-1.5 h-5 w-5" />
                        Add vendor
                    </Button>
                </div>
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
                    <DataTable columns={vendorsColumns} data={data} />
                </TabsContent>

                <TabsContent value="active" className="mt-4">
                    <DataTable
                        columns={vendorsColumns}
                        data={data.filter(vendor => vendor.status === "active")}
                    />
                </TabsContent>

                <TabsContent value="inactive" className="mt-4">
                    <DataTable
                        columns={vendorsColumns}
                        data={data.filter(vendor => vendor.status === "inactive")}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
} 