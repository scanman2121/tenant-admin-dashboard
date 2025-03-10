"use client"

import { cx } from "@/lib/utils"
import {
    RiArrowDownSLine,
    RiAttachmentLine,
    RiCloseLine,
    RiEmotionLine,
    RiMessage2Line,
    RiSearchLine,
    RiSendPlaneFill
} from "@remixicon/react"
import Image from "next/image"
import { useState } from "react"

interface CommunicationsPanelProps {
    onMinimize: () => void
    onClose: () => void
}

interface Tenant {
    id: string
    name: string
    building: string
    avatar?: string
    initials: string
    unread: number
    lastMessage?: {
        text: string
        time: string
        isFromTenant: boolean
    }
}

interface Message {
    id: string
    text: string
    time: string
    isFromTenant: boolean
    sender: string
    read: boolean
}

export function CommunicationsPanel({ onMinimize, onClose }: CommunicationsPanelProps) {
    const [selectedTenant, setSelectedTenant] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [messageInput, setMessageInput] = useState("")

    // Sample tenant data
    const tenants: Tenant[] = [
        {
            id: "1",
            name: "Acme Inc",
            building: "Empire State Building",
            initials: "AI",
            unread: 3,
            lastMessage: {
                text: "When will the elevator maintenance be completed?",
                time: "10:30 AM",
                isFromTenant: true
            }
        },
        {
            id: "2",
            name: "Global Tech",
            building: "Rockefeller Center",
            avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            initials: "GT",
            unread: 0,
            lastMessage: {
                text: "Thanks for addressing our concerns about the HVAC system.",
                time: "Yesterday",
                isFromTenant: true
            }
        },
        {
            id: "3",
            name: "Innovate Solutions",
            building: "One World Trade Center",
            initials: "IS",
            unread: 1,
            lastMessage: {
                text: "We've scheduled the tenant event for next Friday at 3 PM.",
                time: "Yesterday",
                isFromTenant: false
            }
        },
        {
            id: "4",
            name: "Creative Studios",
            building: "Chrysler Building",
            initials: "CS",
            unread: 0,
            lastMessage: {
                text: "Our team would like to discuss the upcoming renovations.",
                time: "Jun 10",
                isFromTenant: true
            }
        }
    ]

    // Sample messages for the selected tenant
    const messages: Record<string, Message[]> = {
        "1": [
            {
                id: "1-1",
                text: "Hello, we've noticed that the elevator in the north wing has been out of service for two days now.",
                time: "Yesterday, 4:30 PM",
                isFromTenant: true,
                sender: "John from Acme Inc",
                read: true
            },
            {
                id: "1-2",
                text: "Hi John, thank you for bringing this to our attention. Our maintenance team is aware of the issue and working on it.",
                time: "Yesterday, 5:15 PM",
                isFromTenant: false,
                sender: "You",
                read: true
            },
            {
                id: "1-3",
                text: "Do you have an estimated time for when it will be fixed? It's causing significant inconvenience for our staff.",
                time: "Today, 9:45 AM",
                isFromTenant: true,
                sender: "John from Acme Inc",
                read: true
            },
            {
                id: "1-4",
                text: "When will the elevator maintenance be completed?",
                time: "Today, 10:30 AM",
                isFromTenant: true,
                sender: "John from Acme Inc",
                read: false
            }
        ],
        "2": [
            {
                id: "2-1",
                text: "We've been experiencing temperature fluctuations in our office space on the 15th floor.",
                time: "Monday, 11:20 AM",
                isFromTenant: true,
                sender: "Sarah from Global Tech",
                read: true
            },
            {
                id: "2-2",
                text: "I'll have our facilities team look into this right away. Can you provide more details about when you notice the fluctuations?",
                time: "Monday, 1:05 PM",
                isFromTenant: false,
                sender: "You",
                read: true
            },
            {
                id: "2-3",
                text: "It seems to happen mostly in the afternoon, between 2-4 PM. The temperature rises significantly making it uncomfortable to work.",
                time: "Monday, 2:30 PM",
                isFromTenant: true,
                sender: "Sarah from Global Tech",
                read: true
            },
            {
                id: "2-4",
                text: "Our technicians have identified the issue with the HVAC system and made the necessary adjustments. Please let us know if you continue to experience problems.",
                time: "Tuesday, 9:15 AM",
                isFromTenant: false,
                sender: "You",
                read: true
            },
            {
                id: "2-5",
                text: "Thanks for addressing our concerns about the HVAC system.",
                time: "Yesterday, 3:45 PM",
                isFromTenant: true,
                sender: "Sarah from Global Tech",
                read: true
            }
        ],
        "3": [
            {
                id: "3-1",
                text: "We're interested in hosting a company event in the building's common area next week. Is that possible?",
                time: "Tuesday, 10:00 AM",
                isFromTenant: true,
                sender: "Michael from Innovate Solutions",
                read: true
            },
            {
                id: "3-2",
                text: "Absolutely! We'd be happy to accommodate your event. Could you provide details on the date, time, and expected number of attendees?",
                time: "Tuesday, 11:30 AM",
                isFromTenant: false,
                sender: "You",
                read: true
            },
            {
                id: "3-3",
                text: "We're looking at next Friday, around 3-5 PM. We'll have approximately 50 attendees.",
                time: "Tuesday, 2:15 PM",
                isFromTenant: true,
                sender: "Michael from Innovate Solutions",
                read: true
            },
            {
                id: "3-4",
                text: "We've scheduled the tenant event for next Friday at 3 PM.",
                time: "Yesterday, 4:00 PM",
                isFromTenant: false,
                sender: "You",
                read: false
            }
        ]
    }

    const filteredTenants = tenants.filter(tenant =>
        tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tenant.building.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (!messageInput.trim() || !selectedTenant) return

        // In a real app, you would send the message to an API
        console.log(`Sending message to tenant ${selectedTenant}: ${messageInput}`)
        setMessageInput("")
    }

    return (
        <div className="mb-2 w-[800px] h-[500px] bg-white dark:bg-gray-950 rounded-t-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                    <RiMessage2Line className="size-4 text-primary" />
                    <span className="font-medium text-sm text-gray-900 dark:text-gray-50">Communications</span>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                        onClick={onMinimize}
                    >
                        <RiArrowDownSLine className="size-4" />
                    </button>
                    <button
                        className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                        onClick={onClose}
                    >
                        <RiCloseLine className="size-4" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Tenant List */}
                <div className="w-1/3 border-r border-gray-200 dark:border-gray-800 flex flex-col">
                    {/* Search */}
                    <div className="p-3 border-b border-gray-200 dark:border-gray-800">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search tenants..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={cx(
                                    "w-full rounded-md border border-gray-300 dark:border-gray-700 pl-9 pr-3 py-2 text-sm",
                                    "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50",
                                    "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                )}
                            />
                            <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Tenant List */}
                    <div className="flex-1 overflow-y-auto">
                        {filteredTenants.length > 0 ? (
                            filteredTenants.map(tenant => (
                                <div
                                    key={tenant.id}
                                    className={cx(
                                        "p-3 cursor-pointer border-b border-gray-100 dark:border-gray-800",
                                        "hover:bg-gray-50 dark:hover:bg-gray-900",
                                        selectedTenant === tenant.id && "bg-gray-100 dark:bg-gray-800"
                                    )}
                                    onClick={() => setSelectedTenant(tenant.id)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex-shrink-0">
                                            {tenant.avatar ? (
                                                <div className="relative size-10 overflow-hidden rounded-full">
                                                    <Image
                                                        src={tenant.avatar}
                                                        alt={tenant.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                                                    <span className="text-sm font-medium">{tenant.initials}</span>
                                                </div>
                                            )}
                                            {tenant.unread > 0 && (
                                                <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                                                    {tenant.unread}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-medium text-sm text-gray-900 dark:text-gray-50 truncate">
                                                    {tenant.name}
                                                </h3>
                                                {tenant.lastMessage && (
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {tenant.lastMessage.time}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                    {tenant.building}
                                                </p>
                                            </div>
                                            {tenant.lastMessage && (
                                                <p className={cx(
                                                    "text-xs mt-1 truncate",
                                                    tenant.unread > 0 ? "font-medium text-gray-900 dark:text-gray-50" : "text-gray-500 dark:text-gray-400"
                                                )}>
                                                    {tenant.lastMessage.isFromTenant ? "" : "You: "}
                                                    {tenant.lastMessage.text}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                                No tenants found
                            </div>
                        )}
                    </div>
                </div>

                {/* Conversation */}
                <div className="w-2/3 flex flex-col">
                    {selectedTenant ? (
                        <>
                            {/* Conversation Header */}
                            <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {(() => {
                                        const tenant = tenants.find(t => t.id === selectedTenant)
                                        if (!tenant) return null

                                        return (
                                            <>
                                                {tenant.avatar ? (
                                                    <div className="relative size-8 overflow-hidden rounded-full">
                                                        <Image
                                                            src={tenant.avatar}
                                                            alt={tenant.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                                                        <span className="text-xs font-medium">{tenant.initials}</span>
                                                    </div>
                                                )}
                                                <div>
                                                    <h3 className="font-medium text-sm text-gray-900 dark:text-gray-50">
                                                        {tenant.name}
                                                    </h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {tenant.building}
                                                    </p>
                                                </div>
                                            </>
                                        )
                                    })()}
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages[selectedTenant]?.map(message => (
                                    <div
                                        key={message.id}
                                        className={cx(
                                            "flex",
                                            message.isFromTenant ? "justify-start" : "justify-end"
                                        )}
                                    >
                                        <div className={cx(
                                            "max-w-[70%] rounded-lg p-3 text-sm",
                                            message.isFromTenant
                                                ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50"
                                                : "bg-primary text-white"
                                        )}>
                                            <div className="flex justify-between items-center gap-4 mb-1">
                                                <span className="font-medium text-xs">
                                                    {message.sender}
                                                </span>
                                                <span className="text-xs opacity-70">
                                                    {message.time}
                                                </span>
                                            </div>
                                            <p>{message.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Message Input */}
                            <div className="p-3 border-t border-gray-200 dark:border-gray-800">
                                <form onSubmit={handleSendMessage} className="flex gap-2">
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            placeholder="Type a message..."
                                            value={messageInput}
                                            onChange={(e) => setMessageInput(e.target.value)}
                                            className={cx(
                                                "w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm",
                                                "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50",
                                                "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            )}
                                        />
                                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                                            <button
                                                type="button"
                                                className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                            >
                                                <RiEmotionLine className="size-4" />
                                            </button>
                                            <button
                                                type="button"
                                                className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                            >
                                                <RiAttachmentLine className="size-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={!messageInput.trim()}
                                        className={cx(
                                            "p-2 rounded-md bg-primary text-white",
                                            "disabled:opacity-50 disabled:cursor-not-allowed",
                                            "hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                        )}
                                    >
                                        <RiSendPlaneFill className="size-5" />
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                            <RiMessage2Line className="size-12 text-gray-300 dark:text-gray-700 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">
                                Select a tenant to start messaging
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                                Choose a tenant from the list to view your conversation history and send messages.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
} 