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
  RiBuilding2Line,
  RiBuildingLine,
  RiDashboardLine,
  RiLineChartLine,
  RiMegaphoneLine,
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
  { name: "My HqO", href: siteConfig.baseLinks.overview, icon: RiBuilding2Line },
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


// Experience Manager sub-navigation items
const experienceManagerItems = [
  { name: "Content", href: siteConfig.baseLinks.experienceManager.content },
  { name: "Amenity posts", href: siteConfig.baseLinks.experienceManager.amenityPosts },
  { name: "Events", href: siteConfig.baseLinks.experienceManager.events },
  { name: "Surveys", href: siteConfig.baseLinks.experienceManager.surveys },
  { name: "Community forum", href: siteConfig.baseLinks.experienceManager.communityForum },
  { name: "Communications", href: siteConfig.baseLinks.experienceManager.communications },
] as const

// Operations sub-navigation items
const operationsItems = [
  { name: "Access control", href: siteConfig.baseLinks.operations.accessControl },
  { name: "Mobile access", href: siteConfig.baseLinks.operations.mobileAccess },
  { name: "Visitor management", href: siteConfig.baseLinks.operations.visitorManagement },
  { name: "Capacity manager", href: siteConfig.baseLinks.operations.capacityManager },
  { name: "Resource booking", href: siteConfig.baseLinks.operations.resourceBooking },
  { name: "Work orders", href: siteConfig.baseLinks.operations.workOrders },
  { name: "Parking", href: siteConfig.baseLinks.operations.parking },
  { name: "Energy consumption", href: siteConfig.baseLinks.operations.energyConsumption },
] as const

// Settings and setup sub-navigation items
const settingsAndSetupItems = [
  { name: "Features", href: siteConfig.baseLinks.settingsAndSetup.features },
  { name: "SSO apps", href: siteConfig.baseLinks.settingsAndSetup.ssoApps },
  { name: "Connected apps", href: siteConfig.baseLinks.settingsAndSetup.connectedApps },
  { name: "Settings", href: siteConfig.baseLinks.settingsAndSetup.settings },
  { name: "Theme", href: siteConfig.baseLinks.settingsAndSetup.theme },
] as const

// Intelligence sub-navigation items
const intelligenceItems = [
  { name: "Dashboard", href: siteConfig.baseLinks.intelligence.dashboard },
  { name: "Assessments", href: siteConfig.baseLinks.intelligence.assessments },
  { name: "About intelligence", href: siteConfig.baseLinks.intelligence.aboutIntelligence },
] as const

