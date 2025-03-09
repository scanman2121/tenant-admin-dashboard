"use client"

import { RiAddLine, RiAlertLine, RiArrowDownLine, RiArrowUpLine, RiCheckLine, RiDownload2Line, RiInformationLine } from "@remixicon/react"
import { AreaChart, Badge, Button, Callout, Card, DonutChart, Flex, Grid, Icon, Metric, Tab, TabGroup, TabList, TabPanel, TabPanels, Text, Title } from "@tremor/react"
import { useState } from "react"

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
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="space-y-6">
      <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
        My HqO
      </h1>

      {/* Key Metrics Section */}
      <section>
        <Grid numItemsMd={2} numItemsLg={4} className="gap-6">
          <Card decoration="top" decorationColor="primary">
            <Flex justifyContent="between" alignItems="center">
              <Title className="text-text-primary">Tenant Satisfaction</Title>
              <Badge color="green" size="sm">
                <Flex justifyContent="start" alignItems="center" className="gap-1">
                  <Icon icon={RiArrowUpLine} size="sm" />
                  <span>4.2%</span>
                </Flex>
              </Badge>
            </Flex>
            <Metric className="mt-2 text-text-primary">92%</Metric>
            <Text className="text-text-secondary">Based on 1,245 responses</Text>
          </Card>

          <Card decoration="top" decorationColor="primary">
            <Flex justifyContent="between" alignItems="center">
              <Title className="text-text-primary">Tenant Engagement</Title>
              <Badge color="green" size="sm">
                <Flex justifyContent="start" alignItems="center" className="gap-1">
                  <Icon icon={RiArrowUpLine} size="sm" />
                  <span>2.8%</span>
                </Flex>
              </Badge>
            </Flex>
            <Metric className="mt-2 text-text-primary">78%</Metric>
            <Text className="text-text-secondary">Across all platforms</Text>
          </Card>

          <Card decoration="top" decorationColor="primary">
            <Flex justifyContent="between" alignItems="center">
              <Title className="text-text-primary">Active Users</Title>
              <Badge color="red" size="sm">
                <Flex justifyContent="start" alignItems="center" className="gap-1">
                  <Icon icon={RiArrowDownLine} size="sm" />
                  <span>1.5%</span>
                </Flex>
              </Badge>
            </Flex>
            <Metric className="mt-2 text-text-primary">3,842</Metric>
            <Text className="text-text-secondary">Out of 4,500 total users</Text>
          </Card>

          <Card decoration="top" decorationColor="primary">
            <Flex justifyContent="between" alignItems="center">
              <Title className="text-text-primary">Events This Month</Title>
              <Badge color="green" size="sm">
                <Flex justifyContent="start" alignItems="center" className="gap-1">
                  <Icon icon={RiArrowUpLine} size="sm" />
                  <span>12.3%</span>
                </Flex>
              </Badge>
            </Flex>
            <Metric className="mt-2 text-text-primary">28</Metric>
            <Text className="text-text-secondary">With 1,245 registrations</Text>
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

      {/* Announcements Section */}
      <section>
        <Card>
          <Title className="text-text-primary mb-4">Announcements & Alerts</Title>
          <div className="space-y-4">
            <Callout
              title="Building Maintenance Scheduled"
              icon={RiInformationLine}
              color="blue"
              className="mt-2"
            >
              The lobby will be undergoing maintenance on Saturday, June 24th from 8:00 AM to 12:00 PM.
            </Callout>
            <Callout
              title="Fire Alarm Testing"
              icon={RiAlertLine}
              color="amber"
              className="mt-2"
            >
              Fire alarm testing will be conducted on Friday, June 23rd from 2:00 PM to 3:00 PM.
            </Callout>
            <Callout
              title="New Marketplace Vendor"
              icon={RiCheckLine}
              color="green"
              className="mt-2"
            >
              We&apos;re excited to welcome &quot;Fresh Eats Catering&quot; to our marketplace starting next week.
            </Callout>
          </div>
        </Card>
      </section>
    </div>
  )
}
