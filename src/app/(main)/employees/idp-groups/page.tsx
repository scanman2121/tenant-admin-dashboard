"use client"

import { Button } from "@/components/Button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { ConnectIdPModal } from "@/components/ui/idp/ConnectIdPModal"
import { RiUserSettingsLine } from "@remixicon/react"
import { useState } from "react"

interface IdPGroup {
    id: string
    name: string
    members: number
    source: string
    lastSync: string
}

// Define columns for the IdP groups table
const columns = [
    {
        id: "name",
        header: "Group name",
        accessorKey: "name",
    },
    {
        id: "members",
        header: "Members",
        accessorKey: "members",
    },
    {
        id: "source",
        header: "Source",
        accessorKey: "source",
    },
    {
        id: "lastSync",
        header: "Last sync",
        accessorKey: "lastSync",
    }
]

export default function IdPGroupsPage() {
    const [isConnectIdPModalOpen, setIsConnectIdPModalOpen] = useState(false)
    const [groups, setGroups] = useState<IdPGroup[]>([])

    // This would be replaced with real data fetching logic
    const hasConnectedIdP = groups.length > 0

    // Transform the mock groups data into our table format
    const handleGroupsSelected = () => {
        // In a real app, this would come from your backend after syncing
        const mockSyncedGroups: IdPGroup[] = [
            {
                id: '1',
                name: 'Engineering',
                members: 45,
                source: 'Okta',
                lastSync: new Date().toLocaleString()
            },
            {
                id: '2',
                name: 'Sales',
                members: 32,
                source: 'Okta',
                lastSync: new Date().toLocaleString()
            },
            {
                id: '3',
                name: 'Marketing',
                members: 28,
                source: 'Okta',
                lastSync: new Date().toLocaleString()
            },
            {
                id: '4',
                name: 'HR',
                members: 12,
                source: 'Okta',
                lastSync: new Date().toLocaleString()
            },
            {
                id: '5',
                name: 'Finance',
                members: 18,
                source: 'Okta',
                lastSync: new Date().toLocaleString()
            }
        ]
        setGroups(mockSyncedGroups)
    }

    return (
        <div className="w-full">
            {!hasConnectedIdP ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-700 px-6 py-10 text-center">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                        <RiUserSettingsLine className="size-6 text-gray-600 dark:text-gray-400" />
                    </div>
                    <h3 className="mt-4 text-sm font-medium text-gray-900 dark:text-gray-50">
                        No IdP groups connected
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                        Connect your Identity Provider to automatically sync and manage employee groups.
                    </p>
                    <Button
                        className="mt-4"
                        onClick={() => setIsConnectIdPModalOpen(true)}
                    >
                        Connect IdP
                    </Button>
                </div>
            ) : (
                <DataTable
                    data={groups}
                    columns={columns}
                />
            )}

            <ConnectIdPModal
                isOpen={isConnectIdPModalOpen}
                onClose={() => {
                    setIsConnectIdPModalOpen(false)
                    handleGroupsSelected() // Simulate groups being synced after modal closes
                }}
            />
        </div>
    )
} 