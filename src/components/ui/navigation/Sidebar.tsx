"use client"
import { SidebarContext } from "@/app/(main)/layout"
import { siteConfig } from "@/app/siteConfig"
import { cx, focusRing } from "@/lib/utils"
import {
  RiArrowDownSLine,
  RiBuilding2Line,
  RiBuildingLine,
  RiCalendarLine,
  RiCoinLine,
  RiDoorLockLine,
  RiMegaphoneLine,
  RiParkingLine,
  RiSettings4Line,
  RiStore3Line,
  RiTeamLine,
  RiToolsLine,
  RiUserAddLine
} from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { HqOLogo } from "./HqOLogo"
import { SidebarPopover } from "./SidebarPopover"

// Communications sub-navigation items
const communicationsItems = [
  { name: "Content", href: siteConfig.baseLinks.communications.content },
  { name: "Notifications", href: siteConfig.baseLinks.communications.notifications },
  { name: "Surveys", href: siteConfig.baseLinks.communications.surveys },
] as const

// Settings and setup sub-navigation items
const settingsAndSetupItems = [
  { name: "Features", href: siteConfig.baseLinks.settingsAndSetup.features },
  { name: "Settings", href: siteConfig.baseLinks.settingsAndSetup.settings },
] as const

// Intelligence sub-navigation items
const intelligenceItems = [
  { name: "Dashboard", href: siteConfig.baseLinks.intelligence.dashboard },
  { name: "Assessments", href: siteConfig.baseLinks.intelligence.assessments },
  { name: "About intelligence", href: siteConfig.baseLinks.intelligence.aboutIntelligence },
] as const

// Type for section IDs to ensure type safety
type SectionId = 'communications' | 'settingsAndSetup' | 'intelligence';

