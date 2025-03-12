"use client"
import { SidebarContext } from "@/app/(main)/layout"
import { siteConfig } from "@/app/siteConfig"
import { cx, focusRing } from "@/lib/utils"
import {
  RiArrowDownSLine,
  RiBuilding2Line,
  RiBuildingLine,
  RiDashboardLine,
  RiLineChartLine,
  RiMegaphoneLine,
  RiReceiptLine,
  RiSettings5Line
} from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { HqOLogo } from "./HqOLogo"
import { SidebarPopover } from "./SidebarPopover"
import { UserProfileDesktop } from "./UserProfile"

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

// Type for section IDs to ensure type safety
type SectionId = 'assetManager' | 'payments' | 'experienceManager' | 'operations' | 'settingsAndSetup' | 'intelligence';

export function Sidebar() {
  const pathname = usePathname()
  // Use a single state for the open section
  const [openSection, setOpenSection] = useState<SectionId | null>(null)
  // Get collapsed state from context
  const { isCollapsed } = useContext(SidebarContext)

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
    // Don't toggle sections when sidebar is collapsed
    if (isCollapsed) return
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <nav className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:flex-col">
      <div className={cx(
        "flex h-full flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 transition-all duration-300",
        isCollapsed ? "w-16 px-2" : "w-56 px-3"
      )}>
        <div className="flex h-16 shrink-0 items-center justify-start">
          <Link href="/" className={cx(isCollapsed ? "pl-0" : "pl-1.5")}>
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
                      "group flex items-center gap-x-3 rounded-md py-2 text-[13px] transition",
                      isCollapsed ? "px-2 justify-center" : "px-3",
                      isActive(siteConfig.baseLinks.overview)
                        ? "bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary-400 shadow-sm mx-1"
                        : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900",
                      focusRing,
                    )}
                  >
                    <RiBuilding2Line
                      className={cx(
                        "size-4 shrink-0",
                        isActive(siteConfig.baseLinks.overview)
                          ? "text-primary dark:text-primary-400"
                          : "text-[#696E72] group-hover:text-gray-500 dark:group-hover:text-gray-400",
                      )}
                      aria-hidden="true"
                    />
                    {!isCollapsed && <span>My HqO</span>}
                  </Link>
                </li>

                {/* Asset Manager accordion */}
                <li className={cx(
                  (openSection === 'assetManager' || isInAssetManager) && !isCollapsed
                    ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1"
                    : ""
                )}>
                  {isCollapsed ? (
                    <SidebarPopover
                      icon={<RiBuildingLine className="size-4 shrink-0" aria-hidden="true" />}
                      title="Asset manager"
                      items={assetManagerItems}
                      isActive={isActive}
                      isInSection={isInAssetManager}
                    />
                  ) : (
                    <button
                      onClick={() => toggleSection('assetManager')}
                      className={cx(
                        "flex w-full items-center gap-x-2.5 py-2 text-[13px] transition",
                        isCollapsed ? "px-2 justify-center" : "px-3 justify-between",
                        (openSection === 'assetManager' || isInAssetManager)
                          ? "text-gray-900 dark:text-gray-50"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900 rounded-md",
                        focusRing,
                      )}
                      aria-expanded={openSection === 'assetManager'}
                    >
                      <span className={cx("flex items-center", isCollapsed ? "" : "gap-x-2.5")}>
                        <RiBuildingLine className="size-4 shrink-0" aria-hidden="true" />
                        {!isCollapsed && "Asset manager"}
                      </span>
                      {!isCollapsed && (
                        <RiArrowDownSLine
                          className={cx(
                            "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                            openSection === 'assetManager' ? "rotate-0" : "-rotate-90"
                          )}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  )}

                  {/* Sub-navigation items with animation */}
                  {!isCollapsed && openSection === 'assetManager' && (
                    <ul className="mt-1 space-y-1">
                      {assetManagerItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cx(
                              "block rounded-md py-2 pl-10 pr-2 text-[13px] transition",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary-400 shadow-sm mx-1"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900",
                              focusRing,
                            )}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* Experience Manager accordion */}
                <li className={cx(
                  (openSection === 'experienceManager' || isInExperienceManager) && !isCollapsed
                    ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1"
                    : ""
                )}>
                  {isCollapsed ? (
                    <SidebarPopover
                      icon={<RiMegaphoneLine className="size-4 shrink-0" aria-hidden="true" />}
                      title="Experience manager"
                      items={experienceManagerItems}
                      isActive={isActive}
                      isInSection={isInExperienceManager}
                    />
                  ) : (
                    <button
                      onClick={() => toggleSection('experienceManager')}
                      className={cx(
                        "flex w-full items-center gap-x-2.5 py-2 text-[13px] transition",
                        isCollapsed ? "px-2 justify-center" : "px-3 justify-between",
                        (openSection === 'experienceManager' || isInExperienceManager)
                          ? "text-gray-900 dark:text-gray-50"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900 rounded-md",
                        focusRing,
                      )}
                      aria-expanded={openSection === 'experienceManager'}
                    >
                      <span className={cx("flex items-center", isCollapsed ? "" : "gap-x-2.5")}>
                        <RiMegaphoneLine className="size-4 shrink-0" aria-hidden="true" />
                        {!isCollapsed && "Experience manager"}
                      </span>
                      {!isCollapsed && (
                        <RiArrowDownSLine
                          className={cx(
                            "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                            openSection === 'experienceManager' ? "rotate-0" : "-rotate-90"
                          )}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  )}

                  {/* Sub-navigation items with animation */}
                  {!isCollapsed && openSection === 'experienceManager' && (
                    <ul className="mt-1 space-y-1">
                      {experienceManagerItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cx(
                              "block rounded-md py-2 pl-10 pr-2 text-[13px] transition",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary-400 shadow-sm mx-1"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900",
                              focusRing,
                            )}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* Operations accordion */}
                <li className={cx(
                  (openSection === 'operations' || isInOperations) && !isCollapsed
                    ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1"
                    : ""
                )}>
                  {isCollapsed ? (
                    <SidebarPopover
                      icon={<RiDashboardLine className="size-4 shrink-0" aria-hidden="true" />}
                      title="Operations"
                      items={operationsItems}
                      isActive={isActive}
                      isInSection={isInOperations}
                    />
                  ) : (
                    <button
                      onClick={() => toggleSection('operations')}
                      className={cx(
                        "flex w-full items-center gap-x-2.5 py-2 text-[13px] transition",
                        isCollapsed ? "px-2 justify-center" : "px-3 justify-between",
                        (openSection === 'operations' || isInOperations)
                          ? "text-gray-900 dark:text-gray-50"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900 rounded-md",
                        focusRing,
                      )}
                      aria-expanded={openSection === 'operations'}
                    >
                      <span className={cx("flex items-center", isCollapsed ? "" : "gap-x-2.5")}>
                        <RiDashboardLine className="size-4 shrink-0" aria-hidden="true" />
                        {!isCollapsed && "Operations"}
                      </span>
                      {!isCollapsed && (
                        <RiArrowDownSLine
                          className={cx(
                            "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                            openSection === 'operations' ? "rotate-0" : "-rotate-90"
                          )}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  )}

                  {/* Sub-navigation items with animation */}
                  {!isCollapsed && openSection === 'operations' && (
                    <ul className="mt-1 space-y-1">
                      {operationsItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cx(
                              "block rounded-md py-2 pl-10 pr-2 text-[13px] transition",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary-400 shadow-sm mx-1"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900",
                              focusRing,
                            )}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* Payments accordion */}
                <li className={cx(
                  (openSection === 'payments' || isInPayments) && !isCollapsed
                    ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1"
                    : ""
                )}>
                  {isCollapsed ? (
                    <SidebarPopover
                      icon={<RiReceiptLine className="size-4 shrink-0" aria-hidden="true" />}
                      title="Payments"
                      items={paymentsItems}
                      isActive={isActive}
                      isInSection={isInPayments}
                    />
                  ) : (
                    <button
                      onClick={() => toggleSection('payments')}
                      className={cx(
                        "flex w-full items-center gap-x-2.5 py-2 text-[13px] transition",
                        isCollapsed ? "px-2 justify-center" : "px-3 justify-between",
                        (openSection === 'payments' || isInPayments)
                          ? "text-gray-900 dark:text-gray-50"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900 rounded-md",
                        focusRing,
                      )}
                      aria-expanded={openSection === 'payments'}
                    >
                      <span className={cx("flex items-center", isCollapsed ? "" : "gap-x-2.5")}>
                        <RiReceiptLine className="size-4 shrink-0" aria-hidden="true" />
                        {!isCollapsed && "Payments"}
                      </span>
                      {!isCollapsed && (
                        <RiArrowDownSLine
                          className={cx(
                            "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                            openSection === 'payments' ? "rotate-0" : "-rotate-90"
                          )}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  )}

                  {/* Sub-navigation items with animation */}
                  {!isCollapsed && openSection === 'payments' && (
                    <ul className="mt-1 space-y-1">
                      {paymentsItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cx(
                              "block rounded-md py-2 pl-10 pr-2 text-[13px] transition",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary-400 shadow-sm mx-1"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900",
                              focusRing,
                            )}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* Intelligence accordion */}
                <li className={cx(
                  (openSection === 'intelligence' || isInIntelligence) && !isCollapsed
                    ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1"
                    : ""
                )}>
                  {isCollapsed ? (
                    <SidebarPopover
                      icon={<RiLineChartLine className="size-4 shrink-0" aria-hidden="true" />}
                      title="Intelligence"
                      items={intelligenceItems}
                      isActive={isActive}
                      isInSection={isInIntelligence}
                    />
                  ) : (
                    <button
                      onClick={() => toggleSection('intelligence')}
                      className={cx(
                        "flex w-full items-center gap-x-2.5 py-2 text-[13px] transition",
                        isCollapsed ? "px-2 justify-center" : "px-3 justify-between",
                        (openSection === 'intelligence' || isInIntelligence)
                          ? "text-gray-900 dark:text-gray-50"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900 rounded-md",
                        focusRing,
                      )}
                      aria-expanded={openSection === 'intelligence'}
                    >
                      <span className={cx("flex items-center", isCollapsed ? "" : "gap-x-2.5")}>
                        <RiLineChartLine className="size-4 shrink-0" aria-hidden="true" />
                        {!isCollapsed && "Intelligence"}
                      </span>
                      {!isCollapsed && (
                        <RiArrowDownSLine
                          className={cx(
                            "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                            openSection === 'intelligence' ? "rotate-0" : "-rotate-90"
                          )}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  )}

                  {/* Sub-navigation items with animation */}
                  {!isCollapsed && openSection === 'intelligence' && (
                    <ul className="mt-1 space-y-1">
                      {intelligenceItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cx(
                              "block rounded-md py-2 pl-10 pr-2 text-[13px] transition",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary-400 shadow-sm mx-1"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900",
                              focusRing,
                            )}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* Settings and setup accordion */}
                <li className={cx(
                  (openSection === 'settingsAndSetup' || isInSettingsAndSetup) && !isCollapsed
                    ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1"
                    : ""
                )}>
                  {isCollapsed ? (
                    <SidebarPopover
                      icon={<RiSettings5Line className="size-4 shrink-0" aria-hidden="true" />}
                      title="Settings and setup"
                      items={settingsAndSetupItems}
                      isActive={isActive}
                      isInSection={isInSettingsAndSetup}
                    />
                  ) : (
                    <button
                      onClick={() => toggleSection('settingsAndSetup')}
                      className={cx(
                        "flex w-full items-center gap-x-2.5 py-2 text-[13px] transition",
                        isCollapsed ? "px-2 justify-center" : "px-3 justify-between",
                        (openSection === 'settingsAndSetup' || isInSettingsAndSetup)
                          ? "text-gray-900 dark:text-gray-50"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900 rounded-md",
                        focusRing,
                      )}
                      aria-expanded={openSection === 'settingsAndSetup'}
                    >
                      <span className={cx("flex items-center", isCollapsed ? "" : "gap-x-2.5")}>
                        <RiSettings5Line className="size-4 shrink-0" aria-hidden="true" />
                        {!isCollapsed && "Settings and setup"}
                      </span>
                      {!isCollapsed && (
                        <RiArrowDownSLine
                          className={cx(
                            "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                            openSection === 'settingsAndSetup' ? "rotate-0" : "-rotate-90"
                          )}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  )}

                  {/* Sub-navigation items with animation */}
                  {!isCollapsed && openSection === 'settingsAndSetup' && (
                    <ul className="mt-1 space-y-1">
                      {settingsAndSetupItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cx(
                              "block rounded-md py-2 pl-10 pr-2 text-[13px] transition",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary-400 shadow-sm mx-1"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900",
                              focusRing,
                            )}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            </li>

            {/* User profile at the bottom */}
            <li className="mt-auto">
              <UserProfileDesktop isCollapsed={isCollapsed} />
            </li>
          </ul>
        </nav>
      </div>
    </nav>
  )
}
