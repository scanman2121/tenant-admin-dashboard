"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { RiExternalLinkLine } from "@remixicon/react"

import { roles } from "@/data/data"

export default function General() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="personal-information">
        <form>
          <div className="grid grid-cols-1 gap-x-14 gap-y-8 md:grid-cols-3">
            <div>
              <h2
                id="personal-information"
                className="text-lg font-medium"
              >
                Personal information
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage your personal information and role
              </p>
            </div>
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                <div className="col-span-full sm:col-span-3">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    type="text"
                    id="first-name"
                    name="first-name"
                    autoComplete="given-name"
                    placeholder="Enter your first name"
                    className="mt-2"
                  />
                </div>
                <div className="col-span-full sm:col-span-3">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    type="text"
                    id="last-name"
                    name="last-name"
                    autoComplete="family-name"
                    placeholder="Enter your last name"
                    className="mt-2"
                  />
                </div>
                <div className="col-span-full">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="mt-2"
                  />
                </div>
                <div className="col-span-full sm:col-span-3">
                  <Label htmlFor="year">Birth year</Label>
                  <Input
                    autoComplete="off"
                    id="birthyear"
                    name="year"
                    type="number"
                    placeholder="Enter your birth year"
                    className="mt-2"
                    min="1900"
                    max={new Date().getFullYear()}
                    step="1"
                  />
                </div>
                <div className="col-span-full sm:col-span-3">
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue="member" disabled>
                    <SelectTrigger
                      name="role"
                      id="role"
                      className="mt-2"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Roles can only be changed by system admin
                  </p>
                </div>
                <div className="col-span-full mt-6 flex justify-end">
                  <Button>Save settings</Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>

      <Separator />

      <section aria-labelledby="notification-settings">
        <form>
          <div className="grid grid-cols-1 gap-x-14 gap-y-8 md:grid-cols-3">
            <div>
              <h2
                id="notification-settings"
                className="text-lg font-medium"
              >
                Notification settings
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Configure the types of notifications you want to receive
              </p>
            </div>
            <div className="md:col-span-2">
              <fieldset>
                <legend className="text-sm font-medium">
                  Team
                </legend>
                <p className="mt-1 text-sm text-muted-foreground">
                  Configure the types of team alerts you want to receive
                </p>
                <ul
                  role="list"
                  className="mt-4 divide-y"
                >
                  <li className="flex items-center gap-x-3 py-3">
                    <Checkbox
                      id="team-requests"
                      defaultChecked
                    />
                    <Label htmlFor="team-requests">Team join requests</Label>
                  </li>
                  <li className="flex items-center gap-x-3 py-3">
                    <Checkbox id="team-activity-digest" />
                    <Label htmlFor="team-activity-digest">
                      Weekly team activity digest
                    </Label>
                  </li>
                </ul>
              </fieldset>
              <fieldset className="mt-6">
                <legend className="text-sm font-medium">
                  Usage
                </legend>
                <p className="mt-1 text-sm text-muted-foreground">
                  Configure the types of usage alerts you want to receive
                </p>
                <ul
                  role="list"
                  className="mt-4 divide-y"
                >
                  <li className="flex items-center gap-x-3 py-3">
                    <Checkbox id="api-requests" />
                    <Label htmlFor="api-requests">API incidents</Label>
                  </li>
                  <li className="flex items-center gap-x-3 py-3">
                    <Checkbox
                      id="workspace-execution"
                    />
                    <Label htmlFor="workspace-execution">
                      Platform incidents
                    </Label>
                  </li>
                  <li className="flex items-center gap-x-3 py-3">
                    <Checkbox
                      id="query-caching"
                      defaultChecked
                    />
                    <Label htmlFor="query-caching">
                      Payment transactions
                    </Label>
                  </li>
                  <li className="flex items-center gap-x-3 py-3">
                    <Checkbox id="storage" defaultChecked />
                    <Label htmlFor="storage">User behavior</Label>
                  </li>
                </ul>
              </fieldset>
              <div className="col-span-full mt-6 flex justify-end">
                <Button>Save settings</Button>
              </div>
            </div>
          </div>
        </form>
      </section>

      <Separator />

      <section aria-labelledby="danger-zone">
        <form>
          <div className="grid grid-cols-1 gap-x-14 gap-y-8 md:grid-cols-3">
            <div>
              <h2
                id="danger-zone"
                className="text-lg font-medium"
              >
                Danger zone
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage general workspace. Contact system admin for more
                information.{" "}
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-primary hover:underline hover:underline-offset-4"
                >
                  Learn more
                  <RiExternalLinkLine
                    className="size-4 shrink-0"
                    aria-hidden="true"
                  />
                </a>
              </p>
            </div>
            <div className="space-y-6 md:col-span-2">
              <Card className="p-4">
                <div className="flex items-start justify-between gap-10">
                  <div>
                    <h4 className="text-sm font-medium">
                      Leave workspace
                    </h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Revoke your access to this team. Other people you have
                      added to the workspace will remain.
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-red-600"
                  >
                    Leave
                  </Button>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-start justify-between gap-10">
                  <div>
                    <h4 className="text-sm font-medium">
                      Delete workspace
                    </h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Permanently delete this workspace and all of its contents.
                      This action cannot be undone.
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-red-600"
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </form>
      </section>
    </div>
  )
}
