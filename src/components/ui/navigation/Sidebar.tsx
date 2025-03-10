"use client"
import { siteConfig } from "@/app/siteConfig"
import { cx, focusRing } from "@/lib/utils"
import {
  RiArrowDownSLine,
  RiBuildingLine,
  RiDashboardLine,
  RiHome2Line,
  RiLineChartLine,
  RiLinkM,
  RiMegaphoneLine,
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
  { name: "Access Control", href: siteConfig.baseLinks.operations.accessControl },
  { name: "Mobile Access", href: siteConfig.baseLinks.operations.mobileAccess },
  { name: "Visitor Management", href: siteConfig.baseLinks.operations.visitorManagement },
  { name: "Capacity Manager", href: siteConfig.baseLinks.operations.capacityManager },
  { name: "Resource Booking", href: siteConfig.baseLinks.operations.resourceBooking },
  { name: "Work Orders", href: siteConfig.baseLinks.operations.workOrders },
  { name: "Parking", href: siteConfig.baseLinks.operations.parking },
  { name: "Energy consumption", href: siteConfig.baseLinks.operations.energyConsumption },
] as const

// Settings and setup sub-navigation items
const settingsAndSetupItems = [
  { name: "Features", href: siteConfig.baseLinks.settingsAndSetup.features },
  { name: "SSO Apps", href: siteConfig.baseLinks.settingsAndSetup.ssoApps },
  { name: "Connected apps", href: siteConfig.baseLinks.settingsAndSetup.connectedApps },
  { name: "Settings", href: siteConfig.baseLinks.settingsAndSetup.settings },
  { name: "Theme", href: siteConfig.baseLinks.settingsAndSetup.theme },
] as const

