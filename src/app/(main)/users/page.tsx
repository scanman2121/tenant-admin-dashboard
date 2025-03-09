"use client"

import { Button } from "@/components/Button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/Dropdown"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/Select"
import { roles, users } from "@/data/data"
import { showError } from "@/lib/toast"
import { RiMore2Fill } from "@remixicon/react"
import { useEffect, useState } from "react"

export default function Users() {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [userData, setUserData] = useState(users)

    // Simulate data loading
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true)
                // In a real app, you would fetch data from an API
                // For now, we'll just use the imported data with a delay
                await new Promise(resolve => setTimeout(resolve, 500))

                setUserData(users)
                setError(null)
            } catch (err) {
                console.error("Error loading user data:", err)
                setError("Failed to load user data. Please refresh the page.")
                showError("Failed to load user data. Please refresh the page.")
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, [])

    const handleDeleteUser = (email: string) => {
        try {
            // In a real app, you would call an API to delete the user
            setUserData(userData.filter(user => user.email !== email))
        } catch (err) {
            console.error("Error deleting user:", err)
            showError("Failed to delete user. Please try again.")
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 my-4 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">
                <p>{error}</p>
                <Button
                    className="mt-2"
                    onClick={() => window.location.reload()}
                >
                    Refresh Page
                </Button>
            </div>
        )
    }

    return (
        <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-800">
            <div className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <div className="flex items-center justify-between bg-gray-50 px-4 py-3.5 dark:bg-gray-900">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium uppercase text-gray-500">
                            {userData.length} users
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Select defaultValue="all">
                            <SelectTrigger className="h-8 gap-1 rounded-md border-0 bg-white px-2 text-xs shadow-none hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All roles</SelectItem>
                                {roles.map((role) => (
                                    <SelectItem key={role.value} value={role.value}>
                                        {role.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                        <tr>
                            <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-xs font-medium uppercase text-gray-500"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-xs font-medium uppercase text-gray-500"
                            >
                                Status
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-xs font-medium uppercase text-gray-500"
                            >
                                Role
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-950">
                        {userData.map((user) => (
                            <tr key={user.email}>
                                <td className="whitespace-nowrap px-4 py-4">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                                {user.initials}
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                                {user.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4">
                                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20">
                                        Active
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                    {user.role}
                                </td>
                                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="ml-auto flex h-8 w-8 items-center justify-center"
                                            >
                                                <span className="sr-only">Open menu</span>
                                                <RiMore2Fill
                                                    className="size-4"
                                                    aria-hidden="true"
                                                />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Suspend</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDeleteUser(user.email)}>
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
} 