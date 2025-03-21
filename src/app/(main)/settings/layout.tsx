"use client"

import { siteConfig } from "@/app/siteConfig"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationSettings = [
    { name: "General", href: siteConfig.baseLinks.settings.general },
    { name: "Billing & Usage", href: siteConfig.baseLinks.settings.billing },
]

export default function SettingsLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()
    return (
        <div className="container mx-auto px-4 py-6 lg:px-8 lg:py-8">
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div>
                    <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                        Settings & Setup
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your account settings and preferences
                    </p>
                </div>

                {/* Tabs */}
                <Tabs defaultValue={pathname} className="space-y-6">
                    <TabsList>
                        {navigationSettings.map((item) => (
                            <TabsTrigger
                                key={item.name}
                                value={item.href}
                                asChild
                            >
                                <Link href={item.href}>{item.name}</Link>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                {/* Content */}
                <div>{children}</div>
            </div>
        </div>
    )
} 