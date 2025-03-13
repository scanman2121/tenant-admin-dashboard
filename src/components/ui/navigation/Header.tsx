"use client"

import { useEffect, useState } from "react"
import { FloatingActionBar } from "./FloatingActionBar"
import { HeaderActions } from "./HeaderActions"
import { BuildingsDropdownDesktop } from "./SidebarBuildingsDropdown"
import { SidebarToggle } from "./SidebarToggle"

export function Header() {
    const [isMobile, setIsMobile] = useState(false)

    // Check if screen is mobile (under 1024px)
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1024)
        }

        // Initial check
        checkScreenSize()

        // Add event listener for window resize
        window.addEventListener('resize', checkScreenSize)

        // Cleanup
        return () => {
            window.removeEventListener('resize', checkScreenSize)
        }
    }, [])

    return (
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-950 sm:px-6">
            <div className="flex flex-1 items-center gap-4">
                {/* Desktop Header (1024px and above) */}
                <div className="flex items-center gap-4">
                    <SidebarToggle />
                    <BuildingsDropdownDesktop />
                </div>
            </div>
            <HeaderActions />

            {/* Floating Action Bar for Mobile */}
            {isMobile && <FloatingActionBar />}
        </header>
    )
} 