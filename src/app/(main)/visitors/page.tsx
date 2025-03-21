"use client"

import { DataTable } from "@/components/ui/data-table/DataTable"
import { visitorColumns } from "@/components/ui/data-table/visitorColumns"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { visitors } from "@/data/data"
import { Button } from "@tremor/react"
import { useRouter } from "next/navigation"

const tabs = [
    { value: "", label: "All visitors" },
    { value: "expected", label: "Expected" },
    { value: "reports", label: "Reports" },
] as const

export default function Visitors() {
    const router = useRouter()

    const handleTabChange = (value: string) => {
        router.push(value ? `/visitors/${value}` : "/visitors")
    }

    return (
        <div className="container mx-auto px-4 py-6 lg:px-8 lg:py-8">
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                            Visitors
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage visitor access and invitations
                        </p>
                    </div>
                    <Button
                        variant="primary"
                        size="sm"
                        className="whitespace-nowrap"
                    >
                        Invite visitor
                    </Button>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="" onValueChange={handleTabChange}>
                    <TabsList>
                        {tabs.map((tab) => (
                            <TabsTrigger key={tab.value} value={tab.value}>
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                {/* Table */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                    <DataTable columns={visitorColumns} data={visitors} />
                </div>
            </div>
        </div>
    )
} 