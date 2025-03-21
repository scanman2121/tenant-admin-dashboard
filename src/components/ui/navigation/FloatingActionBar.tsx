"use client"

import { Button } from "@/components/Button"
import { RiSparkling2Line } from "@remixicon/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AIAssistantDrawer } from "../ai/AIAssistantDrawer"
import { FullScreenAIAssistant } from "../ai/FullScreenAIAssistant"
import { CreatePopover } from "../create/CreatePopover"

export function FloatingActionBar() {
    const router = useRouter()
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
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
                <div className="flex flex-col items-end gap-2">
                    <Button
                        variant="primary"
                        size="lg"
                        className="rounded-full p-4"
                        onClick={handleAIAssistantClick}
                    >
                        <RiSparkling2Line className="size-6" />
                        <span className="sr-only">AI Assistant</span>
                    </Button>

                    <CreatePopover />
                </div>
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