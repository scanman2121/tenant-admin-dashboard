"use client"

import { CommunicationsTab } from "@/components/ui/communications/CommunicationsTab"
import { Header } from "@/components/ui/navigation/Header"
import { Sidebar } from "@/components/ui/navigation/Sidebar"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Sidebar />
      <main className="lg:pl-56 main-content-wrapper">
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
    </>
  )
}
