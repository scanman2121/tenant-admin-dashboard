"use client"

import { Button } from "@/components/Button"
import { cx } from "@/lib/utils"
import {
    RiCalendarEventLine,
    RiCloseLine,
    RiLineChartLine,
    RiSendPlaneFill,
    RiUserAddLine,
    RiVipCrownLine
} from "@remixicon/react"
import { useEffect, useRef, useState } from "react"

interface AIAssistantDrawerProps {
    isOpen: boolean
    onClose: () => void
}

interface SuggestionCard {
    id: string
    title: string
    description: string
    icon: React.ReactNode
}

interface ChatSession {
    id: string
    title: string
    date: string
    messages: { role: 'user' | 'assistant', content: string }[]
}

export function AIAssistantDrawer({ isOpen, onClose }: AIAssistantDrawerProps) {
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([])
    const [input, setInput] = useState('')
    const [showPreviousChats, setShowPreviousChats] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Sample previous chat sessions
    const previousChats: ChatSession[] = [
        {
            id: '1',
            title: 'Adding new tenant users',
            date: 'Today',
            messages: [
                { role: 'user', content: 'Help me add a user' },
                { role: 'assistant', content: 'I\'d be happy to help you add a user. Here\'s how we can get started...' }
            ]
        },
        {
            id: '2',
            title: 'Building occupancy analysis',
            date: 'Yesterday',
            messages: [
                { role: 'user', content: 'Help me find occupancy trends' },
                { role: 'assistant', content: 'I\'d be happy to help you find occupancy trends. Here\'s how we can get started...' }
            ]
        },
        {
            id: '3',
            title: 'Summer event planning',
            date: 'Jun 10',
            messages: [
                { role: 'user', content: 'Help me schedule an event' },
                { role: 'assistant', content: 'I\'d be happy to help you schedule an event. Here\'s how we can get started...' }
            ]
        }
    ]

    const suggestionCards: SuggestionCard[] = [
        {
            id: 'add-user',
            title: 'Add a user',
            description: 'Add new user account',
            icon: <RiUserAddLine className="size-5" />
        },
        {
            id: 'occupancy-trends',
            title: 'Find occupancy trends',
            description: 'Analyze building occupancy trends',
            icon: <RiLineChartLine className="size-5" />
        },
        {
            id: 'schedule-event',
            title: 'Schedule an event',
            description: 'Create events that tenants will love',
            icon: <RiCalendarEventLine className="size-5" />
        },
        {
            id: 'view-vips',
            title: 'View VIPs',
            description: 'See important visitors expected today',
            icon: <RiVipCrownLine className="size-5" />
        }
    ]

    // Scroll to bottom of messages when new messages are added
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // Handle escape key to close drawer
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])

    // Add/remove class to html element when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.documentElement.classList.add('ai-drawer-open')
        } else {
            document.documentElement.classList.remove('ai-drawer-open')
        }

        return () => {
            document.documentElement.classList.remove('ai-drawer-open')
        }
    }, [isOpen])

    // Close previous chats dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            if (showPreviousChats) {
                setShowPreviousChats(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showPreviousChats])

    const handleNewChat = () => {
        setMessages([])
        setInput('')
        setShowPreviousChats(false)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        // Add user message
        const userMessage = { role: 'user' as const, content: input.trim() }
        setMessages(prev => [...prev, userMessage])
        setInput('')

        // Simulate AI response after a short delay
        setTimeout(() => {
            const aiResponse = {
                role: 'assistant' as const,
                content: `I received your message: "${input.trim()}". This is a simulated response as this is just a UI demo.`
            }
            setMessages(prev => [...prev, aiResponse])
        }, 1000)
    }

    const handleSuggestionClick = (suggestion: SuggestionCard) => {
        // Add user message based on suggestion
        const userMessage = {
            role: 'user' as const,
            content: `Help me ${suggestion.title.toLowerCase()}`
        }
        setMessages(prev => [...prev, userMessage])

        // Simulate AI response after a short delay
        setTimeout(() => {
            const aiResponse = {
                role: 'assistant' as const,
                content: `I'd be happy to help you ${suggestion.title.toLowerCase()}. Here's how we can get started...`
            }
            setMessages(prev => [...prev, aiResponse])
        }, 1000)
    }

    const handleLoadPreviousChat = (chat: ChatSession) => {
        setMessages(chat.messages)
        setShowPreviousChats(false)
    }

    const togglePreviousChats = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowPreviousChats(prev => !prev)
    }

    return (
        <div
            className={cx(
                "fixed inset-y-0 right-0 z-40 w-80 bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out",
                "border-l border-gray-200 dark:border-gray-800",
                isOpen ? "translate-x-0" : "translate-x-full"
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4">
                <h2 className="font-medium text-sm text-gray-900 dark:text-gray-50">AI Assistant</h2>
                <div className="flex items-center gap-2">
                    <Button
                        variant="secondary"
                        className="py-1 px-3 h-8 text-xs"
                        onClick={handleNewChat}
                    >
                        New chat
                    </Button>
                    <Button
                        variant="ghost"
                        className="p-1.5 h-8 w-8"
                        onClick={onClose}
                    >
                        <RiCloseLine className="size-5" />
                        <span className="sr-only">Close</span>
                    </Button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex flex-col h-[calc(100%-8rem)] overflow-y-auto p-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={cx(
                            "mb-4 max-w-[85%] rounded-lg p-3 text-sm",
                            message.role === 'user'
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-100 self-end rounded-br-none"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50 self-start rounded-bl-none"
                        )}
                    >
                        {message.content}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900">
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything"
                        className={cx(
                            "w-full rounded-full border border-gray-300 dark:border-gray-700 pl-4 pr-12 py-2.5 text-sm",
                            "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50",
                            "shadow-sm",
                            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={!input.trim()}
                        className={cx(
                            "absolute right-1 top-1/2 -translate-y-1/2 p-1.5 h-8 w-8 rounded-full transition-colors",
                            input.trim()
                                ? "bg-primary hover:bg-primary-dark text-white"
                                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                        )}
                    >
                        <RiSendPlaneFill className={cx(
                            "size-4",
                            input.trim() ? "text-white" : "text-gray-500 dark:text-gray-400"
                        )} />
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </div>
        </div>
    )
} 