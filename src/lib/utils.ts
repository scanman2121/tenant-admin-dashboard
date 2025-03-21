import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const focusRing = "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"

export const focusInput = "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0"

export const hasErrorInput = "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500"
