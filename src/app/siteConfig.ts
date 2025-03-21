export const siteConfig = {
  name: "Dashboard",
  url: "https://dashboard.tremor.so",
  description: "The only dashboard you will ever need.",
  baseLinks: {
    home: "/",
    overview: "/my-hqo",
    resources: "/resources",
    analytics: "/analytics",
    employees: "/employees",
    buildings: "/buildings",
    vendors: "/vendors",
    visitors: "/visitors",
    accessControl: "/access-control",
    resourceBooking: "/resource-booking",
    parking: "/parking",
    workOrders: "/work-orders",
    credits: "/credits",
    settings: {
      general: "/settings/general",
      billing: "/settings/billing",
      users: "/settings/users",
    },
    // Communications section (formerly Experience Manager)
    communications: {
      content: "/experience-manager/content",
      notifications: "/experience-manager/notifications",
      surveys: "/experience-manager/surveys",
    },
    // Settings and setup section
    settingsAndSetup: {
      features: "/settings-and-setup/features",
      settings: "/settings-and-setup/settings",
    },
    // Intelligence section
    intelligence: {
      dashboard: "/intelligence/dashboard",
      assessments: "/intelligence/assessments",
      aboutIntelligence: "/intelligence/about",
    },
  },
}

export type siteConfig = typeof siteConfig
