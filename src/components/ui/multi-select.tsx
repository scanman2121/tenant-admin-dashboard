"use client"

import { cx } from "@/lib/utils"
import ReactSelect, { Props } from "react-select"

export interface Option {
    value: string
    label: string
}

interface MultiSelectProps extends Omit<Props<Option, true>, "classNames"> {
    error?: boolean
}

export function MultiSelect({ className, error, ...props }: MultiSelectProps) {
    return (
        <ReactSelect<Option, true>
            {...props}
            isMulti
            className={cx("react-select-container", className)}
            classNames={{
                control: (state: { isFocused: boolean; isDisabled: boolean }) =>
                    cx(
                        "!min-h-[2.25rem] !bg-transparent !border-gray-300 dark:!border-gray-700 !shadow-sm !rounded-md",
                        state.isFocused && "!border-primary !ring-1 !ring-primary",
                        error && "!border-red-500 dark:!border-red-500",
                        state.isDisabled && "!opacity-50 !cursor-not-allowed"
                    ),
                placeholder: () => "!text-gray-500 dark:!text-gray-400",
                input: () => "!text-gray-900 dark:!text-gray-50",
                option: (state: { isFocused: boolean; isSelected: boolean }) =>
                    cx(
                        "!cursor-pointer !py-2 !px-3",
                        state.isFocused && "!bg-gray-100 dark:!bg-gray-800",
                        state.isSelected && "!bg-primary !text-white"
                    ),
                menu: () => "!bg-white dark:!bg-gray-900 !border !border-gray-200 dark:!border-gray-800 !rounded-md !shadow-lg",
                multiValue: () => "!bg-gray-100 dark:!bg-gray-800 !rounded-md",
                multiValueLabel: () => "!text-gray-900 dark:!text-gray-50 !py-0.5 !pl-2",
                multiValueRemove: () =>
                    "!text-gray-500 dark:!text-gray-400 !py-0.5 !pr-1 !pl-1 hover:!bg-gray-200 dark:hover:!bg-gray-700 !rounded-r-md",
            }}
        />
    )
} 