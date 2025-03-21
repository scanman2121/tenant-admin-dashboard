"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { visitorColumns } from "@/components/ui/data-table/visitorColumns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Visitor } from "@/data/schema"

const tabs = [
    {
        value: "all",
        label: "All Visitors",
        count: 0,
    },
    {
        value: "checked-in",
        label: "Checked In",
        count: 0,
    },
    {
        value: "expected",
        label: "Expected",
        count: 0,
    },
]

const mockVisitors: Visitor[] = [
    {
        id: "V001",
        checkInTime: "9:30 AM",
        visitorName: "John Smith",
        company: "Acme Corp",
        hostName: "Sarah Johnson",
        purpose: "Client Meeting",
        status: "checked-in",
        checkOutTime: null,
        badgeNumber: "V001",
        email: "john.smith@acme.com",
        phone: "+1 (555) 123-4567"
    },
    {
        id: "V002",
        checkInTime: null,
        visitorName: "Emma Davis",
        company: "Tech Solutions",
        hostName: "Michael Brown",
        purpose: "Interview",
        status: "expected",
        checkOutTime: null,
        badgeNumber: "V002",
        email: "emma.davis@techsolutions.com",
        phone: "+1 (555) 234-5678"
    },
    {
        id: "V003",
        checkInTime: "2:45 PM",
        visitorName: "Robert Wilson",
        company: "Global Services",
        hostName: "Jennifer Lee",
        purpose: "Vendor Meeting",
        status: "checked-out",
        checkOutTime: "4:30 PM",
        badgeNumber: "V003",
        email: "robert.wilson@globalservices.com",
        phone: "+1 (555) 345-6789"
    }
]

export default function Visitors() {
    // Update tab counts
    tabs.forEach(tab => {
        if (tab.value === "all") {
            tab.count = mockVisitors.length
        } else {
            tab.count = mockVisitors.filter(visitor => visitor.status === tab.value).length
        }
    })

    return (
        <div className="flex flex-col gap-8 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">Visitor Management</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Track and manage all visitors in your building
                    </p>
                </div>
                <Button>
                    Invite visitor
                </Button>
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full justify-start">
                    {tabs.map((tab) => (
                        <TabsTrigger key={tab.value} value={tab.value} className="min-w-[120px]">
                            <span className="flex flex-col items-start">
                                <span>{tab.label}</span>
                                <span className="text-xs text-muted-foreground">{tab.count} visitors</span>
                            </span>
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="all" className="mt-4">
                    <DataTable
                        columns={visitorColumns}
                        data={mockVisitors}
                    />
                </TabsContent>
                <TabsContent value="checked-in" className="mt-4">
                    <DataTable
                        columns={visitorColumns}
                        data={mockVisitors.filter(visitor => visitor.status === "checked-in")}
                    />
                </TabsContent>
                <TabsContent value="expected" className="mt-4">
                    <DataTable
                        columns={visitorColumns}
                        data={mockVisitors.filter(visitor => visitor.status === "expected")}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
} 