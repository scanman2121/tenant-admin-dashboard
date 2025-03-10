"use client"

import { cx } from "@/lib/utils"
import { RiArrowUpSLine, RiCloseLine, RiMessage2Line } from "@remixicon/react"
import { useEffect, useState } from "react"
import { CommunicationsPanel } from "./CommunicationsPanel"

export function CommunicationsTab() {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)

    // Close the panel when Escape key is pressed
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                setIsOpen(false)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen])

    const toggleOpen = () => {
        if (isMinimized) {
            setIsMinimized(false)
        } else {
            setIsOpen(!isOpen)
        }
    }

    const minimize = () => {
        setIsMinimized(true)
    }

    const close = () => {
        setIsOpen(false)
        setIsMinimized(false)
    }

    return (
        <div className="fixed bottom-0 right-6 z-30 flex flex-col items-end">
            {/* Main Communications Panel */}
            {isOpen && !isMinimized && (
                <CommunicationsPanel onMinimize={minimize} onClose={close} />
            )}

            {/* Minimized Panel */}
            {isOpen && isMinimized && (
                <div className="mb-2 w-80 bg-white dark:bg-gray-900 rounded-t-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
                    <div
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 cursor-pointer"
                        onClick={() => setIsMinimized(false)}
                    >
                        <div className="flex items-center gap-2">
                            <RiMessage2Line className="size-4 text-primary" />
                            <span className="font-medium text-sm text-gray-900 dark:text-gray-50">Communications</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setIsMinimized(false)
                                }}
                            >
                                <RiArrowUpSLine className="size-4" />
                            </button>
                            <button
                                className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    close()
                                }}
                            >
                                <RiCloseLine className="size-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Tab Button */}
            <button
                onClick={toggleOpen}
                className={cx(
                    "flex items-center gap-2 px-4 py-2 rounded-t-lg shadow-lg transition-colors",
                    "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 border-b-0",
                    "hover:bg-gray-50 dark:hover:bg-gray-800",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-950",
                    isOpen && "bg-primary hover:bg-primary text-white dark:bg-primary dark:hover:bg-primary-dark"
                )}
            >
                <RiMessage2Line className="size-5" />
                <span className="font-medium text-sm">Communications</span>
                {isOpen && isMinimized && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">3</span>
                )}
            </button>
        </div>
    )
} 