"use client"

import { RiCalendarEventLine, RiDoorOpenLine, RiFilterLine, RiInformationLine, RiMapPinLine, RiSearchLine, RiShoppingBag3Line, RiUserAddLine } from "@remixicon/react";
import { AreaChart, Badge, Button, Card, DonutChart, Grid, Icon, Select, SelectItem, Tab, TabGroup, TabList, TabPanel, TabPanels, Text, TextInput, Title } from "@tremor/react";
import { useState } from "react";

// Type definitions
export type PeriodValue = "previous-period" | "last-year" | "no-comparison";

// Type definition for KpiEntry
export type KpiEntry = {
  title: string;
  value: number | string;
  target: number;
  percentage: number;
  current: number | string;
  allowed: number | string;
  unit: string;
};

// Type definition for KpiEntryExtended
export type KpiEntryExtended = {
  title: string;
  color: string;
  percentage: number;
  value: number | string;
};

// Mock data for charts and metrics
const performanceData = [
  {
    date: "Jan 2023",
    "Tenant Satisfaction": 85,
    "Tenant Engagement": 75,
  },
  {
    date: "Feb 2023",
    "Tenant Satisfaction": 83,
    "Tenant Engagement": 76,
  },
  {
    date: "Mar 2023",
    "Tenant Satisfaction": 86,
    "Tenant Engagement": 78,
  },
  {
    date: "Apr 2023",
    "Tenant Satisfaction": 87,
    "Tenant Engagement": 80,
  },
  {
    date: "May 2023",
    "Tenant Satisfaction": 89,
    "Tenant Engagement": 82,
  },
  {
    date: "Jun 2023",
    "Tenant Satisfaction": 90,
    "Tenant Engagement": 85,
  },
  {
    date: "Jul 2023",
    "Tenant Satisfaction": 91,
    "Tenant Engagement": 87,
  },
  {
    date: "Aug 2023",
    "Tenant Satisfaction": 92,
    "Tenant Engagement": 88,
  },
  {
    date: "Sep 2023",
    "Tenant Satisfaction": 93,
    "Tenant Engagement": 89,
  },
  {
    date: "Oct 2023",
    "Tenant Satisfaction": 94,
    "Tenant Engagement": 90,
  },
  {
    date: "Nov 2023",
    "Tenant Satisfaction": 95,
    "Tenant Engagement": 91,
  },
  {
    date: "Dec 2023",
    "Tenant Satisfaction": 96,
    "Tenant Engagement": 92,
  },
]

const usageData = [
  {
    date: "Jan 2023",
    "Mobile App": 65,
    "Web Portal": 40,
    "Kiosk": 20,
  },
  {
    date: "Feb 2023",
    "Mobile App": 68,
    "Web Portal": 42,
    "Kiosk": 22,
  },
  {
    date: "Mar 2023",
    "Mobile App": 70,
    "Web Portal": 45,
    "Kiosk": 25,
  },
  {
    date: "Apr 2023",
    "Mobile App": 72,
    "Web Portal": 48,
    "Kiosk": 28,
  },
  {
    date: "May 2023",
    "Mobile App": 75,
    "Web Portal": 50,
    "Kiosk": 30,
  },
  {
    date: "Jun 2023",
    "Mobile App": 78,
    "Web Portal": 52,
    "Kiosk": 32,
  },
  {
    date: "Jul 2023",
    "Mobile App": 80,
    "Web Portal": 55,
    "Kiosk": 35,
  },
  {
    date: "Aug 2023",
    "Mobile App": 82,
    "Web Portal": 58,
    "Kiosk": 38,
  },
  {
    date: "Sep 2023",
    "Mobile App": 85,
    "Web Portal": 60,
    "Kiosk": 40,
  },
  {
    date: "Oct 2023",
    "Mobile App": 88,
    "Web Portal": 62,
    "Kiosk": 42,
  },
  {
    date: "Nov 2023",
    "Mobile App": 90,
    "Web Portal": 65,
    "Kiosk": 45,
  },
  {
    date: "Dec 2023",
    "Mobile App": 92,
    "Web Portal": 68,
    "Kiosk": 48,
  },
]

const featureUsageData = [
  { name: "Events", value: 35 },
  { name: "Marketplace", value: 25 },
  { name: "Bookings", value: 20 },
  { name: "Access", value: 15 },
  { name: "Other", value: 5 },
]

const tenantBreakdownData = [
  { name: "Active", value: 85 },
  { name: "Inactive", value: 10 },
  { name: "Pending", value: 5 },
]

