"use client"

import { cx } from "@/lib/utils"
import { useEffect, useState } from "react"
import { HeaderActions } from "./HeaderActions"
import { BuildingsDropdownDesktop } from "./SidebarBuildingsDropdown"
import { SidebarToggle } from "./SidebarToggle"

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)

    // Handle scroll events
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }

        // Initial check
        handleScroll()

        // Add event listener for scroll
        window.addEventListener('scroll', handleScroll, { passive: true })

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <header className={cx(
            "sticky top-0 z-20 flex h-16 items-center gap-4 px-4 sm:px-6 transition-colors duration-200",
            isScrolled && "bg-gray-50 dark:bg-gray-950"
        )}>
            <div className="flex flex-1 items-center gap-4">
                {/* Desktop Header (1024px and above) */}
                <div className="flex items-center gap-4">
                    <SidebarToggle />
                    <BuildingsDropdownDesktop />
                </div>
            </div>
            <HeaderActions />
        </header>
    )
} 