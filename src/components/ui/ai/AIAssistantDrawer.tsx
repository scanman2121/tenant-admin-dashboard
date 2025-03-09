"use client"

import { Button } from "@/components/Button"
import { cx } from "@/lib/utils"
import { RiCloseLine, RiSendPlaneFill, RiSparkling2Line } from "@remixicon/react"
import { useEffect, useRef, useState } from "react"

interface AIAssistantDrawerProps {
    isOpen: boolean
    onClose: () => void
}

export function AIAssistantDrawer({ isOpen, onClose }: AIAssistantDrawerProps) {
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
        { role: 'assistant', content: 'Hello! I\'m your AI assistant. How can I help you today?' }
    ])
    const [input, setInput] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)

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

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
            document.documentElement.classList.add('ai-drawer-open')
        } else {
            document.body.style.overflow = ''
            document.documentElement.classList.remove('ai-drawer-open')
        }

        return () => {
            document.body.style.overflow = ''
            document.documentElement.classList.remove('ai-drawer-open')
        }
    }, [isOpen])

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

    return (
        <>
            <div
                className={cx(
                    "fixed inset-y-0 right-0 z-40 w-80 bg-white dark:bg-gray-950 shadow-lg transform transition-transform duration-300 ease-in-out",
                    "border-l border-gray-200 dark:border-gray-800",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                        <RiSparkling2Line className="size-5 text-primary" />
                        <h2 className="font-medium text-gray-900 dark:text-gray-50">AI Assistant</h2>
                    </div>
                    <Button
                        variant="ghost"
                        className="p-1.5 h-7 w-7"
                        onClick={onClose}
                    >
                        <RiCloseLine className="size-5" />
                        <span className="sr-only">Close</span>
                    </Button>
                </div>

                {/* Messages */}
                <div className="flex flex-col h-[calc(100%-8rem)] overflow-y-auto p-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={cx(
                                "mb-4 max-w-[85%] rounded-lg p-3",
                                message.role === 'user'
                                    ? "bg-primary text-white self-end rounded-br-none"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50 self-start rounded-bl-none"
                            )}
                        >
                            {message.content}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className={cx(
                                "flex-1 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm",
                                "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50",
                                "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            )}
                        />
                        <Button type="submit" disabled={!input.trim()}>
                            <RiSendPlaneFill className="size-4" />
                            <span className="sr-only">Send</span>
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
} 