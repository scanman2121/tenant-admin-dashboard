"use client"

import { RiAddLine, RiDownload2Line } from "@remixicon/react";
import { AreaChart, Badge, Button, Card, DonutChart, Flex, Grid, Tab, TabGroup, TabList, TabPanel, TabPanels, Text, Title } from "@tremor/react";

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

const recentActivityData = [
  {
    id: 1,
    type: "Event",
    title: "Wellness Wednesday",
    date: "Today, 2:30 PM",
    status: "Active",
    registrations: 45,
    capacity: 50
  },
  {
    id: 2,
    type: "Booking",
    title: "Conference Room A",
    date: "Today, 10:00 AM",
    status: "Completed",
    bookedBy: "John Smith"
  },
  {
    id: 3,
    type: "Marketplace",
    title: "Lunch Special Order",
    date: "Yesterday",
    status: "Delivered",
    orders: 12
  },
  {
    id: 4,
    type: "Access",
    title: "After-hours Access",
    date: "Yesterday",
    status: "Approved",
    requestedBy: "Sarah Johnson"
  },
  {
    id: 5,
    type: "Event",
    title: "Building Maintenance",
    date: "Jun 15, 2023",
    status: "Scheduled",
    notification: "Sent to all tenants"
  },
]

export default function MyHqO() {
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
          <Flex justifyContent="between" alignItems="center" className="mb-4">
            <Title className="text-text-primary">Recent Activity</Title>
            <Flex className="gap-2">
              <Button size="sm" variant="secondary" icon={RiDownload2Line}>Export</Button>
              <Button size="sm" variant="primary" icon={RiAddLine}>Add Event</Button>
            </Flex>
          </Flex>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-text-secondary uppercase bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Details</th>
                </tr>
              </thead>
              <tbody>
                {recentActivityData.map((item) => (
                  <tr key={item.id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 font-medium text-text-primary">{item.type}</td>
                    <td className="px-4 py-3 text-text-primary">{item.title}</td>
                    <td className="px-4 py-3 text-text-secondary">{item.date}</td>
                    <td className="px-4 py-3">
                      <Badge color={
                        item.status === "Active" || item.status === "Approved" ? "green" :
                          item.status === "Completed" || item.status === "Delivered" ? "blue" :
                            item.status === "Scheduled" ? "amber" : "gray"
                      }>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {item.registrations && `${item.registrations}/${item.capacity} registered`}
                      {item.bookedBy && `Booked by ${item.bookedBy}`}
                      {item.orders && `${item.orders} orders`}
                      {item.requestedBy && `Requested by ${item.requestedBy}`}
                      {item.notification && item.notification}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  )
}
