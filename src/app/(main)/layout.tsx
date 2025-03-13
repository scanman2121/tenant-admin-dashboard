"use client"

import { CommunicationsTab } from "@/components/ui/communications/CommunicationsTab"
import { Header } from "@/components/ui/navigation/Header"
import { Sidebar } from "@/components/ui/navigation/Sidebar"
import { createContext, useContext, useEffect, useState } from "react"

// Create a context for the sidebar collapsed state
export const SidebarContext = createContext({
  isCollapsed: false,
  toggleCollapsed: () => { }
})

// Custom hook to use the sidebar context
export const useSidebar = () => useContext(SidebarContext)

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // State to track if sidebar is collapsed
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const savedCollapsedState = localStorage.getItem('sidebarCollapsed')
    if (savedCollapsedState) {
      setIsCollapsed(savedCollapsedState === 'true')
    }
  }, [])

  // Save collapsed state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isCollapsed.toString())
  }, [isCollapsed])

  // Toggle sidebar collapsed state
  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleCollapsed }}>
      <Sidebar />
      <main className={`transition-all duration-300 main-content-wrapper bg-[#F6F7F8] dark:bg-gray-950 ${isCollapsed ? 'lg:pl-16' : 'lg:pl-56'}`}>
        <div className="mx-auto max-w-screen-2xl">
          <Header />
          <div className="pt-6">
            <div className="px-4 sm:px-6 md:px-6 lg:px-10">
              {children}
            </div>
          </div>
        </div>
      </main>
      <CommunicationsTab />
    </SidebarContext.Provider>
  )
}
