"use client"

import { siteConfig } from "@/app/siteConfig"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationSettings = [
    { name: "General Settings", href: siteConfig.baseLinks.settings.general },
    { name: "Billing & Usage", href: siteConfig.baseLinks.settings.billing },
    { name: "User Management", href: siteConfig.baseLinks.settings.users },
]

export default function SettingsLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()

    return (
        <div className="flex flex-col gap-8 p-8">
            <div>
                <h1 className="text-3xl font-semibold tracking-tight">Settings & Setup</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Manage your account settings and preferences
                </p>
            </div>

            <Separator />

            <Tabs defaultValue={pathname} className="space-y-6">
                <TabsList className="w-full justify-start">
                    {navigationSettings.map((item) => (
                        <TabsTrigger
                            key={item.name}
                            value={item.href}
                            asChild
                            className="min-w-[120px]"
                        >
                            <Link href={item.href}>{item.name}</Link>
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>

            <div className="space-y-6">
                {children}
            </div>
        </div>
    )
} 