"use client"

import { Button } from "@/components/Button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RiMoonLine, RiNotification3Line, RiSparkling2Line, RiSunLine } from "@remixicon/react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { AIAssistantDrawer } from "../ai/AIAssistantDrawer"
import { FullScreenAIAssistant } from "../ai/FullScreenAIAssistant"

const mockNotifications = [
    {
        id: 1,
        title: "New message",
        description: "You have a new message from John Doe",
        time: "2 min ago"
    },
    {
        id: 2,
        title: "System update",
        description: "System maintenance scheduled for tonight",
        time: "1 hour ago"
    },
    {
        id: 3,
        title: "Task completed",
        description: "Project X has been completed",
        time: "2 hours ago"
    }
]

export function HeaderActions() {
    const { theme, setTheme } = useTheme()
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
    const [isAIDrawerOpen, setIsAIDrawerOpen] = useState(false)
    const [isFullScreenAIOpen, setIsFullScreenAIOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    // Check if we're on mobile
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 1024) // lg breakpoint
        }

        // Initial check
        checkIfMobile()

        // Add event listener for window resize
        window.addEventListener('resize', checkIfMobile)

        // Cleanup
        return () => window.removeEventListener('resize', checkIfMobile)
    }, [])

    // Handle AI assistant button click
    const handleAIAssistantClick = () => {
        if (isMobile) {
            setIsFullScreenAIOpen(true)
        } else {
            setIsAIDrawerOpen(true)
        }
    }

    return (
        <>
            <div className="flex items-center gap-2">
                {/* AI Assistant */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleAIAssistantClick}
                >
                    <RiSparkling2Line className="size-5" aria-hidden="true" />
                    <span className="sr-only">AI Assistant</span>
                </Button>

                {/* Notifications */}
                <DropdownMenu open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="relative"
                        >
                            <RiNotification3Line className="size-5" aria-hidden="true" />
                            <span className="absolute right-1 top-1 size-2 rounded-full bg-red-500" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
                            {mockNotifications.map((notification) => (
                                <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-3">
                                    <div className="font-medium">{notification.title}</div>
                                    <div className="text-sm text-gray-500">{notification.description}</div>
                                    <div className="text-xs text-gray-400">{notification.time}</div>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="justify-center font-medium text-primary">
                            View all notifications
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Theme toggle */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                    {theme === "dark" ? (
                        <RiSunLine className="size-5" aria-hidden="true" />
                    ) : (
                        <RiMoonLine className="size-5" aria-hidden="true" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </div>

            {/* Desktop AI Drawer */}
            <AIAssistantDrawer
                isOpen={isAIDrawerOpen}
                onClose={() => setIsAIDrawerOpen(false)}
            />

            {/* Mobile Full Screen Components */}
            <FullScreenAIAssistant
                isOpen={isFullScreenAIOpen}
                onClose={() => setIsFullScreenAIOpen(false)}
            />
        </>
    )
} 