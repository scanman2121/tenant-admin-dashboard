"use client"

import { cx } from "@/lib/utils";
import { RiApps2Line, RiArrowRightLine, RiCalendarEventLine, RiCheckLine, RiDoorOpenLine, RiInformationLine, RiMapPinLine, RiSearchLine, RiSettings4Line, RiShoppingBag3Line, RiTeamLine, RiUserAddLine } from "@remixicon/react";
import { Badge, Button, Card, Grid, Icon, Text, TextInput, Title } from "@tremor/react";
import Image from "next/image";
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

// Mock data for recent activity
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
    date: "Jun 15, 2025",
    status: "Scheduled",
    tenant: "Acme Inc",
    user: {
      name: "Thomas Palstein",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    description: "Invited 3 external visitors for a product demo"
  },
];

// Mock data for upcoming visitors and vendors
const upcomingVisitorsAndVendors = [
  {
    id: 1,
    type: "Visitor",
    name: "Sarah Johnson",
    company: "Tech Solutions Inc",
    time: "9:00 AM",
    host: "Michael Chen",
    purpose: "Client Meeting",
    status: "Scheduled",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    type: "Vendor",
    name: "John Smith",
    company: "Office Supplies Co",
    time: "10:30 AM",
    host: "Emily Davis",
    purpose: "Supply Delivery",
    status: "En Route",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    type: "Visitor",
    name: "Alex Wong",
    company: "Innovate Design",
    time: "2:00 PM",
    host: "Rachel Green",
    purpose: "Project Review",
    status: "Scheduled",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 4,
    type: "Vendor",
    name: "Maria Garcia",
    company: "Cleaning Services Plus",
    time: "3:30 PM",
    host: "David Kim",
    purpose: "Maintenance Work",
    status: "Confirmed",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
] as const;

export default function MyHqO() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter activities based on search query only
  const filteredActivities = recentActivityData.filter(activity => {
    const matchesSearch = searchQuery === "" ||
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.user.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
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
        Welcome back, Tenny
      </h1>

      {/* Onboarding Cards */}
      <section>
        <Grid numItemsMd={2} numItemsLg={2} className="gap-6">
          {/* Getting Started Card */}
          <Card>
            <div className="flex items-start justify-between mb-4">
              <div>
                <Title className="text-text-primary">Welcome to PENN 1</Title>
                <Text className="text-text-secondary mt-1">Here's a checklist to get you started</Text>
              </div>
              <div className="relative w-20 h-20 rounded-full overflow-hidden">
                <Image
                  src="/penn1.jpg"
                  alt="PENN 1 Building"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center size-8 rounded-full bg-green-500 text-white">
                    <RiCheckLine className="size-5" />
                  </div>
                </div>
                <div>
                  <Text className="font-medium text-gray-900 dark:text-gray-50">Add your contact information</Text>
                  <Text className="text-sm text-gray-600 dark:text-gray-400">Your contact information has been added, you can always manage this in your profile</Text>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center size-8 rounded-full bg-gray-100 dark:bg-gray-800">
                    <RiSettings4Line className="size-5 text-gray-500 dark:text-gray-400" />
                  </div>
                </div>
                <div>
                  <Text className="font-medium text-gray-900 dark:text-gray-50">Confirm your company information</Text>
                  <Text className="text-sm text-gray-600 dark:text-gray-400">Basic information like number of employees, domains, logo, etc.</Text>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center size-8 rounded-full bg-gray-100 dark:bg-gray-800">
                    <RiApps2Line className="size-5 text-gray-500 dark:text-gray-400" />
                  </div>
                </div>
                <div>
                  <Text className="font-medium text-gray-900 dark:text-gray-50">Configure your apps</Text>
                  <Text className="text-sm text-gray-600 dark:text-gray-400">What features should your employees have access to.</Text>
                </div>
              </div>

              <div className="mt-6">
                <Button variant="primary" className="w-full sm:w-auto">
                  Let's go
                  <RiArrowRightLine className="ml-2 size-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Add Administrators Card */}
          <Card>
            <div className="flex items-start justify-between mb-4">
              <div>
                <Title className="text-text-primary">Need to add additional administrators?</Title>
                <Text className="text-text-secondary mt-1">Add colleagues to manage building settings, add users, manage visitor management, and more.</Text>
              </div>
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 text-primary">
                  <RiTeamLine className="size-6" />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="light" className="w-full sm:w-auto">
                Add admin users
                <RiArrowRightLine className="ml-2 size-4" />
              </Button>
            </div>
          </Card>
        </Grid>
      </section>

      {/* Recent Activity Section */}
      <section>
        <Grid numItemsMd={1} numItemsLg={2} className="gap-6">
          {/* Activity Stream - Left Column */}
          <Card>
            <Title className="text-text-primary mb-4">Activity Stream</Title>

            {/* Search */}
            <div className="mb-6">
              <TextInput
                icon={RiSearchLine}
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Activity Stream */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {filteredActivities.length === 0 ? (
                <div className="py-12 text-center">
                  <Text className="text-text-secondary">No activities found matching your criteria.</Text>
                </div>
              ) : (
                filteredActivities.map((activity) => {
                  const ActivityIcon = getActivityIcon(activity.type);
                  return (
                    <div key={activity.id} className="flex gap-4 p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                      {/* Activity Icon */}
                      <div className="flex-shrink-0">
                        <div className={cx(
                          "flex items-center justify-center size-10 rounded-full",
                          activity.type === "Event" ? "bg-blue-500 text-white" :
                            activity.type === "Booking" ? "bg-green-500 text-white" :
                              activity.type === "Marketplace" ? "bg-amber-500 text-white" :
                                activity.type === "Access" ? "bg-violet-500 text-white" :
                                  "bg-rose-500 text-white"
                        )}>
                          <Icon
                            icon={ActivityIcon}
                            size="md"
                            className="text-white"
                          />
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
                        <div className="mt-2">
                          <Text className="text-sm text-text-primary font-medium">
                            {activity.title}
                            {activity.registrations && (
                              <span className="ml-2 text-blue-500 font-normal">
                                {activity.registrations}/{activity.capacity} registered
                              </span>
                            )}
                            {activity.orders && (
                              <span className="ml-2 text-amber-500 font-normal">
                                {activity.orders} orders
                              </span>
                            )}
                          </Text>
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

          {/* Day View Calendar - Right Column */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <Title className="text-text-primary">Upcoming Visitors & Vendors</Title>
              <Text className="text-text-primary font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
            </div>

            {/* Visitors and Vendors List */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {upcomingVisitorsAndVendors.map((person) => (
                <div
                  key={person.id}
                  className={cx(
                    "flex items-start gap-3 p-3 rounded-lg border",
                    person.type === "Visitor"
                      ? "border-blue-100 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20"
                      : "border-amber-100 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20"
                  )}
                >
                  <Image
                    src={person.avatar}
                    alt={person.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <Text className="font-medium text-gray-900 dark:text-gray-50">
                          {person.name}
                        </Text>
                        <Text className="text-sm text-gray-600 dark:text-gray-400">
                          {person.company}
                        </Text>
                      </div>
                      <Badge color={
                        person.status === "Scheduled" ? "blue" :
                          person.status === "En Route" ? "amber" :
                            "green"
                      }>
                        {person.status}
                      </Badge>
                    </div>
                    <div className="mt-1">
                      <Text className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">{person.time}</span> · {person.purpose}
                      </Text>
                      <Text className="text-sm text-gray-500 dark:text-gray-500">
                        Host: {person.host}
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <Button variant="light" className="text-text-primary">
                <RiUserAddLine className="size-4 mr-1" />
                Add visitor
              </Button>
              <Button variant="light" className="text-text-primary">
                View all visitors
              </Button>
            </div>
          </Card>
        </Grid>
      </section>
    </div>
  )
}

{/* Add extra spacing at the bottom of the page */ }
<div className="h-24"></div>
