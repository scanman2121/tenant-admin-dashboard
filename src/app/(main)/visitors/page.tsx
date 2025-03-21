"use client"

import { Button } from "@/components/Button"
import { PageHeader } from "@/components/PageHeader"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { visitorColumns } from "@/components/ui/data-table/visitorColumns"
import { visitors } from "@/data/data"
import { RiAddLine } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
    { name: "All visitors", href: "/visitors" },
    { name: "Expected", href: "/visitors/expected" },
    { name: "Reports", href: "/visitors/reports" },
] as const

export default function Visitors() {
    const pathname = usePathname()
    return (
        <div className="space-y-6">
            <PageHeader
                title="Visitors"
                customButtons={
                    <Button className="flex items-center gap-2">
                        <RiAddLine className="size-5" />
                        Invite visitor
                    </Button>
                }
            />
            <TabNavigation className="px-4 sm:px-6 lg:px-10">
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
            <div className="px-4 sm:px-6 lg:px-10">
                <DataTable data={visitors} columns={visitorColumns} />
            </div>
        </div>
    )
} 