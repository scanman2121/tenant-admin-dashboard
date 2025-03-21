"use client"

import { ProgressBar } from "@/components/ProgressBar"
import TremorPricingSection from "@/components/TremorPricingSection"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { cx } from "@/lib/utils"
import { RiArrowRightUpLine } from "@remixicon/react"
import React from "react"

const billingData = [
  {
    name: "Starter Plan",
    description: "Discounted plan for start-ups and growing companies",
    value: "$90",
  },
  {
    name: "Storage",
    description: "Used 10.1 GB",
    value: "$40",
    capacity: "100 GB included",
    percentageValue: 10.1,
  },
  {
    name: "Bandwidth",
    description: "Used 2.9 GB",
    value: "$10",
    capacity: "5 GB included",
    percentageValue: 58,
  },
  {
    name: "Users",
    description: "Used 9",
    value: "$20",
    capacity: "50 users included",
    percentageValue: 18,
  },
  {
    name: "Query Super Caching (EU-Central 1)",
    description: "4 GB query cache, $120/mo",
    value: "$120.00",
  },
]

export default function BillingPage() {
  const [isSpendMgmtEnabled, setIsSpendMgmtEnabled] = React.useState(true)

  return (
    <div className="space-y-10">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-medium">Free Plan</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Boost your analytics and unlock advanced features with our premium plans
            </p>
          </div>
          <Button variant="outline" className="flex items-center gap-1">
            Compare plans
            <RiArrowRightUpLine className="size-4 shrink-0" aria-hidden="true" />
          </Button>
        </div>
      </Card>

      <TremorPricingSection />

      <div className="space-y-10">
        <section aria-labelledby="billing-overview">
          <div className="grid grid-cols-1 gap-x-14 gap-y-8 md:grid-cols-3">
            <div>
              <h2 id="billing-overview" className="text-lg font-medium">Billing Overview</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Overview of current billing cycle based on fixed and on-demand charges
              </p>
            </div>
            <div className="md:col-span-2">
              <Card>
                <ul role="list" className="w-full divide-y">
                  {billingData.map((item) => (
                    <li key={item.name} className="px-4 py-4 text-sm">
                      <div className="w-full">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{item.name}</p>
                          <p className="font-medium">{item.value}</p>
                        </div>
                        <div className="w-full md:w-2/3">
                          {item.percentageValue && (
                            <ProgressBar value={item.percentageValue} />
                          )}
                          <p className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                            <span>{item.description}</span>
                            <span>{item.capacity}</span>
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t px-4 py-4">
                  <p className="flex items-center justify-between text-sm font-medium">
                    <span>Total for May 24</span>
                    <span className="font-semibold">$280</span>
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <Separator />

        <section aria-labelledby="cost-spend-control">
          <form>
            <div className="grid grid-cols-1 gap-x-14 gap-y-8 md:grid-cols-3">
              <div>
                <h2 id="cost-spend-control" className="text-lg font-medium">Cost Spend Control</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Set hard caps for on-demand charges
                </p>
              </div>
              <div className="md:col-span-2">
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <ProgressBar value={isSpendMgmtEnabled ? 62.2 : 0} />
                      <div>
                        {isSpendMgmtEnabled ? (
                          <>
                            <p className="text-sm font-medium">$280 / $350 (62.2%)</p>
                            <Label htmlFor="spend-mgmt" className="text-muted-foreground">
                              Spend management enabled
                            </Label>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-medium">$0 / $0 (0%)</p>
                            <Label htmlFor="spend-mgmt" className="text-muted-foreground">
                              Spend management disabled
                            </Label>
                          </>
                        )}
                      </div>
                    </div>
                    <Switch
                      id="spend-mgmt"
                      checked={isSpendMgmtEnabled}
                      onCheckedChange={() => setIsSpendMgmtEnabled(!isSpendMgmtEnabled)}
                    />
                  </div>
                  <div
                    className={cx(
                      "transform-gpu transition-all ease-[cubic-bezier(0.16,1,0.3,1.03)] will-change-transform",
                      isSpendMgmtEnabled ? "h-52 md:h-32" : "h-0",
                    )}
                    style={{
                      transitionDuration: "300ms",
                      animationFillMode: "backwards",
                    }}
                  >
                    <div
                      className={cx(
                        "animate-slideDownAndFade transition",
                        isSpendMgmtEnabled ? "" : "hidden",
                      )}
                      style={{
                        animationDelay: "100ms",
                        animationDuration: "300ms",
                        transitionDuration: "300ms",
                        animationFillMode: "backwards",
                      }}
                    >
                      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="md:col-span-1">
                          <Label>Set amount ($)</Label>
                          <Input
                            id="hard-cap"
                            name="hard-cap"
                            defaultValue={350}
                            type="number"
                            placeholder="Enter amount"
                            className="mt-2"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label>Provide email for notifications</Label>
                          <Input
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            className="mt-2"
                          />
                        </div>
                      </div>
                      <div className="mt-6 flex justify-end">
                        <Button>Update settings</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </form>
        </section>

        <Separator />

        <section aria-labelledby="add-ons">
          <div className="grid grid-cols-1 gap-x-14 gap-y-8 md:grid-cols-3">
            <div>
              <h2 id="add-ons" className="text-lg font-medium">Add-ons</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Enhance your workspace with additional features
              </p>
            </div>
            <div className="space-y-6 md:col-span-2">
              <Card className="p-4">
                <div className="flex items-start justify-between gap-10">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">Query Super Caching</h4>
                      <Badge variant="outline">• New</Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Improve query performance by caching results in memory.
                      Available in multiple regions.
                    </p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-start justify-between gap-10">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">Advanced Analytics</h4>
                      <Badge variant="outline">• Coming soon</Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Get deeper insights with advanced analytics and reporting tools
                    </p>
                  </div>
                  <Button variant="outline" disabled>Configure</Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
