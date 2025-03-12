"use client"

import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/Popover"
import { cx, focusRing } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"

interface SidebarPopoverProps {
    icon: React.ReactNode
    title: string
    items: readonly {
        readonly name: string
        readonly href: string
    }[]
    isActive: (href: string) => boolean
}

export function SidebarPopover({ icon, title, items, isActive }: SidebarPopoverProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <button
                    className={cx(
                        "flex w-full items-center justify-center p-2 rounded-md text-[13px] transition",
                        "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900",
                        focusRing,
                    )}
                    aria-label={title}
                >
                    {icon}
                </button>
            </PopoverTrigger>
            <PopoverContent
                side="right"
                sideOffset={8}
                align="start"
                className="p-2 min-w-48 max-h-[calc(100vh-100px)] overflow-y-auto"
            >
                <div className="flex flex-col space-y-1">
                    <div className="px-3 py-2 text-[13px] font-medium text-[#2D3338]">
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