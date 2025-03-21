// Tremor Raw Button [v0.1.1]

import { cn, focusRing } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { RiLoader2Fill } from "@remixicon/react"
import React, { forwardRef } from "react"
import { tv, type VariantProps } from "tailwind-variants"

const buttonVariants = tv({
  base: [
    // base
    "relative inline-flex items-center justify-center whitespace-nowrap rounded-md border px-3 py-2 text-center text-sm font-medium shadow-sm transition-all duration-100 ease-in-out",
    // disabled
    "disabled:pointer-events-none disabled:shadow-none",
    // focus
    focusRing,
  ],
  variants: {
    variant: {
      primary: [
        // border
        "border-transparent",
        // text color
        "text-white dark:text-gray-900",
        // background color
        "bg-primary dark:bg-primary-400",
        // hover color
        "hover:bg-primary-600 dark:hover:bg-primary-300",
        // disabled
        "disabled:bg-primary-100 disabled:text-gray-400",
        "disabled:dark:bg-primary-800 disabled:dark:text-primary-400",
      ],
      secondary: [
        // border
        "border-gray-300 dark:border-gray-800",
        // text color
        "text-gray-700 dark:text-gray-300",
        // background color
        "bg-white dark:bg-gray-950",
        //hover color
        "hover:bg-gray-50 dark:hover:bg-gray-900",
        // disabled
        "disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-400 dark:disabled:border-gray-800 dark:disabled:bg-gray-900 dark:disabled:text-gray-600",
      ],
      light: [
        // base
        "shadow-none",
        // border
        "border-transparent",
        // text color
        "text-gray-900 dark:text-gray-50",
        // background color
        "bg-gray-200 dark:bg-gray-900",
        // hover color
        "hover:bg-gray-300/70 dark:hover:bg-gray-800/80",
        // disabled
        "disabled:bg-gray-100 disabled:text-gray-400",
        "disabled:dark:bg-gray-800 disabled:dark:text-gray-600",
      ],
      ghost: [
        // base
        "shadow-none",
        // border
        "border-transparent",
        // text color
        "text-gray-900 dark:text-gray-50",
        // background color
        "bg-transparent",
        // hover color
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        // disabled
        "disabled:text-gray-400 dark:disabled:text-gray-600",
      ],
      destructive: [
        // text color
        "text-white",
        // border
        "border-transparent",
        // background color
        "bg-red-600 dark:bg-red-700",
        // hover color
        "hover:bg-red-700 dark:hover:bg-red-600",
        // disabled
        "disabled:bg-red-300 disabled:text-white",
        "disabled:dark:bg-red-950 disabled:dark:text-red-400",
      ],
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
  size?: "sm" | "md" | "lg"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size = "md", asChild = false, isLoading, loadingText, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          buttonVariants({ variant }),
          {
            "text-sm px-3 py-1.5 rounded-md": size === "sm",
            "text-sm px-4 py-2 rounded-lg": size === "md",
            "text-base px-6 py-3 rounded-lg": size === "lg",
          },
          className
        )}
        ref={ref}
        disabled={props.disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="pointer-events-none flex items-center gap-2">
            <RiLoader2Fill className="size-4 animate-spin" aria-hidden="true" />
            <span>{loadingText || children}</span>
          </span>
        ) : (
          children
        )}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
export type { ButtonProps }

