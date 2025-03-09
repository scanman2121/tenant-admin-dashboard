"use client"

import { DataTable } from "@/components/ui/data-table/DataTable"
import { roles, users } from "@/data/data"
import Image from "next/image"
import { useState } from "react"

// Define columns for the users table
const usersColumns = [
    {
        accessorKey: "name",
        header: "User",
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
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: () => {
            return (
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Active
                </span>
            );
        },
    },
]

export default function Users() {
    const [data] = useState(users)
    return <DataTable columns={usersColumns} data={data} />
} 