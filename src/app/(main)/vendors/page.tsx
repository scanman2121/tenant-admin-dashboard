"use client"

import { Button } from "@/components/Button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { RiAddLine } from "@remixicon/react"
import Image from "next/image"
import { useState } from "react"

// Mock data for vendors
const vendorsData = [
    {
        id: "1",
        name: "Maintenance Pro",
        logoUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Maintenance",
        contact: "John Smith",
        email: "john@maintenancepro.com",
        phone: "617-555-1234",
        buildings: ["125 Highland Ave", "500 Boylston Street"],
        status: "Active",
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
        status: "Active",
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
        status: "Inactive",
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
        status: "Active",
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
        status: "Active",
    },
]

// Define columns for the vendors table
const vendorsColumns = [
    {
        accessorKey: "name",
        header: "Vendor name",
        cell: ({ row }: { row: any }) => {
            const name = row.getValue("name") as string;
            const logoUrl = row.original.logoUrl as string;
            const email = row.original.email as string;

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
                        <div className="font-medium text-gray-900 dark:text-gray-50">
                            {name}
                        </div>
                        <div className="hidden text-sm text-gray-500 md:block">
                            {email}
                        </div>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }: { row: any }) => {
            const category = row.getValue("category") as string;
            return (
                <div className="hidden md:block">
                    {category}
                </div>
            );
        },
    },
    {
        accessorKey: "contact",
        header: "Contact person",
        cell: ({ row }: { row: any }) => {
            const contact = row.getValue("contact") as string;
            return (
                <div className="hidden lg:block">
                    {contact}
                </div>
            );
        },
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }: { row: any }) => {
            const email = row.getValue("email") as string;
            return (
                <div className="hidden md:block">
                    {email}
                </div>
            );
        },
    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }: { row: any }) => {
            const phone = row.getValue("phone") as string;
            return (
                <div className="hidden lg:block">
                    {phone}
                </div>
            );
        },
    },
    {
        accessorKey: "buildings",
        header: "Buildings",
        cell: ({ row }: { row: any }) => {
            const buildings = row.getValue("buildings") as string[]
            return (
                <div className="hidden xl:block">
                    {buildings.map((building, index) => (
                        <span key={index} className="inline-block mr-1 last:mr-0">
                            {building}{index < buildings.length - 1 ? ", " : ""}
                        </span>
                    ))}
                </div>
            )
        },
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
                    • {status}
                </span>
            )
        },
    },
]

export default function Vendors() {
    const [data] = useState(vendorsData)

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                        Vendors
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">Manage your vendors and service providers</p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                    <Button variant="ghost" className="w-full border border-primary text-primary hover:bg-gray-50 hover:bg-opacity-30 sm:w-auto">
                        Browse marketplace
                    </Button>
                    <Button className="w-full sm:w-auto">
                        <RiAddLine className="size-4 shrink-0 mr-1.5" aria-hidden="true" />
                        Add vendor
                    </Button>
                </div>
            </div>

            <div className="pt-4">
                <DataTable columns={vendorsColumns} data={data} />
            </div>
        </div>
    )
} 