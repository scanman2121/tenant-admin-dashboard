"use client"
import { siteConfig } from "@/app/siteConfig"
import { cx, focusRing } from "@/lib/utils"
import {
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiBuildingLine,
  RiHome2Line,
  RiLinkM,
  RiReceiptLine,
  RiSettings5Line
} from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { HqOLogo } from "./HqOLogo"
import { UserProfileDesktop } from "./UserProfile"

// Main navigation items excluding the ones that will go into the Asset Manager section
const navigation = [
  { name: "My HqO", href: siteConfig.baseLinks.overview, icon: RiHome2Line },
  { name: "Analytics", href: siteConfig.baseLinks.analytics, icon: RiLinkM },
  { name: "Resources", href: siteConfig.baseLinks.resources, icon: RiLinkM },
  {
    name: "Settings & setup",
    href: siteConfig.baseLinks.settings.general,
    icon: RiSettings5Line,
  },
] as const

// Asset Manager sub-navigation items
const assetManagerItems = [
  { name: "Buildings", href: siteConfig.baseLinks.buildings },
  { name: "Tenants", href: siteConfig.baseLinks.tenants },
  { name: "Users", href: siteConfig.baseLinks.users },
  { name: "Vendors", href: siteConfig.baseLinks.vendors },
  { name: "Audiences", href: siteConfig.baseLinks.audiences },
] as const

// Payments sub-navigation items
const paymentsItems = [
  { name: "Transactions", href: siteConfig.baseLinks.transactions },
  { name: "Credits", href: siteConfig.baseLinks.credits },
  { name: "Discounts", href: siteConfig.baseLinks.discounts },
] as const

const shortcuts = [
  {
    name: "Add new user",
    href: "/users",
    icon: RiLinkM,
  },
  {
    name: "Building usage",
    href: "/settings/billing#billing-overview",
    icon: RiLinkM,
  },
  {
    name: "Cost spend control",
    href: "/settings/billing#cost-spend-control",
    icon: RiLinkM,
  },
  {
    name: "My HqO – Rows written",
    href: "/my-hqo#usage-overview",
    icon: RiLinkM,
  },
] as const

export function Sidebar() {
  const pathname = usePathname()
  const [isAssetManagerOpen, setIsAssetManagerOpen] = useState(false)
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false)

  // Check if current path is in Asset Manager section
  const isInAssetManager = assetManagerItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  // Check if current path is in Payments section
  const isInPayments = paymentsItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  // Auto-expand Asset Manager if current path is in that section
  useEffect(() => {
    if (isInAssetManager) {
      setIsAssetManagerOpen(true)
    }
    if (isInPayments) {
      setIsPaymentsOpen(true)
    }
  }, [isInAssetManager, isInPayments])

  const isActive = (itemHref: string) => {
    if (itemHref === siteConfig.baseLinks.settings.general) {
      return pathname.startsWith("/settings")
    }
    return pathname === itemHref || pathname.startsWith(itemHref)
  }

  // Render a navigation item
  const renderNavItem = (item: typeof navigation[number]) => (
    <li key={item.name}>
      <Link
        href={item.href}
        className={cx(
          isActive(item.href)
            ? "text-primary dark:text-primary-400"
            : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
          "flex items-center gap-x-2.5 rounded-md px-1.5 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
          focusRing,
        )}
      >
        <item.icon className="size-4 shrink-0" aria-hidden="true" />
        {item.name}
      </Link>
    </li>
  )

  return (
    <nav className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:flex-col">
      <aside className="flex w-[226px] max-w-[226px] grow flex-col gap-y-6 overflow-y-auto border-r border-gray-200 bg-white px-2 py-4 dark:border-gray-800 dark:bg-gray-950">
        <div className="flex items-center px-1 pt-1.5">
          <HqOLogo className="h-6 w-auto" />
        </div>
        <nav
          aria-label="core navigation links"
          className="flex flex-1 flex-col space-y-10"
        >
          <ul role="list" className="space-y-0.5">
            {/* My HqO */}
            {renderNavItem(navigation[0])}

            {/* Asset Manager accordion */}
            <li>
              <button
                onClick={() => setIsAssetManagerOpen(!isAssetManagerOpen)}
                className={cx(
                  isInAssetManager
                    ? "text-primary dark:text-primary-400"
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                  "flex w-full items-center justify-between gap-x-2.5 rounded-md px-1.5 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                  focusRing,
                )}
                aria-expanded={isAssetManagerOpen}
              >
                <span className="flex items-center gap-x-2.5">
                  <RiBuildingLine className="size-4 shrink-0" aria-hidden="true" />
                  Asset Manager
                </span>
                {isAssetManagerOpen ? (
                  <RiArrowDownSLine className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                ) : (
                  <RiArrowRightSLine className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                )}
              </button>

              {/* Sub-navigation items with animation */}
              <div
                className={cx(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isAssetManagerOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <ul className="mt-1 space-y-0.5 pl-6">
                  {assetManagerItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cx(
                          isActive(item.href)
                            ? "text-primary dark:text-primary-400"
                            : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                          "flex items-center rounded-md px-1.5 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                          focusRing,
                        )}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* Payments accordion */}
            <li>
              <button
                onClick={() => setIsPaymentsOpen(!isPaymentsOpen)}
                className={cx(
                  isInPayments
                    ? "text-primary dark:text-primary-400"
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                  "flex w-full items-center justify-between gap-x-2.5 rounded-md px-1.5 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                  focusRing,
                )}
                aria-expanded={isPaymentsOpen}
              >
                <span className="flex items-center gap-x-2.5">
                  <RiReceiptLine className="size-4 shrink-0" aria-hidden="true" />
                  Payments
                </span>
                {isPaymentsOpen ? (
                  <RiArrowDownSLine className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                ) : (
                  <RiArrowRightSLine className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                )}
              </button>

              {/* Sub-navigation items with animation */}
              <div
                className={cx(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isPaymentsOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <ul className="mt-1 space-y-0.5 pl-6">
                  {paymentsItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cx(
                          isActive(item.href)
                            ? "text-primary dark:text-primary-400"
                            : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                          "flex items-center rounded-md px-1.5 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                          focusRing,
                        )}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* Analytics */}
            {renderNavItem(navigation[1])}

            {/* Resources */}
            {renderNavItem(navigation[2])}

            {/* Settings & setup */}
            {renderNavItem(navigation[3])}
          </ul>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Shortcuts
            </div>
            <ul role="list" className="mt-3 space-y-0.5">
              {shortcuts.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cx(
                      "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                      "flex items-center gap-x-2.5 rounded-md px-1.5 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                      focusRing,
                    )}
                  >
                    <item.icon className="size-4 shrink-0" aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <UserProfileDesktop />
      </aside>
    </nav>
  )
}
