"use client"
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
import { Button } from "@tremor/react"

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
                className="text-lg font-medium text-gray-900 dark:text-gray-50"
              >
                Personal information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Manage your personal information and role.
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
                    placeholder="Emma"
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
                    placeholder="Stone"
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
                    placeholder="emma@acme.com"
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
                    placeholder="1994"
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
                  <p className="mt-2 text-xs text-gray-500">
                    Roles can only be changed by system admin.
                  </p>
                </div>
                <div className="col-span-full mt-6 flex justify-end">
                  <Button variant="primary" size="sm">Save settings</Button>
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
                className="text-lg font-medium text-gray-900 dark:text-gray-50"
              >
                Notification settings
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Configure the types of notifications you want to receive.
              </p>
            </div>
            <div className="md:col-span-2">
              <fieldset>
                <legend className="text-sm font-medium text-gray-900 dark:text-gray-50">
                  Team
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Configure the types of team alerts you want to receive.
                </p>
                <ul
                  role="list"
                  className="mt-4 divide-y divide-gray-200 dark:divide-gray-800"
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
                <legend className="text-sm font-medium text-gray-900 dark:text-gray-50">
                  Usage
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Configure the types of usage alerts you want to receive.
                </p>
                <ul
                  role="list"
                  className="mt-4 divide-y divide-gray-200 dark:divide-gray-800"
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
                <Button variant="primary" size="sm">Save settings</Button>
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
                className="text-lg font-medium text-gray-900 dark:text-gray-50"
              >
                Danger zone
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Manage general workspace. Contact system admin for more
                information.{" "}
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-blue-600 hover:underline hover:underline-offset-4 dark:text-blue-400"
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
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      Leave workspace
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Revoke your access to this team. Other people you have
                      added to the workspace will remain.
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-red-600 dark:text-red-500"
                  >
                    Leave
                  </Button>
                </div>
              </Card>
              <Card className="overflow-hidden p-0">
                <div className="flex items-start justify-between gap-10 p-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 dark:text-gray-600">
                      Delete workspace
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-gray-400 dark:text-gray-600">
                      Revoke your access to this team. Other people you have
                      added to the workspace will remain.
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled
                    className="whitespace-nowrap text-red-600 disabled:text-red-300 disabled:opacity-50 dark:text-red-500 disabled:dark:text-red-700"
                  >
                    Delete workspace
                  </Button>
                </div>
                <div className="border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-900 dark:bg-gray-900">
                  <p className="text-sm text-gray-500">
                    You cannot delete the workspace because you are not the
                    system admin.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </form>
      </section>
    </div>
  )
}
