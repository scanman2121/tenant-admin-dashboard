"use client"

import { Button } from "@/components/Button"
import { RiNotification3Line, RiSparkling2Line } from "@remixicon/react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function HeaderActions() {
    const router = useRouter()
    const { theme, setTheme } = useTheme()
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

    return (
        <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button
                variant="ghost"
                size="sm"
                className="relative"
                onClick={() => setIsNotificationsOpen(true)}
            >
                <RiNotification3Line className="size-5" aria-hidden="true" />
                <span className="absolute right-1 top-1 size-2 rounded-full bg-red-500" />
            </Button>

            {/* Theme toggle */}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
                <RiSparkling2Line className="size-5" aria-hidden="true" />
            </Button>
        </div>
    )
} 