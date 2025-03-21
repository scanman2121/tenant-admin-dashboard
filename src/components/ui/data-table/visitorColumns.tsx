"use client"

import { Badge } from "@/components/ui/badge"
import { Visitor, VisitorStatus } from "@/data/schema"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { DataTableRowActions } from "./DataTableRowActions"

export const visitorColumns: ColumnDef<Visitor>[] = [
    {
        accessorKey: "checkInTime",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Check-in time" />
        ),
        cell: ({ row }) => {
            const time = row.getValue("checkInTime")
            return time || "-"
        }
    },
    {
        accessorKey: "visitorName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Visitor name" />
        ),
    },
    {
        accessorKey: "company",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Company" />
        ),
    },
    {
        accessorKey: "hostName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Host" />
        ),
    },
    {
        accessorKey: "purpose",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Purpose" />
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = row.getValue("status") as VisitorStatus

            const statusConfig = {
                "checked-in": { label: "• Checked in", variant: "default" as const },
                "checked-out": { label: "• Checked out", variant: "secondary" as const },
                "expected": { label: "• Expected", variant: "outline" as const },
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
        accessorKey: "checkOutTime",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Check-out time" />
        ),
        cell: ({ row }) => {
            const time = row.getValue("checkOutTime")
            return time || "-"
        }
    },
    {
        accessorKey: "badgeNumber",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Badge #" />
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => {
            const email = row.getValue("email")
            return email || "-"
        }
    },
    {
        accessorKey: "phone",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Phone" />
        ),
        cell: ({ row }) => {
            const phone = row.getValue("phone")
            return phone || "-"
        }
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
] 