// Enhanced recentActivityData with tenant information and avatars
const recentActivityData = [
  {
    id: 1,
    type: "Event",
    title: "Wellness Wednesday",
    date: "Today, 2:30 PM",
    status: "Active",
    registrations: 45,
    capacity: 50,
    tenant: "Acme Inc",
    user: {
      name: "Lucy Mitchell",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    description: "Registered for the weekly wellness session"
  },
  {
    id: 2,
    type: "Booking",
    title: "Conference Room A",
    date: "Today, 10:00 AM",
    status: "Completed",
    bookedBy: "John Smith",
    tenant: "Global Tech",
    user: {
      name: "John Smith",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    description: "Booked a meeting room for team standup"
  },
  {
    id: 3,
    type: "Marketplace",
    title: "Lunch Special Order",
    date: "Yesterday",
    status: "Delivered",
    orders: 12,
    tenant: "Innovate Solutions",
    user: {
      name: "Emily Bernacle",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    description: "Placed a group order for the design team lunch"
  },
  {
    id: 4,
    type: "Access",
    title: "After-hours Access",
    date: "Yesterday",
    status: "Approved",
    requestedBy: "Sarah Johnson",
    tenant: "Tech Innovators",
    user: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    description: "Requested weekend access to the office"
  },
  {
    id: 5,
    type: "Visitor",
    title: "Client Meeting",
    date: "Jun 15, 2023",
    status: "Scheduled",
    tenant: "Acme Inc",
    user: {
      name: "Thomas Palstein",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    description: "Invited 3 external visitors for a product demo"
  },
];

// List of tenants for the filter
const tenants = [
  { value: "all", label: "All Tenants" },
  { value: "Acme Inc", label: "Acme Inc" },
  { value: "Global Tech", label: "Global Tech" },
  { value: "Innovate Solutions", label: "Innovate Solutions" },
  { value: "Tech Innovators", label: "Tech Innovators" },
];

export default function MyHqO() {
  const [selectedTenant, setSelectedTenant] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter activities based on tenant selection and search query
  const filteredActivities = recentActivityData.filter(activity => {
    const matchesTenant = selectedTenant === "all" || activity.tenant === selectedTenant;
    const matchesSearch = searchQuery === "" ||
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.user.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTenant && matchesSearch;
  });

  // Function to get the appropriate icon for each activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "Event":
        return RiCalendarEventLine;
      case "Booking":
        return RiMapPinLine;
      case "Marketplace":
        return RiShoppingBag3Line;
      case "Access":
        return RiDoorOpenLine;
      case "Visitor":
        return RiUserAddLine;
      default:
        return RiInformationLine;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
        Welcome back, Ellie
      </h1>

      {/* Area Charts Section */}
      <section>
        <Grid numItemsMd={1} numItemsLg={2} className="gap-6">
          {/* Area Chart 1 */}
          <Card>
            <Title className="text-text-primary mb-2">Tenant Engagement</Title>
            <Text className="text-text-secondary mb-4">Monthly trends over time</Text>
            <AreaChart
              className="h-72"
              data={performanceData}
              index="date"
              categories={["Tenant Satisfaction", "Tenant Engagement"]}
              colors={["primary", "indigo"]}
              valueFormatter={(value) => `${value}%`}
              showLegend={true}
              showGridLines={false}
              showAnimation={true}
            />
          </Card>

          {/* Area Chart 2 */}
          <Card>
            <Title className="text-text-primary mb-2">Platform Usage</Title>
            <Text className="text-text-secondary mb-4">Distribution by channel</Text>
            <AreaChart
              className="h-72"
              data={usageData}
              index="date"
              categories={["Mobile App", "Web Portal", "Kiosk"]}
              colors={["primary", "indigo", "cyan"]}
              valueFormatter={(value) => `${value}%`}
              showLegend={true}
              showGridLines={false}
              showAnimation={true}
            />
          </Card>
        </Grid>
      </section>

      {/* Performance Insights Section */}
      <section>
        <Card>
          <Title className="text-text-primary mb-4">Performance Insights</Title>
          <TabGroup>
            <TabList>
              <Tab>Tenant Satisfaction</Tab>
              <Tab>Platform Usage</Tab>
              <Tab>Feature Breakdown</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AreaChart
                  className="mt-4 h-72"
                  data={performanceData}
                  index="date"
                  categories={["Tenant Satisfaction", "Tenant Engagement"]}
                  colors={["primary", "indigo"]}
                  valueFormatter={(value) => `${value}%`}
                  showLegend={true}
                  showGridLines={false}
                  showAnimation={true}
                />
              </TabPanel>
              <TabPanel>
                <AreaChart
                  className="mt-4 h-72"
                  data={usageData}
                  index="date"
                  categories={["Mobile App", "Web Portal", "Kiosk"]}
                  colors={["primary", "indigo", "cyan"]}
                  valueFormatter={(value) => `${value}%`}
                  showLegend={true}
                  showGridLines={false}
                  showAnimation={true}
                />
              </TabPanel>
              <TabPanel>
                <Grid numItemsMd={2} className="gap-6 mt-4">
                  <Card>
                    <Title className="text-text-primary">Feature Usage</Title>
                    <DonutChart
                      className="mt-4 h-60"
                      data={featureUsageData}
                      category="value"
                      index="name"
                      colors={["primary", "indigo", "cyan", "violet", "slate"]}
                      valueFormatter={(value) => `${value}%`}
                      showLabel={true}
                      showAnimation={true}
                    />
                  </Card>
                  <Card>
                    <Title className="text-text-primary">Tenant Breakdown</Title>
                    <DonutChart
                      className="mt-4 h-60"
                      data={tenantBreakdownData}
                      category="value"
                      index="name"
                      colors={["primary", "amber", "slate"]}
                      valueFormatter={(value) => `${value}%`}
                      showLabel={true}
                      showAnimation={true}
                    />
                  </Card>
                </Grid>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Card>
      </section>

      {/* Recent Activity Section */}
      <section>
        <Card>
          <Title className="text-text-primary mb-4">Tenant Activity Stream</Title>

          {/* Filters and Search */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:w-64">
              <Select
                value={selectedTenant}
                onValueChange={setSelectedTenant}
                icon={RiFilterLine}
                placeholder="Filter by tenant"
              >
                {tenants.map((tenant) => (
                  <SelectItem key={tenant.value} value={tenant.value}>
                    {tenant.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="w-full sm:w-72">
              <TextInput
                icon={RiSearchLine}
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Activity Stream */}
          <div className="space-y-4">
            {filteredActivities.length === 0 ? (
              <div className="py-12 text-center">
                <Text className="text-text-secondary">No activities found matching your criteria.</Text>
              </div>
            ) : (
              filteredActivities.map((activity) => {
                const ActivityIcon = getActivityIcon(activity.type);
                return (
                  <div key={activity.id} className="flex gap-4 p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                    {/* User Avatar */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <img
                          src={activity.user.avatar}
                          alt={activity.user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="absolute -bottom-1 -right-1 rounded-full p-1 bg-white dark:bg-gray-900">
                          <Icon
                            icon={ActivityIcon}
                            size="sm"
                            className={`
                              ${activity.type === "Event" ? "text-blue-500" : ""}
                              ${activity.type === "Booking" ? "text-green-500" : ""}
                              ${activity.type === "Marketplace" ? "text-amber-500" : ""}
                              ${activity.type === "Access" ? "text-violet-500" : ""}
                              ${activity.type === "Visitor" ? "text-rose-500" : ""}
                            `}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Activity Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <p className="font-medium text-text-primary truncate">
                            {activity.user.name}
                            <span className="font-normal text-text-secondary"> · {activity.tenant}</span>
                          </p>
                          <p className="text-sm text-text-secondary">{activity.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge color={
                            activity.status === "Active" || activity.status === "Approved" ? "green" :
                              activity.status === "Completed" || activity.status === "Delivered" ? "blue" :
                                activity.status === "Scheduled" ? "amber" : "gray"
                          }>
                            {activity.status}
                          </Badge>
                          <Text className="text-xs text-text-secondary whitespace-nowrap">{activity.date}</Text>
                        </div>
                      </div>

                      {/* Activity Details */}
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge size="sm" color="gray" className="font-normal">
                          {activity.title}
                        </Badge>
                        {activity.registrations && (
                          <Badge size="sm" color="blue" className="font-normal">
                            {activity.registrations}/{activity.capacity} registered
                          </Badge>
                        )}
                        {activity.orders && (
                          <Badge size="sm" color="amber" className="font-normal">
                            {activity.orders} orders
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Load More Button */}
          {filteredActivities.length > 0 && (
            <div className="mt-6 text-center">
              <Button variant="light" className="text-text-primary">
                Load more activities
              </Button>
            </div>
          )}
        </Card>
      </section>
    </div>
  )
}
