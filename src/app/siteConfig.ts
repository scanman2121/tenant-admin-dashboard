export const siteConfig = {
  name: "Dashboard",
  url: "https://dashboard.tremor.so",
  description: "The only dashboard you will ever need.",
  baseLinks: {
    home: "/",
    overview: "/my-hqo",
    resources: "/resources",
    transactions: "/transactions",
    credits: "/credits",
    discounts: "/discounts",
    analytics: "/analytics",
    users: "/users",
    buildings: "/buildings",
    tenants: "/tenants",
    vendors: "/vendors",
    audiences: "/audiences",
    settings: {
      general: "/settings/general",
      billing: "/settings/billing",
    },
  },
}

export type siteConfig = typeof siteConfig
