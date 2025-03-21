"use client"

import { Button } from "@/components/Button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/Dialog"
import { RiCheckLine, RiCloseLine, RiSearchLine } from "@remixicon/react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

// Define the steps in the IdP connection flow
type Step = 'provider-select' | 'authorizing' | 'success' | 'sync-settings' | 'review' | 'syncing' | 'complete'

interface ConnectIdPModalProps {
    isOpen: boolean
    onClose: () => void
}

const idpProviders = [
    {
        id: 'okta',
        name: 'Okta',
        logo: '/logos/okta.svg',
        description: 'Connect with Okta SSO'
    },
    {
        id: 'azure',
        name: 'Azure AD',
        logo: '/logos/azure.svg',
        description: 'Connect with Microsoft Azure Active Directory'
    },
    {
        id: 'google',
        name: 'Google Workspace',
        logo: '/logos/google.svg',
        description: 'Connect with Google Workspace'
    }
]

interface MockGroup {
    id: string
    name: string
    memberCount: number
    description: string
}

const mockGroups: MockGroup[] = [
    {
        id: '1',
        name: 'Engineering',
        memberCount: 45,
        description: 'Software engineering and development team'
    },
    {
        id: '2',
        name: 'Sales',
        memberCount: 32,
        description: 'Sales and business development'
    },
    {
        id: '3',
        name: 'Marketing',
        memberCount: 28,
        description: 'Marketing and communications'
    },
    {
        id: '4',
        name: 'HR',
        memberCount: 12,
        description: 'Human resources team'
    },
    {
        id: '5',
        name: 'Finance',
        memberCount: 18,
        description: 'Finance and accounting'
    }
]

