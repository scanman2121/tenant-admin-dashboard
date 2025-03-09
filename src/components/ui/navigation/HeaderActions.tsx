"use client"

import { Button } from "@/components/Button"
import { cx, focusRing } from "@/lib/utils"
import { RiSearchLine, RiSparkling2Line } from "@remixicon/react"
import { useEffect, useState } from "react"
import { CreatePopover } from "../create/CreatePopover"
import { NotificationsPopover } from "../notifications/NotificationsPopover"

export function HeaderActions() {
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    // Set up global keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Open search on Cmd+K or Ctrl+K
            if ((event.metaKey || event.ctrlKey) && event.key === "k") {
                event.preventDefault()
                setIsSearchOpen(true)
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    // Dynamically import the FullScreenSearch component to avoid server/client mismatch
    const [FullScreenSearch, setFullScreenSearch] = useState<any>(null)

    useEffect(() => {
        import("../search/FullScreenSearch").then((module) => {
            setFullScreenSearch(() => module.FullScreenSearch)
        })
    }, [])

    return (
        <>
            <div className="flex items-center gap-x-1">
                <Button
                    variant="ghost"
                    onClick={() => setIsSearchOpen(true)}
                    className={cx(
                        "group flex items-center rounded-md p-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 hover:dark:text-gray-50 hover:dark:bg-gray-900",
                        focusRing
                    )}
                >
                    <RiSearchLine className="size-5" aria-hidden="true" />
                    <span className="sr-only">Search</span>
                </Button>

                <NotificationsPopover />

                <Button
                    variant="ghost"
                    className={cx(
                        "group flex items-center rounded-md p-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 hover:dark:text-gray-50 hover:dark:bg-gray-900",
                        focusRing
                    )}
                >
                    <RiSparkling2Line className="size-5" aria-hidden="true" />
                    <span className="sr-only">AI Assistant</span>
                </Button>

                <CreatePopover />
            </div>

            {FullScreenSearch && (
                <FullScreenSearch
                    isOpen={isSearchOpen}
                    onClose={() => setIsSearchOpen(false)}
                />
            )}
        </>
    )
} 