export function Sidebar() {
  const pathname = usePathname()
  // Use a single state for the open section
  const [openSection, setOpenSection] = useState<SectionId | null>(null)
  // Get collapsed state from context
  const { isCollapsed, setIsCollapsed } = useContext(SidebarContext)

  const isInCommunications = communicationsItems.some(item =>
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
    } else if (isInCommunications) {
      setOpenSection('communications')
    } else if (isInSettingsAndSetup) {
      setOpenSection('settingsAndSetup')
    } else if (isInIntelligence) {
      setOpenSection('intelligence')
    }
  }, [isInMyHqO, isInCommunications, isInSettingsAndSetup, isInIntelligence])

  const isActive = (itemHref: string) => {
    if (itemHref === siteConfig.baseLinks.settings.general) {
      return pathname.startsWith("/settings")
    }
    return pathname === itemHref || pathname.startsWith(itemHref + "/")
  }

  // Toggle section open/closed
  const toggleSection = (section: SectionId) => {
    // Don't toggle sections when sidebar is collapsed
    if (isCollapsed) return
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <nav className="hidden lg:block lg:fixed lg:inset-y-0 lg:z-40 lg:flex-shrink-0">
      <div className={cx(
        "flex h-full flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 transition-all duration-300",
        isCollapsed ? "w-16" : "w-56"
      )}>
        <div className="flex h-16 shrink-0 items-center px-3">
          <Link href="/" className={cx(isCollapsed ? "pl-0" : "pl-1.5")}>
            <HqOLogo className="h-6 w-auto" />
            <span className="sr-only">HqO</span>
          </Link>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cx(
              "ml-auto rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50",
              focusRing
            )}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <RiArrowDownSLine
              className={cx(
                "size-4 shrink-0 transition-transform duration-300",
                isCollapsed ? "-rotate-90" : "rotate-90"
              )}
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto">
          <nav className="flex-1">
            <ul role="list" className="flex flex-1 flex-col gap-y-7 px-3">
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

                  {/* Buildings */}
                  <li>
                    <Link
                      href={siteConfig.baseLinks.buildings}
                      className={cx(
                        "group flex items-center gap-x-3 rounded-md py-2 text-[13px] transition",
                        isCollapsed ? "px-2 justify-center" : "px-3",
                        isActive(siteConfig.baseLinks.buildings)
                          ? "bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary-400 shadow-sm mx-1"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900",
                        focusRing,
                      )}
                    >
                      <RiBuildingLine
                        className={cx(
                          "size-4 shrink-0",
                          isActive(siteConfig.baseLinks.buildings)
                            ? "text-primary dark:text-primary-400"
                            : "text-[#696E72] group-hover:text-gray-500 dark:group-hover:text-gray-400",
                        )}
                        aria-hidden="true"
                      />
                      {!isCollapsed && <span>Buildings</span>}
                    </Link>
                  </li>

                  {/* Users */}
                  <li>
                    <Link
                      href={siteConfig.baseLinks.employees}
                      className={cx(
                        "group flex items-center gap-x-3 rounded-md py-2 text-[13px] transition",
                        isCollapsed ? "px-2 justify-center" : "px-3",
                        isActive(siteConfig.baseLinks.employees)
                          ? "bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary-400 shadow-sm mx-1"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900",
                        focusRing,
                      )}
                    >
                      <RiTeamLine
                        className={cx(
                          "size-4 shrink-0",
                          isActive(siteConfig.baseLinks.employees)
                            ? "text-primary dark:text-primary-400"
                            : "text-[#696E72] group-hover:text-gray-500 dark:group-hover:text-gray-400",
                        )}
                        aria-hidden="true"
                      />
                      {!isCollapsed && <span>Employees</span>}
                    </Link>
                  </li>

                  {/* Vendors */}
                  <li>
                    <Link
                      href={siteConfig.baseLinks.vendors}
                      className={cx(
                        "group flex items-center gap-x-3 rounded-md py-2 text-[13px] transition",
                        isCollapsed ? "px-2 justify-center" : "px-3",
                        isActive(siteConfig.baseLinks.vendors)
                          ? "bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary-400 shadow-sm mx-1"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900",
                        focusRing,
                      )}
                    >
                      <RiStore3Line
                        className={cx(
                          "size-4 shrink-0",
                          isActive(siteConfig.baseLinks.vendors)
                            ? "text-primary dark:text-primary-400"
                            : "text-[#696E72] group-hover:text-gray-500 dark:group-hover:text-gray-400",
                        )}
                        aria-hidden="true"
                      />
                      {!isCollapsed && <span>Vendors</span>}
                    </Link>
                  </li>

                  {/* Visitors */}
                  <li>
                    <Link
                      href={siteConfig.baseLinks.visitors}
                      className={cx(
                        "group flex items-center gap-x-3 rounded-md py-2 text-[13px] transition",
                        isCollapsed ? "px-2 justify-center" : "px-3",
                        isActive(siteConfig.baseLinks.visitors)
                          ? "bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary-400 shadow-sm mx-1"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900",
                        focusRing,
                      )}
                    >
                      <RiUserAddLine
                        className={cx(
                          "size-4 shrink-0",
                          isActive(siteConfig.baseLinks.visitors)
                            ? "text-primary dark:text-primary-400"
                            : "text-[#696E72] group-hover:text-gray-500 dark:group-hover:text-gray-400",
                        )}
                        aria-hidden="true"
                      />
                      {!isCollapsed && <span>Visitors</span>}
                    </Link>
                  </li>

                  {/* Access Control */}
                  <li>
                    <Link
                      href={siteConfig.baseLinks.accessControl}
                      className={cx(
                        "group flex items-center gap-x-3 rounded-md py-2 text-[13px] transition",
                        isCollapsed ? "px-2 justify-center" : "px-3",
                        isActive(siteConfig.baseLinks.accessControl)
                          ? "bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary-400 shadow-sm mx-1"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900",
                        focusRing,
                      )}
                    >
                      <RiDoorLockLine
                        className={cx(
                          "size-4 shrink-0",
                          isActive(siteConfig.baseLinks.accessControl)
                            ? "text-primary dark:text-primary-400"
                            : "text-[#696E72] group-hover:text-gray-500 dark:group-hover:text-gray-400",
                        )}
                        aria-hidden="true"
                      />
                      {!isCollapsed && <span>Access control</span>}
                    </Link>
                  </li>

                  {/* Resource Booking */}
                  <li>
                    <Link
                      href={siteConfig.baseLinks.resourceBooking}
                      className={cx(
                        "group flex items-center gap-x-3 rounded-md py-2 text-[13px] transition",
                        isCollapsed ? "px-2 justify-center" : "px-3",
                        isActive(siteConfig.baseLinks.resourceBooking)
                          ? "bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary-400 shadow-sm mx-1"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900",
                        focusRing,
                      )}
                    >
                      <RiCalendarLine
                        className={cx(
                          "size-4 shrink-0",
                          isActive(siteConfig.baseLinks.resourceBooking)
                            ? "text-primary dark:text-primary-400"
                            : "text-[#696E72] group-hover:text-gray-500 dark:group-hover:text-gray-400",
                        )}
                        aria-hidden="true"
                      />
                      {!isCollapsed && <span>Resource booking</span>}
                    </Link>
                  </li>

                  {/* Parking */}
                  <li>
                    <Link
                      href={siteConfig.baseLinks.parking}
                      className={cx(
                        "group flex items-center gap-x-3 rounded-md py-2 text-[13px] transition",
                        isCollapsed ? "px-2 justify-center" : "px-3",
                        isActive(siteConfig.baseLinks.parking)
                          ? "bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary-400 shadow-sm mx-1"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900",
                        focusRing,
                      )}
                    >
                      <RiParkingLine
                        className={cx(
                          "size-4 shrink-0",
                          isActive(siteConfig.baseLinks.parking)
                            ? "text-primary dark:text-primary-400"
                            : "text-[#696E72] group-hover:text-gray-500 dark:group-hover:text-gray-400",
                        )}
                        aria-hidden="true"
                      />
                      {!isCollapsed && <span>Parking</span>}
                    </Link>
                  </li>

                  {/* Work Orders */}
                  <li>
                    <Link
                      href={siteConfig.baseLinks.workOrders}
                      className={cx(
                        "group flex items-center gap-x-3 rounded-md py-2 text-[13px] transition",
                        isCollapsed ? "px-2 justify-center" : "px-3",
                        isActive(siteConfig.baseLinks.workOrders)
                          ? "bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary-400 shadow-sm mx-1"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900",
                        focusRing,
                      )}
                    >
                      <RiToolsLine
                        className={cx(
                          "size-4 shrink-0",
                          isActive(siteConfig.baseLinks.workOrders)
                            ? "text-primary dark:text-primary-400"
                            : "text-[#696E72] group-hover:text-gray-500 dark:group-hover:text-gray-400",
                        )}
                        aria-hidden="true"
                      />
                      {!isCollapsed && <span>Work orders</span>}
                    </Link>
                  </li>

                  {/* Credits */}
                  <li>
                    <Link
                      href={siteConfig.baseLinks.credits}
                      className={cx(
                        "group flex items-center gap-x-3 rounded-md py-2 text-[13px] transition",
                        isCollapsed ? "px-2 justify-center" : "px-3",
                        isActive(siteConfig.baseLinks.credits)
                          ? "bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary-400 shadow-sm mx-1"
                          : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900",
                        focusRing,
                      )}
                    >
                      <RiCoinLine
                        className={cx(
                          "size-4 shrink-0",
                          isActive(siteConfig.baseLinks.credits)
                            ? "text-primary dark:text-primary-400"
                            : "text-[#696E72] group-hover:text-gray-500 dark:group-hover:text-gray-400",
                        )}
                        aria-hidden="true"
                      />
                      {!isCollapsed && <span>Credits</span>}
                    </Link>
                  </li>

                  {/* Communications accordion */}
                  <li className={cx(
                    (openSection === 'communications' || isInCommunications) && !isCollapsed
                      ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1"
                      : ""
                  )}>
                    {isCollapsed ? (
                      <SidebarPopover
                        icon={<RiMegaphoneLine className="size-4 shrink-0" aria-hidden="true" />}
                        title="Communications"
                        items={communicationsItems}
                        isActive={isActive}
                        isInSection={isInCommunications}
                      />
                    ) : (
                      <button
                        onClick={() => toggleSection('communications')}
                        className={cx(
                          "flex w-full items-center gap-x-2.5 py-2 text-[13px] transition",
                          isCollapsed ? "px-2 justify-center" : "px-3 justify-between",
                          (openSection === 'communications' || isInCommunications)
                            ? "text-gray-900 dark:text-gray-50"
                            : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900 rounded-md",
                          focusRing,
                        )}
                        aria-expanded={openSection === 'communications'}
                      >
                        <span className={cx("flex items-center", isCollapsed ? "" : "gap-x-2.5")}>
                          <RiMegaphoneLine className="size-4 shrink-0" aria-hidden="true" />
                          {!isCollapsed && "Communications"}
                        </span>
                        {!isCollapsed && (
                          <RiArrowDownSLine
                            className={cx(
                              "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                              openSection === 'communications' ? "rotate-0" : "-rotate-90"
                            )}
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    )}

                    {/* Sub-navigation items with animation */}
                    {!isCollapsed && openSection === 'communications' && (
                      <ul className="mt-1 space-y-1">
                        {communicationsItems.map((item) => (
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
                        icon={<RiSettings4Line className="size-4 shrink-0" aria-hidden="true" />}
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
                          <RiSettings4Line className="size-4 shrink-0" aria-hidden="true" />
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
            </ul>
          </nav>
        </div>
      </div>
    </nav>
  )
}
