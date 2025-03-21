"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MultiSelect, Option } from "@/components/ui/multi-select"
import { cx } from "@/lib/utils"
import { RiCloseLine, RiCoinLine } from "@remixicon/react"
import { useState } from "react"

interface DistributeCreditsModalProps {
    isOpen: boolean
    onClose: () => void
    employees: Array<{
        id: number
        name: string
        email: string
        department: string
    }>
}

export function DistributeCreditsModal({
    isOpen,
    onClose,
    employees,
}: DistributeCreditsModalProps) {
    const [selectedEmployees, setSelectedEmployees] = useState<Option[]>([])
    const [amount, setAmount] = useState("")
    const [note, setNote] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implement credit distribution logic
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4 text-center">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

                <div className="relative w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all dark:bg-gray-900">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50">
                            Distribute credits
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                        >
                            <RiCloseLine className="h-6 w-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                        <div>
                            <label
                                htmlFor="employees"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Select employees
                            </label>
                            <MultiSelect
                                id="employees"
                                value={selectedEmployees}
                                onChange={(newValue: readonly Option[]) => setSelectedEmployees([...newValue])}
                                options={employees.map((employee) => ({
                                    value: employee.id.toString(),
                                    label: employee.name,
                                }))}
                                className="mt-1"
                                placeholder="Select employees..."
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="amount"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Amount
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <RiCoinLine className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        type="number"
                                        id="amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="block w-full rounded-md pl-10"
                                        placeholder="Enter amount"
                                        min="0"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="note"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Note
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="note"
                                    rows={3}
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className={cx(
                                        "block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-800",
                                        "focus:border-primary focus:ring-primary sm:text-sm"
                                    )}
                                    placeholder="Add a note..."
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={!selectedEmployees.length || !amount}
                            >
                                <RiCoinLine className="mr-1.5 h-5 w-5" />
                                Distribute credits
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
} 