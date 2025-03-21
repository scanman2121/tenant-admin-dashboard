"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { visitorColumns } from "@/components/ui/data-table/visitorColumns"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Visitor } from "@/data/schema"

const tabs = [
    {
        value: "all",
        label: "All visitors",
    },
    {
        value: "expected",
        label: "Expected",
    },
    {
        value: "reports",
        label: "Reports",
    },
]

const mockVisitors: Visitor[] = [
    {
        checkInTime: "9:30 AM",
        visitorName: "John Smith",
        company: "Acme Corp",
        hostName: "Sarah Johnson",
        purpose: "Client Meeting",
        status: "Checked In",
        checkOutTime: null,
        badgeNumber: "V001"
    },
    {
        checkInTime: "10:15 AM",
        visitorName: "Emma Davis",
        company: "Tech Solutions",
        hostName: "Michael Brown",
        purpose: "Interview",
        status: "Expected",
        checkOutTime: null,
        badgeNumber: "V002"
    },
    {
        checkInTime: "2:45 PM",
        visitorName: "Robert Wilson",
        company: "Global Services",
        hostName: "Jennifer Lee",
        purpose: "Vendor Meeting",
        status: "Checked In",
        checkOutTime: "4:30 PM",
        badgeNumber: "V003"
    }
]

export default function Visitors() {
    return (
        <div className="flex flex-col gap-8 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Visitor Management</h1>
                    <p className="text-sm text-muted-foreground">
                        Track and manage all visitors in your building
                    </p>
                </div>
                <Button>
                    Invite visitor
                </Button>
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList>
                    {tabs.map((tab) => (
                        <TabsTrigger key={tab.value} value={tab.value}>
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="all" className="mt-4">
                    <DataTable
                        columns={visitorColumns}
                        data={mockVisitors}
                    />
                </TabsContent>
                <TabsContent value="expected" className="mt-4">
                    <DataTable
                        columns={visitorColumns}
                        data={mockVisitors.filter(visitor => visitor.status === "Expected")}
                    />
                </TabsContent>
                <TabsContent value="reports" className="mt-4">
                    <div className="flex flex-col gap-4">
                        <Card className="p-6">
                            <h3 className="text-lg font-medium">Visitor reports</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Download and analyze visitor data
                            </p>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Daily visitor log</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Complete list of visitors for today
                                        </p>
                                    </div>
                                    <Button variant="outline">Download</Button>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Weekly summary</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Visitor trends and analytics
                                        </p>
                                    </div>
                                    <Button variant="outline">Download</Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
} 