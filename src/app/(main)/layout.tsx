"use client"

import { CommunicationsTab } from "@/components/ui/communications/CommunicationsTab"
import { FloatingActionBar } from "@/components/ui/navigation/FloatingActionBar"
import { Header } from "@/components/ui/navigation/Header"
import { Sidebar } from "@/components/ui/navigation/Sidebar"
import { createContext, useContext, useEffect, useState } from "react"

// Create a context for the sidebar collapsed state
type SidebarContextType = {
  collapsed: boolean
  toggleCollapsed: () => void
}

const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  toggleCollapsed: () => { },
})

// Custom hook to use the sidebar context
export const useSidebar = () => useContext(SidebarContext)

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const savedCollapsed = localStorage.getItem("sidebarCollapsed")
    if (savedCollapsed) {
      setCollapsed(savedCollapsed === "true")
    }
  }, [])

  // Save collapsed state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed.toString())
  }, [collapsed])

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapsed }}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
        <Sidebar />
        <div className="flex flex-col flex-1 w-0 overflow-hidden">
          <Header />
          <main className="relative flex-1 overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="px-4 sm:px-6 md:px-8">{children}</div>
            </div>
          </main>
          <CommunicationsTab />
          <FloatingActionBar />
        </div>
      </div>
    </SidebarContext.Provider>
  )
}
