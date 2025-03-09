"use client"

import { Button } from "@/components/Button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/Popover"
import { notifications as initialNotifications } from "@/data/notifications"
import { cx, focusRing } from "@/lib/utils"
import { RiCheckLine, RiNotification3Line, RiSettings3Line } from "@remixicon/react"
import Link from "next/link"
import { useState } from "react"
import { NotificationItem } from "./NotificationItem"

export function NotificationsPopover() {
    const [notifications, setNotifications] = useState(initialNotifications)
    const [isOpen, setIsOpen] = useState(false)

    const unreadCount = notifications.filter(n => !n.read).length

    const handleMarkAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        )
    }

    const handleMarkAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, read: true }))
        )
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    className={cx(
                        "group relative flex items-center rounded-md p-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 hover:dark:text-gray-50 hover:dark:bg-gray-900",
                        focusRing
                    )}
                >
                    <RiNotification3Line className="size-5" aria-hidden="true" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                    <span className="sr-only">Notifications</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="end"
                sideOffset={8}
                className="w-80 p-0 max-h-[calc(100vh-100px)] flex flex-col"
            >
                <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800">
                    <h3 className="font-medium text-gray-900 dark:text-gray-50">Notifications</h3>
                    <div className="flex items-center gap-1">
                        {unreadCount > 0 && (
                            <Button
                                variant="ghost"
                                onClick={handleMarkAllAsRead}
                                className="flex items-center gap-1 text-xs py-1 px-2 h-7"
                            >
                                <RiCheckLine className="size-3.5" />
                                Mark all as read
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            className="p-1.5 h-7 w-7"
                            asChild
                        >
                            <Link href="/settings/general#notification-settings">
                                <RiSettings3Line className="size-4" />
                                <span className="sr-only">Notification settings</span>
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="overflow-y-auto">
                    {notifications.length > 0 ? (
                        <div className="divide-y divide-gray-200 dark:divide-gray-800">
                            {notifications.map(notification => (
                                <NotificationItem
                                    key={notification.id}
                                    notification={notification}
                                    onRead={handleMarkAsRead}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-6 text-center">
                            <RiNotification3Line className="size-8 text-gray-400" />
                            <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-50">No notifications</p>
                            <p className="mt-1 text-sm text-gray-500">You're all caught up!</p>
                        </div>
                    )}
                </div>

                <div className="mt-auto p-2 border-t border-gray-200 dark:border-gray-800">
                    <Button
                        variant="ghost"
                        className="w-full justify-center text-sm text-primary hover:text-primary-dark hover:bg-primary/5"
                        asChild
                    >
                        <Link href="/notifications">
                            View all notifications
                        </Link>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
} 