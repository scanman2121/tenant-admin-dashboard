"use client"

import { siteConfig } from "@/app/siteConfig"
import { Button } from "@/components/Button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger
} from "@/components/Drawer"
import { cx, focusRing } from "@/lib/utils"
import {
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiBuildingLine,
  RiHome2Line,
  RiLinkM,
  RiMenuLine,
  RiReceiptLine,
  RiSettings5Line
} from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { HqOLogo } from "./HqOLogo"
import { UserProfileMobile } from "./UserProfile"

// Main navigation items excluding the ones that will go into the Asset Manager section
const navigation = [
  { name: "My HqO", href: siteConfig.baseLinks.overview, icon: RiHome2Line },
  { name: "Resources", href: siteConfig.baseLinks.resources, icon: RiLinkM },
  { name: "Analytics", href: siteConfig.baseLinks.analytics, icon: RiLinkM },
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
    href: "/settings/users",
    icon: RiLinkM,
  },
  {
    name: "Workspace usage",
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

export default function MobileSidebar() {
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

  // Check if we're on the My HqO page
  const isInMyHqO = pathname === siteConfig.baseLinks.overview || pathname.startsWith(siteConfig.baseLinks.overview + "/")

  // Auto-expand Asset Manager if current path is in that section
  useEffect(() => {
    if (isInMyHqO) {
      // Collapse all sections when My HqO is active
      setIsAssetManagerOpen(false)
      setIsPaymentsOpen(false)
    } else {
      if (isInAssetManager) {
        setIsAssetManagerOpen(true)
      }
      if (isInPayments) {
        setIsPaymentsOpen(true)
      }
    }
  }, [isInMyHqO, isInAssetManager, isInPayments])

  const isActive = (itemHref: string) => {
    if (itemHref === siteConfig.baseLinks.settings.general) {
      return pathname.startsWith("/settings")
    }
    return pathname === itemHref || pathname.startsWith(itemHref)
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          aria-label="open sidebar"
          className="group flex items-center rounded-md p-2 text-sm font-medium hover:bg-gray-100 data-[state=open]:bg-gray-100 data-[state=open]:bg-gray-400/10 hover:dark:bg-gray-400/10"
        >
          <RiMenuLine
            className="size-6 shrink-0 sm:size-5"
            aria-hidden="true"
          />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="sm:max-w-lg">
        <DrawerHeader>
          <div className="flex items-center px-2">
            <HqOLogo className="h-6 w-auto" />
          </div>
        </DrawerHeader>
        <DrawerBody>
          <nav
            aria-label="core mobile navigation links"
            className="flex flex-1 flex-col space-y-10"
          >
            <ul role="list" className="space-y-1.5">
              {/* Regular navigation items */}
              {navigation.map((item) => (
                <li key={item.name}>
                  <DrawerClose asChild>
                    <Link
                      href={item.href}
                      className={cx(
                        isActive(item.href)
                          ? "bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary-400"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900",
                        "flex items-center gap-x-2.5 rounded-md px-3 py-2 text-[13px] transition",
                        focusRing,
                      )}
                    >
                      <item.icon
                        className="size-4 shrink-0"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </DrawerClose>
                </li>
              ))}

              {/* Payments accordion */}
              <li className={cx(
                isInPayments ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1" : ""
              )}>
                <button
                  onClick={() => setIsPaymentsOpen(!isPaymentsOpen)}
                  className={cx(
                    "flex w-full items-center justify-between gap-x-2.5 px-3 py-2 text-[13px] transition",
                    isInPayments
                      ? "text-gray-900 dark:text-gray-50"
                      : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900 rounded-md",
                    focusRing,
                  )}
                  aria-expanded={isPaymentsOpen}
                >
                  <span className="flex items-center gap-x-2.5">
                    <RiReceiptLine className="size-4 shrink-0" aria-hidden="true" />
                    Payments
                  </span>
                  {isPaymentsOpen ? (
                    <RiArrowDownSLine className="size-4 shrink-0 transition-transform duration-300 ease-in-out" aria-hidden="true" />
                  ) : (
                    <RiArrowRightSLine className="size-4 shrink-0 transition-transform duration-300 ease-in-out" aria-hidden="true" />
                  )}
                </button>

                {/* Sub-navigation items with animation */}
                <div
                  className={cx(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isPaymentsOpen ? "max-h-64 opacity-100 mt-1" : "max-h-0 opacity-0"
                  )}
                >
                  <ul className="space-y-1">
                    {paymentsItems.map((item) => (
                      <li key={item.name}>
                        <DrawerClose asChild>
                          <Link
                            href={item.href}
                            className={cx(
                              "flex items-center rounded-md pl-[34px] pr-3 py-2 text-[13px] transition w-full",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary-400 shadow-sm mx-1"
                                : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-800",
                              focusRing,
                            )}
                          >
                            {item.name}
                          </Link>
                        </DrawerClose>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* Asset Manager accordion */}
              <li className={cx(
                isInAssetManager ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1" : ""
              )}>
                <button
                  onClick={() => setIsAssetManagerOpen(!isAssetManagerOpen)}
                  className={cx(
                    "flex w-full items-center justify-between gap-x-2.5 px-3 py-2 text-[13px] transition",
                    isInAssetManager
                      ? "text-gray-900 dark:text-gray-50"
                      : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900 rounded-md",
                    focusRing,
                  )}
                  aria-expanded={isAssetManagerOpen}
                >
                  <span className="flex items-center gap-x-2.5">
                    <RiBuildingLine className="size-4 shrink-0" aria-hidden="true" />
                    Asset Manager
                  </span>
                  {isAssetManagerOpen ? (
                    <RiArrowDownSLine className="size-4 shrink-0 transition-transform duration-300 ease-in-out" aria-hidden="true" />
                  ) : (
                    <RiArrowRightSLine className="size-4 shrink-0 transition-transform duration-300 ease-in-out" aria-hidden="true" />
                  )}
                </button>

                {/* Sub-navigation items with animation */}
                <div
                  className={cx(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isAssetManagerOpen ? "max-h-64 opacity-100 mt-1" : "max-h-0 opacity-0"
                  )}
                >
                  <ul className="space-y-1">
                    {assetManagerItems.map((item) => (
                      <li key={item.name}>
                        <DrawerClose asChild>
                          <Link
                            href={item.href}
                            className={cx(
                              "flex items-center rounded-md pl-[34px] pr-3 py-2 text-[13px] transition w-full",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary-400 shadow-sm mx-1"
                                : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-800",
                              focusRing,
                            )}
                          >
                            {item.name}
                          </Link>
                        </DrawerClose>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
            <div>
              <span className="text-xs font-medium leading-6 text-gray-500">
                Shortcuts
              </span>
              <ul aria-label="shortcuts" role="list" className="space-y-0.5">
                {shortcuts.map((item) => (
                  <li key={item.name}>
                    <DrawerClose asChild>
                      <Link
                        href={item.href}
                        className={cx(
                          pathname === item.href || pathname.startsWith(item.href)
                            ? "text-primary dark:text-primary-400"
                            : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                          "flex items-center gap-x-2.5 rounded-md px-3 py-2 text-[13px] transition hover:bg-gray-100 hover:dark:bg-gray-900",
                          focusRing,
                        )}
                      >
                        <item.icon
                          className="size-4 shrink-0"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </DrawerClose>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <UserProfileMobile />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
