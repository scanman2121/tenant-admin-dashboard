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
  RiCalendarLine,
  RiCoinLine,
  RiDoorLockLine,
  RiLineChartLine,
  RiMegaphoneLine,
  RiMenuLine,
  RiParkingLine,
  RiSettings4Line,
  RiStore3Line,
  RiTeamLine,
  RiToolsLine,
  RiUserAddLine
} from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { HqOLogo } from "./HqOLogo"
import { UserProfileMobile } from "./UserProfile"

// Main navigation items
const navigation = [
  { name: "My HqO", href: siteConfig.baseLinks.overview, icon: RiBuilding2Line },
  { name: "Buildings", href: siteConfig.baseLinks.buildings, icon: RiBuildingLine },
  { name: "Employees", href: siteConfig.baseLinks.employees, icon: RiTeamLine },
  { name: "Vendors", href: siteConfig.baseLinks.vendors, icon: RiStore3Line },
  { name: "Visitors", href: siteConfig.baseLinks.visitors, icon: RiUserAddLine },
] as const

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

const mainNavigation = [
  { name: "My HqO", href: siteConfig.baseLinks.overview, icon: RiBuilding2Line },
  { name: "Buildings", href: siteConfig.baseLinks.buildings, icon: RiBuildingLine },
  { name: "Employees", href: siteConfig.baseLinks.employees, icon: RiTeamLine },
  { name: "Vendors", href: siteConfig.baseLinks.vendors, icon: RiStore3Line },
  { name: "Visitors", href: siteConfig.baseLinks.visitors, icon: RiUserAddLine },
  { name: "Access control", href: siteConfig.baseLinks.accessControl, icon: RiDoorLockLine },
  { name: "Resource booking", href: siteConfig.baseLinks.resourceBooking, icon: RiCalendarLine },
  { name: "Parking", href: siteConfig.baseLinks.parking, icon: RiParkingLine },
  { name: "Work orders", href: siteConfig.baseLinks.workOrders, icon: RiToolsLine },
  { name: "Credits", href: siteConfig.baseLinks.credits, icon: RiCoinLine },
] as const

export default function MobileSidebar() {
  const pathname = usePathname()
  const [isCommunicationsOpen, setIsCommunicationsOpen] = useState(false)
  const [isIntelligenceOpen, setIsIntelligenceOpen] = useState(false)
  const [isSettingsAndSetupOpen, setIsSettingsAndSetupOpen] = useState(false)

  // Check if current path is in Communications section
  const isInCommunications = communicationsItems.some(item =>
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
      setIsCommunicationsOpen(false)
      setIsIntelligenceOpen(false)
      setIsSettingsAndSetupOpen(false)
    } else {
      if (isInCommunications) {
        setIsCommunicationsOpen(true)
      }
      if (isInIntelligence) {
        setIsIntelligenceOpen(true)
      }
      if (isInSettingsAndSetup) {
        setIsSettingsAndSetupOpen(true)
      }
    }
  }, [isInMyHqO, isInCommunications, isInIntelligence, isInSettingsAndSetup])

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

              {/* Communications accordion */}
              <li className={cx(
                isInCommunications ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1" : ""
              )}>
                <button
                  onClick={() => setIsCommunicationsOpen(!isCommunicationsOpen)}
                  className={cx(
                    "flex w-full items-center justify-between gap-x-2.5 rounded-md px-1.5 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                    isInCommunications
                      ? "text-gray-900 dark:text-gray-50"
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                    focusRing,
                  )}
                  aria-expanded={isCommunicationsOpen}
                >
                  <span className="flex items-center gap-x-2.5">
                    <RiMegaphoneLine className="size-4 shrink-0" aria-hidden="true" />
                    Communications
                  </span>
                  {isCommunicationsOpen ? (
                    <RiArrowDownSLine className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                  ) : (
                    <RiArrowRightSLine className="size-4 shrink-0 transition-transform" aria-hidden="true" />
                  )}
                </button>

                {/* Sub-navigation items with animation */}
                <div
                  className={cx(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isCommunicationsOpen ? "max-h-96" : "max-h-0"
                  )}
                >
                  <ul className="mt-1 space-y-1">
                    {communicationsItems.map((item) => (
                      <li key={item.name}>
                        <DrawerClose asChild>
                          <Link
                            href={item.href}
                            className={cx(
                              "block rounded-md py-2 pl-10 pr-2 text-sm transition",
                              isActive(item.href)
                                ? "text-primary dark:text-primary-400"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
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
                    <RiSettings4Line className="size-4 shrink-0" aria-hidden="true" />
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
