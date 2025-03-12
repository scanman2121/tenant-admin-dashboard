"use client"

import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/Popover"
import { cx, focusRing } from "@/lib/utils"
import Link from "next/link"
import React, { useState } from "react"

interface SidebarPopoverProps {
    icon: React.ReactElement
    title: string
    items: readonly {
        readonly name: string
        readonly href: string
    }[]
    isActive: (href: string) => boolean
    isInSection: boolean
}

export function SidebarPopover({ icon, title, items, isActive, isInSection }: SidebarPopoverProps) {
    const [isOpen, setIsOpen] = useState(false)

    // Check if any item in this section is active
    const hasActiveItem = items.some(item => isActive(item.href))

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <button
                    className={cx(
                        "flex w-full items-center justify-center p-2 rounded-md text-[13px] transition",
                        isInSection || hasActiveItem
                            ? "bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary-400 shadow-sm"
                            : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900",
                        focusRing,
                    )}
                    aria-label={title}
                >
                    {React.cloneElement(icon, {
                        className: cx(
                            "size-4 shrink-0",
                            isInSection || hasActiveItem
                                ? "text-primary dark:text-primary-400"
                                : "text-[#696E72] group-hover:text-gray-500 dark:group-hover:text-gray-400"
                        )
                    })}
                </button>
            </PopoverTrigger>
            <PopoverContent
                side="right"
                sideOffset={8}
                align="start"
                className="p-2 min-w-48 max-h-[calc(100vh-100px)] overflow-y-auto"
            >
                <div className="flex flex-col space-y-1">
                    <div className="px-3 py-2 text-[13px] font-medium text-[#2D3338] flex items-center gap-x-2">
                        {React.cloneElement(icon, {
                            className: "size-4 shrink-0 text-[#2D3338]"
                        })}
                        {title}
                    </div>
                    {items.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cx(
                                "block rounded-md py-2 px-3 text-[13px] transition",
                                isActive(item.href)
                                    ? "bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary-400"
                                    : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900",
                                focusRing,
                            )}
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
} 