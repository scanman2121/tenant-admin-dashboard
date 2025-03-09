"use client"
import { siteConfig } from "@/app/siteConfig"
import { cx, focusRing } from "@/lib/utils"
import {
  RiHome2Line,
  RiLinkM,
  RiReceiptLine,
  RiSettings5Line,
} from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HqOLogo } from "./HqOLogo"
import { UserProfileDesktop } from "./UserProfile"

const navigation = [
  { name: "My HqO", href: siteConfig.baseLinks.overview, icon: RiHome2Line },
  { name: "Resources", href: siteConfig.baseLinks.resources, icon: RiLinkM },
  { name: "Transactions", href: siteConfig.baseLinks.transactions, icon: RiReceiptLine },
  { name: "Analytics", href: siteConfig.baseLinks.analytics, icon: RiLinkM },
  {
    name: "Settings & setup",
    href: siteConfig.baseLinks.settings.general,
    icon: RiSettings5Line,
  },
] as const

const shortcuts = [
  {
    name: "Add new user",
    href: "/settings/users",
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
  const isActive = (itemHref: string) => {
    if (itemHref === siteConfig.baseLinks.settings.general) {
      return pathname.startsWith("/settings")
    }
    return pathname === itemHref || pathname.startsWith(itemHref)
  }
  return (
    <nav className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:flex-col">
      <aside className="flex w-[226px] max-w-[226px] grow flex-col gap-y-6 overflow-y-auto border-r border-gray-200 bg-white px-2 py-4 dark:border-gray-800 dark:bg-gray-950">
        <div className="flex items-center px-1">
          <HqOLogo className="h-6 w-auto" />
        </div>
        <nav
          aria-label="core navigation links"
          className="flex flex-1 flex-col space-y-10"
        >
          <ul role="list" className="space-y-0.5">
            {navigation.map((item) => (
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
            ))}
          </ul>
          <div>
            <span className="text-xs font-medium leading-6 text-gray-500">
              Shortcuts
            </span>
            <ul aria-label="shortcuts" role="list" className="space-y-0.5">
              {shortcuts.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cx(
                      pathname === item.href || pathname.startsWith(item.href)
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
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div className="mt-auto">
          <UserProfileDesktop />
        </div>
      </aside>
    </nav>
  )
}
