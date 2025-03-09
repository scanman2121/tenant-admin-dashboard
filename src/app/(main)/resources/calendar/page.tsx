"use client"

import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
    { name: "Requests", href: "/resources" },
    { name: "Calendar", href: "/resources/calendar" },
    { name: "Capacity", href: "/resources/capacity" },
] as const

export default function Calendar() {
    const pathname = usePathname()
    return (
        <div>
            <h1 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
                Resources
            </h1>
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
            <div className="mt-4">
                <h2>Calendar Content</h2>
            </div>
        </div>
    )
} 