export function ConnectIdPModal({ isOpen, onClose }: ConnectIdPModalProps) {
    const [currentStep, setCurrentStep] = useState<Step>('provider-select')
    const [selectedProvider, setSelectedProvider] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedGroups, setSelectedGroups] = useState<string[]>([])

    const handleProviderSelect = (providerId: string) => {
        setSelectedProvider(providerId)
        setCurrentStep('authorizing')
        // Simulate authorization delay
        setTimeout(() => {
            setCurrentStep('success')
        }, 2000)
    }

    const handleContinueToSync = () => {
        setCurrentStep('sync-settings')
    }

    const handleSaveAndSync = () => {
        setCurrentStep('review')
    }

    const handleConfirmSync = () => {
        setCurrentStep('syncing')
        // Simulate sync process
        setTimeout(() => {
            setCurrentStep('complete')
        }, 3000)
    }

    const handleClose = () => {
        onClose()
        // Reset state after animation completes
        setTimeout(() => {
            setCurrentStep('provider-select')
            setSelectedProvider(null)
            setSearchQuery('')
            setSelectedGroups([])
        }, 200)
    }

    const filteredGroups = mockGroups.filter(group =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const toggleGroupSelection = (groupId: string) => {
        setSelectedGroups(prev =>
            prev.includes(groupId)
                ? prev.filter(id => id !== groupId)
                : [...prev, groupId]
        )
    }

    const selectAllGroups = () => {
        setSelectedGroups(filteredGroups.map(group => group.id))
    }

    const deselectAllGroups = () => {
        setSelectedGroups([])
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle>
                            {currentStep === 'provider-select' && 'Connect Identity Provider'}
                            {currentStep === 'authorizing' && 'Connecting...'}
                            {currentStep === 'success' && 'Connection Successful'}
                            {currentStep === 'sync-settings' && 'Select Groups to Sync'}
                            {currentStep === 'review' && 'Review Selection'}
                            {currentStep === 'syncing' && 'Syncing...'}
                            {currentStep === 'complete' && 'Setup Complete'}
                        </DialogTitle>
                        <Button
                            variant="ghost"
                            className="p-1"
                            onClick={handleClose}
                        >
                            <RiCloseLine className="size-5" />
                        </Button>
                    </div>
                    {currentStep === 'provider-select' && (
                        <DialogDescription>
                            Choose your identity provider to get started
                        </DialogDescription>
                    )}
                </DialogHeader>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4"
                >
                    {currentStep === 'provider-select' && (
                        <div className="grid gap-4">
                            {idpProviders.map((provider) => (
                                <button
                                    key={provider.id}
                                    onClick={() => handleProviderSelect(provider.id)}
                                    className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 text-left transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
                                >
                                    <div className="relative size-10 overflow-hidden">
                                        <Image
                                            src={provider.logo}
                                            alt={provider.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-gray-50">
                                            {provider.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {provider.description}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {currentStep === 'authorizing' && (
                        <div className="flex flex-col items-center justify-center py-8">
                            <div className="size-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                            <p className="mt-4 text-gray-600 dark:text-gray-400">
                                Redirecting to your provider...
                            </p>
                        </div>
                    )}

                    {currentStep === 'success' && (
                        <div className="flex flex-col items-center justify-center py-8">
                            <div className="flex size-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                <RiCheckLine className="size-6" />
                            </div>
                            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-50">
                                Connection Successful!
                            </h3>
                            <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
                                {selectedProvider && `${idpProviders.find(p => p.id === selectedProvider)?.name} is `}
                                connected. Now select groups or employees to sync.
                            </p>
                            <Button
                                className="mt-6"
                                onClick={handleContinueToSync}
                            >
                                Continue
                            </Button>
                        </div>
                    )}

                    {currentStep === 'sync-settings' && (
                        <div>
                            <div className="mb-4">
                                <div className="relative">
                                    <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search groups..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50"
                                    />
                                </div>
                            </div>

                            <div className="mb-4 flex items-center justify-between">
                                <p className="text-sm text-gray-500">
                                    {selectedGroups.length} groups selected
                                </p>
                                <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        className="text-sm"
                                        onClick={deselectAllGroups}
                                    >
                                        Deselect all
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="text-sm"
                                        onClick={selectAllGroups}
                                    >
                                        Select all
                                    </Button>
                                </div>
                            </div>

                            <div className="max-h-[300px] space-y-2 overflow-y-auto">
                                {filteredGroups.map((group) => (
                                    <label
                                        key={group.id}
                                        className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
                                    >
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900 dark:text-gray-50">
                                                {group.name}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                {group.description}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-400">
                                                {group.memberCount} members
                                            </p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={selectedGroups.includes(group.id)}
                                            onChange={() => toggleGroupSelection(group.id)}
                                            className="ml-4 size-5 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-900"
                                        />
                                    </label>
                                ))}
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <Button variant="secondary" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSaveAndSync}
                                    disabled={selectedGroups.length === 0}
                                >
                                    Save and Sync
                                </Button>
                            </div>
                        </div>
                    )}

                    {currentStep === 'review' && (
                        <div>
                            <div className="mb-4">
                                <h3 className="font-medium text-gray-900 dark:text-gray-50">
                                    Selected Provider
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {idpProviders.find(p => p.id === selectedProvider)?.name}
                                </p>
                            </div>
                            <div className="mb-4">
                                <h3 className="font-medium text-gray-900 dark:text-gray-50">
                                    Selected Groups
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    You are about to sync the following groups:
                                </p>
                            </div>
                            <div className="max-h-[300px] space-y-2 overflow-y-auto rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                                {mockGroups
                                    .filter(group => selectedGroups.includes(group.id))
                                    .map((group) => (
                                        <div
                                            key={group.id}
                                            className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-900"
                                        >
                                            <div>
                                                <h4 className="font-medium text-gray-900 dark:text-gray-50">
                                                    {group.name}
                                                </h4>
                                                <p className="text-sm text-gray-500">
                                                    {group.memberCount} members
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className="mt-6 flex justify-end gap-3">
                                <Button
                                    variant="secondary"
                                    onClick={() => setCurrentStep('sync-settings')}
                                >
                                    Edit Selection
                                </Button>
                                <Button onClick={handleConfirmSync}>
                                    Confirm Sync
                                </Button>
                            </div>
                        </div>
                    )}

                    {currentStep === 'syncing' && (
                        <div className="flex flex-col items-center justify-center py-8">
                            <div className="size-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                            <p className="mt-4 text-gray-600 dark:text-gray-400">
                                Syncing employees...
                            </p>
                        </div>
                    )}

                    {currentStep === 'complete' && (
                        <div className="flex flex-col items-center justify-center py-8">
                            <div className="flex size-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                <RiCheckLine className="size-6" />
                            </div>
                            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-50">
                                Sync Complete!
                            </h3>
                            <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
                                Successfully synced {selectedGroups.length} groups and their members.
                            </p>
                            <Button
                                className="mt-6"
                                onClick={handleClose}
                            >
                                Close
                            </Button>
                        </div>
                    )}
                </motion.div>
            </DialogContent>
        </Dialog>
    )
} 