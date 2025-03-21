"use client"

import { Button } from "@/components/Button"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { ConnectIdPModal } from "@/components/ui/idp/ConnectIdPModal"
import { ModalAddUser } from "@/components/ui/settings/ModalAddUser"
import { RiAddLine } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const tabs = [
    { name: "All employees", href: "/employees" },
    { name: "IdP groups", href: "/employees/idp-groups" },
] as const

export default function EmployeesLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()
    const [isConnectIdPModalOpen, setIsConnectIdPModalOpen] = useState(false)

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">Employees</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage your employees and their permissions</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        className="border border-primary text-primary hover:bg-gray-50/50"
                        onClick={() => setIsConnectIdPModalOpen(true)}
                    >
                        Connect IdP
                    </Button>
                    <ModalAddUser>
                        <Button>
                            <RiAddLine className="size-4 shrink-0 mr-1.5" aria-hidden="true" />
                            Add employees
                        </Button>
                    </ModalAddUser>
                </div>
            </div>
            <TabNavigation>
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
            <div className="pt-4">{children}</div>
            <ConnectIdPModal
                isOpen={isConnectIdPModalOpen}
                onClose={() => setIsConnectIdPModalOpen(false)}
            />
        </div>
    )
} 