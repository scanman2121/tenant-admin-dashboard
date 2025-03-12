"use client"

import { SidebarContext } from "@/app/(main)/layout"
import { Button } from "@/components/Button"
import { cx, focusRing } from "@/lib/utils"
import { RiMenuFoldLine, RiMenuUnfoldLine } from "@remixicon/react"
import { useContext } from "react"

export function SidebarToggle() {
    const { isCollapsed, toggleCollapsed } = useContext(SidebarContext)

    return (
        <Button
            variant="ghost"
            onClick={toggleCollapsed}
            className={cx(
                "flex items-center justify-center rounded-md p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 hover:dark:text-gray-50 hover:dark:bg-gray-900",
                focusRing,
                "ml-2"
            )}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
            {isCollapsed ? (
                <RiMenuUnfoldLine className="size-5" aria-hidden="true" />
            ) : (
                <RiMenuFoldLine className="size-5" aria-hidden="true" />
            )}
        </Button>
    )
} 