// Intelligence sub-navigation items
const intelligenceItems = [
  { name: "Dashboard", href: siteConfig.baseLinks.intelligence.dashboard },
  { name: "Assessments", href: siteConfig.baseLinks.intelligence.assessments },
  { name: "About Intelligence", href: siteConfig.baseLinks.intelligence.aboutIntelligence },
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

// Type for section IDs to ensure type safety
type SectionId = 'assetManager' | 'payments' | 'experienceManager' | 'operations' | 'settingsAndSetup' | 'intelligence';

export function Sidebar() {
  const pathname = usePathname()
  // Use a single state for the open section
  const [openSection, setOpenSection] = useState<SectionId | null>(null)

  // Check if current path is in each section
  const isInAssetManager = assetManagerItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  const isInPayments = paymentsItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  const isInExperienceManager = experienceManagerItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  const isInOperations = operationsItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  const isInSettingsAndSetup = settingsAndSetupItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  const isInIntelligence = intelligenceItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  // Check if we're on the My HqO page
  const isInMyHqO = pathname === siteConfig.baseLinks.overview || pathname.startsWith(siteConfig.baseLinks.overview + "/")

  // Auto-expand the section that contains the current path
  useEffect(() => {
    if (isInMyHqO) {
      // Collapse all sections when My HqO is active
      setOpenSection(null)
    } else if (isInAssetManager) {
      setOpenSection('assetManager')
    } else if (isInPayments) {
      setOpenSection('payments')
    } else if (isInExperienceManager) {
      setOpenSection('experienceManager')
    } else if (isInOperations) {
      setOpenSection('operations')
    } else if (isInSettingsAndSetup) {
      setOpenSection('settingsAndSetup')
    } else if (isInIntelligence) {
      setOpenSection('intelligence')
    }
  }, [isInMyHqO, isInAssetManager, isInPayments, isInExperienceManager, isInOperations, isInSettingsAndSetup, isInIntelligence])

  const isActive = (itemHref: string) => {
    if (itemHref === siteConfig.baseLinks.settings.general) {
      return pathname.startsWith("/settings")
    }
    return pathname === itemHref || pathname.startsWith(itemHref)
  }

  // Toggle section open/closed
  const toggleSection = (section: SectionId) => {
    setOpenSection(openSection === section ? null : section)
  }

  // Render a navigation item
  const renderNavItem = (item: typeof navigation[number]) => (
    <li key={item.name}>
      <Link
        href={item.href}
        className={cx(
          isActive(item.href)
            ? "text-primary dark:text-primary-400 bg-white dark:bg-gray-900"
            : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
          "flex items-center gap-x-2.5 rounded-md px-3 py-2 text-sm transition hover:bg-gray-100 hover:dark:bg-gray-900",
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
      <div className="flex h-full flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-3 dark:border-gray-800 dark:bg-gray-950">
        <div className="flex h-16 shrink-0 items-center">
          <Link href="/" className="pl-1.5">
            <HqOLogo className="h-6 w-auto" />
            <span className="sr-only">HqO</span>
          </Link>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="space-y-1">
                {/* My HqO */}
                <li>
                  <Link
                    href={siteConfig.baseLinks.overview}
                    className={cx(
                      "group flex items-center gap-x-3 rounded-md px-3 py-2 text-[13px] transition",
                      isActive(siteConfig.baseLinks.overview)
                        ? "bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary-400"
                        : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900",
                      focusRing,
                    )}
                  >
                    <RiHome2Line
                      className={cx(
                        "size-4 shrink-0",
                        isActive(siteConfig.baseLinks.overview)
                          ? "text-primary dark:text-primary-400"
                          : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-400",
                      )}
                      aria-hidden="true"
                    />
                    My HqO
                  </Link>
                </li>

                {/* Asset Manager accordion */}
                <li className={cx(
                  (openSection === 'assetManager' || isInAssetManager)
                    ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1"
                    : ""
                )}>
                  <button
                    onClick={() => toggleSection('assetManager')}
                    className={cx(
                      "flex w-full items-center justify-between gap-x-2.5 px-3 py-2 text-[13px] transition",
                      (openSection === 'assetManager' || isInAssetManager)
                        ? "text-gray-900 dark:text-gray-50"
                        : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900 rounded-md",
                      focusRing,
                    )}
                    aria-expanded={openSection === 'assetManager'}
                  >
                    <span className="flex items-center gap-x-2.5">
                      <RiBuildingLine className="size-4 shrink-0" aria-hidden="true" />
                      Asset Manager
                    </span>
                    <RiArrowDownSLine
                      className={cx(
                        "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                        openSection === 'assetManager' ? "rotate-0" : "-rotate-90"
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Sub-navigation items with animation */}
                  <div
                    className={cx(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      openSection === 'assetManager' ? "max-h-64 opacity-100 mt-1" : "max-h-0 opacity-0"
                    )}
                  >
                    <ul className="space-y-1">
                      {assetManagerItems.map((item) => (
                        <li key={item.name}>
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
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

                {/* Experience Manager accordion */}
                <li className={cx(
                  (openSection === 'experienceManager' || isInExperienceManager)
                    ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1"
                    : ""
                )}>
                  <button
                    onClick={() => toggleSection('experienceManager')}
                    className={cx(
                      "flex w-full items-center justify-between gap-x-2.5 px-3 py-2 text-[13px] transition",
                      (openSection === 'experienceManager' || isInExperienceManager)
                        ? "text-gray-900 dark:text-gray-50"
                        : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900 rounded-md",
                      focusRing,
                    )}
                    aria-expanded={openSection === 'experienceManager'}
                  >
                    <span className="flex items-center gap-x-2.5">
                      <RiMegaphoneLine className="size-4 shrink-0" aria-hidden="true" />
                      Experience Manager
                    </span>
                    <RiArrowDownSLine
                      className={cx(
                        "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                        openSection === 'experienceManager' ? "rotate-0" : "-rotate-90"
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Sub-navigation items with animation */}
                  <div
                    className={cx(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      openSection === 'experienceManager' ? "max-h-64 opacity-100 mt-1" : "max-h-0 opacity-0"
                    )}
                  >
                    <ul className="space-y-1">
                      {experienceManagerItems.map((item) => (
                        <li key={item.name}>
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
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

                {/* Operations accordion */}
                <li className={cx(
                  (openSection === 'operations' || isInOperations)
                    ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1"
                    : ""
                )}>
                  <button
                    onClick={() => toggleSection('operations')}
                    className={cx(
                      "flex w-full items-center justify-between gap-x-2.5 px-3 py-2 text-[13px] transition",
                      (openSection === 'operations' || isInOperations)
                        ? "text-gray-900 dark:text-gray-50"
                        : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900 rounded-md",
                      focusRing,
                    )}
                    aria-expanded={openSection === 'operations'}
                  >
                    <span className="flex items-center gap-x-2.5">
                      <RiDashboardLine className="size-4 shrink-0" aria-hidden="true" />
                      Operations
                    </span>
                    <RiArrowDownSLine
                      className={cx(
                        "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                        openSection === 'operations' ? "rotate-0" : "-rotate-90"
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Sub-navigation items with animation */}
                  <div
                    className={cx(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      openSection === 'operations' ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
                    )}
                  >
                    <ul className="space-y-1">
                      {operationsItems.map((item) => (
                        <li key={item.name}>
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
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

                {/* Payments accordion */}
                <li className={cx(
                  (openSection === 'payments' || isInPayments)
                    ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1"
                    : ""
                )}>
                  <button
                    onClick={() => toggleSection('payments')}
                    className={cx(
                      "flex w-full items-center justify-between gap-x-2.5 px-3 py-2 text-[13px] transition",
                      (openSection === 'payments' || isInPayments)
                        ? "text-gray-900 dark:text-gray-50"
                        : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900 rounded-md",
                      focusRing,
                    )}
                    aria-expanded={openSection === 'payments'}
                  >
                    <span className="flex items-center gap-x-2.5">
                      <RiReceiptLine className="size-4 shrink-0" aria-hidden="true" />
                      Payments
                    </span>
                    <RiArrowDownSLine
                      className={cx(
                        "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                        openSection === 'payments' ? "rotate-0" : "-rotate-90"
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Sub-navigation items with animation */}
                  <div
                    className={cx(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      openSection === 'payments' ? "max-h-64 opacity-100 mt-1" : "max-h-0 opacity-0"
                    )}
                  >
                    <ul className="space-y-1">
                      {paymentsItems.map((item) => (
                        <li key={item.name}>
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
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

                {/* Intelligence accordion */}
                <li className={cx(
                  (openSection === 'intelligence' || isInIntelligence)
                    ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1"
                    : ""
                )}>
                  <button
                    onClick={() => toggleSection('intelligence')}
                    className={cx(
                      "flex w-full items-center justify-between gap-x-2.5 px-3 py-2 text-[13px] transition",
                      (openSection === 'intelligence' || isInIntelligence)
                        ? "text-gray-900 dark:text-gray-50"
                        : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900 rounded-md",
                      focusRing,
                    )}
                    aria-expanded={openSection === 'intelligence'}
                  >
                    <span className="flex items-center gap-x-2.5">
                      <RiLineChartLine className="size-4 shrink-0" aria-hidden="true" />
                      Intelligence
                    </span>
                    <RiArrowDownSLine
                      className={cx(
                        "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                        openSection === 'intelligence' ? "rotate-0" : "-rotate-90"
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Sub-navigation items with animation */}
                  <div
                    className={cx(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      openSection === 'intelligence' ? "max-h-64 opacity-100 mt-1" : "max-h-0 opacity-0"
                    )}
                  >
                    <ul className="space-y-1">
                      {intelligenceItems.map((item) => (
                        <li key={item.name}>
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
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

                {/* Settings and setup accordion */}
                <li className={cx(
                  (openSection === 'settingsAndSetup' || isInSettingsAndSetup)
                    ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1"
                    : ""
                )}>
                  <button
                    onClick={() => toggleSection('settingsAndSetup')}
                    className={cx(
                      "flex w-full items-center justify-between gap-x-2.5 px-3 py-2 text-[13px] transition",
                      (openSection === 'settingsAndSetup' || isInSettingsAndSetup)
                        ? "text-gray-900 dark:text-gray-50"
                        : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900 rounded-md",
                      focusRing,
                    )}
                    aria-expanded={openSection === 'settingsAndSetup'}
                  >
                    <span className="flex items-center gap-x-2.5">
                      <RiSettings5Line className="size-4 shrink-0" aria-hidden="true" />
                      Settings and setup
                    </span>
                    <RiArrowDownSLine
                      className={cx(
                        "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                        openSection === 'settingsAndSetup' ? "rotate-0" : "-rotate-90"
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Sub-navigation items with animation */}
                  <div
                    className={cx(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      openSection === 'settingsAndSetup' ? "max-h-64 opacity-100 mt-1" : "max-h-0 opacity-0"
                    )}
                  >
                    <ul className="space-y-1">
                      {settingsAndSetupItems.map((item) => (
                        <li key={item.name}>
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
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <UserProfileDesktop />
      </div>
    </nav>
  )
}