export default function MobileSidebar() {
  const pathname = usePathname()
  const [isAssetManagerOpen, setIsAssetManagerOpen] = useState(false)
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false)
  const [isExperienceManagerOpen, setIsExperienceManagerOpen] = useState(false)
  const [isOperationsOpen, setIsOperationsOpen] = useState(false)
  const [isIntelligenceOpen, setIsIntelligenceOpen] = useState(false)
  const [isSettingsAndSetupOpen, setIsSettingsAndSetupOpen] = useState(false)

  // Check if current path is in Asset Manager section
  const isInAssetManager = assetManagerItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  // Check if current path is in Payments section
  const isInPayments = paymentsItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  // Check if current path is in Experience Manager section
  const isInExperienceManager = experienceManagerItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  // Check if current path is in Operations section
  const isInOperations = operationsItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  // Check if current path is in Intelligence section
  const isInIntelligence = intelligenceItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  // Check if current path is in Settings and Setup section
  const isInSettingsAndSetup = settingsAndSetupItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  // Check if we're on the My HqO page
  const isInMyHqO = pathname === siteConfig.baseLinks.overview || pathname.startsWith(siteConfig.baseLinks.overview + "/")

  // Auto-expand the section that contains the current path
  useEffect(() => {
    if (isInMyHqO) {
      // Collapse all sections when My HqO is active
      setIsAssetManagerOpen(false)
      setIsPaymentsOpen(false)
      setIsExperienceManagerOpen(false)
      setIsOperationsOpen(false)
      setIsIntelligenceOpen(false)
      setIsSettingsAndSetupOpen(false)
    } else {
      if (isInAssetManager) {
        setIsAssetManagerOpen(true)
      }
      if (isInPayments) {
        setIsPaymentsOpen(true)
      }
      if (isInExperienceManager) {
        setIsExperienceManagerOpen(true)
      }
      if (isInOperations) {
        setIsOperationsOpen(true)
      }
      if (isInIntelligence) {
        setIsIntelligenceOpen(true)
      }
      if (isInSettingsAndSetup) {
        setIsSettingsAndSetupOpen(true)
      }
    }
  }, [isInMyHqO, isInAssetManager, isInPayments, isInExperienceManager, isInOperations, isInIntelligence, isInSettingsAndSetup])

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
                          ? "text-primary dark:text-primary-400"
                          : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                        "flex items-center gap-x-2.5 rounded-md px-1.5 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
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

              {/* Asset Manager accordion */}
              <li className={cx(
                isInAssetManager ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1" : ""
              )}>
                <button
                  onClick={() => setIsAssetManagerOpen(!isAssetManagerOpen)}
                  className={cx(
                    "flex w-full items-center justify-between gap-x-2.5 rounded-md px-1.5 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                    isInAssetManager
                      ? "text-gray-900 dark:text-gray-50"
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
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
                  <ul className="mt-1 space-y-0.5 px-1">
                    {assetManagerItems.map((item) => (
                      <li key={item.name}>
                        <DrawerClose asChild>
                          <Link
                            href={item.href}
                            className={cx(
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary-400 shadow-sm"
                                : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-800",
                              "flex items-center rounded-md px-1.5 py-1.5 text-sm font-medium transition w-full",
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

              {/* Payments accordion */}
              <li className={cx(
                isInPayments ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1" : ""
              )}>
                <button
                  onClick={() => setIsPaymentsOpen(!isPaymentsOpen)}
                  className={cx(
                    "flex w-full items-center justify-between gap-x-2.5 rounded-md px-1.5 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                    isInPayments
                      ? "text-gray-900 dark:text-gray-50"
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
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
                  <ul className="mt-1 space-y-0.5 px-1">
                    {paymentsItems.map((item) => (
                      <li key={item.name}>
                        <DrawerClose asChild>
                          <Link
                            href={item.href}
                            className={cx(
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary-400 shadow-sm"
                                : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-800",
                              "flex items-center rounded-md px-1.5 py-1.5 text-sm font-medium transition w-full",
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

              {/* Experience Manager accordion */}
              <li className={cx(
                isInExperienceManager ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1" : ""
              )}>
                <button
                  onClick={() => setIsExperienceManagerOpen(!isExperienceManagerOpen)}
                  className={cx(
                    "flex w-full items-center justify-between gap-x-2.5 rounded-md px-1.5 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                    isInExperienceManager
                      ? "text-gray-900 dark:text-gray-50"
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                    focusRing,
                  )}
                  aria-expanded={isExperienceManagerOpen}
                >
                  <span className="flex items-center gap-x-2.5">
                    <RiMegaphoneLine className="size-4 shrink-0" aria-hidden="true" />
                    Experience Manager
                  </span>
                  {isExperienceManagerOpen ? (
                    <RiArrowDownSLine className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                  ) : (
                    <RiArrowRightSLine className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                  )}
                </button>

                {/* Sub-navigation items with animation */}
                <div
                  className={cx(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isExperienceManagerOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <ul className="mt-1 space-y-0.5 px-1">
                    {experienceManagerItems.map((item) => (
                      <li key={item.name}>
                        <DrawerClose asChild>
                          <Link
                            href={item.href}
                            className={cx(
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary-400 shadow-sm"
                                : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-800",
                              "flex items-center rounded-md px-1.5 py-1.5 text-sm font-medium transition w-full",
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

              {/* Operations accordion */}
              <li className={cx(
                isInOperations ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1" : ""
              )}>
                <button
                  onClick={() => setIsOperationsOpen(!isOperationsOpen)}
                  className={cx(
                    "flex w-full items-center justify-between gap-x-2.5 rounded-md px-1.5 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                    isInOperations
                      ? "text-gray-900 dark:text-gray-50"
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                    focusRing,
                  )}
                  aria-expanded={isOperationsOpen}
                >
                  <span className="flex items-center gap-x-2.5">
                    <RiDashboardLine className="size-4 shrink-0" aria-hidden="true" />
                    Operations
                  </span>
                  {isOperationsOpen ? (
                    <RiArrowDownSLine className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                  ) : (
                    <RiArrowRightSLine className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                  )}
                </button>

                {/* Sub-navigation items with animation */}
                <div
                  className={cx(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOperationsOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <ul className="mt-1 space-y-0.5 px-1">
                    {operationsItems.map((item) => (
                      <li key={item.name}>
                        <DrawerClose asChild>
                          <Link
                            href={item.href}
                            className={cx(
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary-400 shadow-sm"
                                : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-800",
                              "flex items-center rounded-md px-1.5 py-1.5 text-sm font-medium transition w-full",
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

              {/* Intelligence accordion */}
              <li className={cx(
                isInIntelligence ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1" : ""
              )}>
                <button
                  onClick={() => setIsIntelligenceOpen(!isIntelligenceOpen)}
                  className={cx(
                    "flex w-full items-center justify-between gap-x-2.5 rounded-md px-1.5 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                    isInIntelligence
                      ? "text-gray-900 dark:text-gray-50"
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                    focusRing,
                  )}
                  aria-expanded={isIntelligenceOpen}
                >
                  <span className="flex items-center gap-x-2.5">
                    <RiLineChartLine className="size-4 shrink-0" aria-hidden="true" />
                    Intelligence
                  </span>
                  {isIntelligenceOpen ? (
                    <RiArrowDownSLine className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                  ) : (
                    <RiArrowRightSLine className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                  )}
                </button>

                {/* Sub-navigation items with animation */}
                <div
                  className={cx(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isIntelligenceOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <ul className="mt-1 space-y-0.5 px-1">
                    {intelligenceItems.map((item) => (
                      <li key={item.name}>
                        <DrawerClose asChild>
                          <Link
                            href={item.href}
                            className={cx(
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary-400 shadow-sm"
                                : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-800",
                              "flex items-center rounded-md px-1.5 py-1.5 text-sm font-medium transition w-full",
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

              {/* Settings & Setup accordion */}
              <li className={cx(
                isInSettingsAndSetup ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1" : ""
              )}>
                <button
                  onClick={() => setIsSettingsAndSetupOpen(!isSettingsAndSetupOpen)}
                  className={cx(
                    "flex w-full items-center justify-between gap-x-2.5 rounded-md px-1.5 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                    isInSettingsAndSetup
                      ? "text-gray-900 dark:text-gray-50"
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                    focusRing,
                  )}
                  aria-expanded={isSettingsAndSetupOpen}
                >
                  <span className="flex items-center gap-x-2.5">
                    <RiSettings5Line className="size-4 shrink-0" aria-hidden="true" />
                    Settings & setup
                  </span>
                  {isSettingsAndSetupOpen ? (
                    <RiArrowDownSLine className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                  ) : (
                    <RiArrowRightSLine className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                  )}
                </button>

                {/* Sub-navigation items with animation */}
                <div
                  className={cx(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isSettingsAndSetupOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <ul className="mt-1 space-y-0.5 px-1">
                    {settingsAndSetupItems.map((item) => (
                      <li key={item.name}>
                        <DrawerClose asChild>
                          <Link
                            href={item.href}
                            className={cx(
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary-400 shadow-sm"
                                : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-800",
                              "flex items-center rounded-md px-1.5 py-1.5 text-sm font-medium transition w-full",
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
          </nav>
          <div className="pb-4">
            <UserProfileMobile />
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
