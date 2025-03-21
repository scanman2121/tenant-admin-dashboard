"use client"

import { CommunicationsTab } from "@/components/ui/communications/CommunicationsTab"
import { FloatingActionBar } from "@/components/ui/navigation/FloatingActionBar"
import { Header } from "@/components/ui/navigation/Header"
import { Sidebar } from "@/components/ui/navigation/Sidebar"
import { createContext, useContext, useEffect, useState } from "react"

// Create a context for the sidebar collapsed state
interface SidebarContextType {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
}

export const SidebarContext = createContext<SidebarContextType>({
  isCollapsed: false,
  setIsCollapsed: () => { },
})

// Custom hook to use the sidebar context
export const useSidebar = () => useContext(SidebarContext)

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const savedCollapsed = localStorage.getItem("sidebarCollapsed")
    if (savedCollapsed) {
      setIsCollapsed(savedCollapsed === "true")
    }
  }, [])

  // Save collapsed state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", isCollapsed.toString())
  }, [isCollapsed])

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className={`main-content-wrapper flex flex-col flex-1 ${isCollapsed ? 'lg:pl-16' : 'lg:pl-56'} transition-all duration-300`}>
          <Header />
          <main className="flex-1 overflow-y-auto focus:outline-none">
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
