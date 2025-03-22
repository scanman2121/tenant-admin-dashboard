import { Button } from "@/components/Button"
import { PageHeader } from "@/components/PageHeader"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { RiAddLine } from "@remixicon/react"

// Mock data for work orders
const workOrders = [
    {
        id: "WO-2024-001",
        title: "Broken AC in Meeting Room 3",
        status: "In Progress",
        priority: "High",
        submittedBy: "John Smith",
        submittedDate: "2024-03-20",
        building: "HQ Building",
    },
    {
        id: "WO-2024-002",
        title: "Light Bulb Replacement",
        status: "Pending",
        priority: "Low",
        submittedBy: "Sarah Johnson",
        submittedDate: "2024-03-19",
        building: "East Wing",
    },
    {
        id: "WO-2024-003",
        title: "Elevator Maintenance",
        status: "Completed",
        priority: "Medium",
        submittedBy: "Mike Brown",
        submittedDate: "2024-03-18",
        building: "West Wing",
    },
]

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case "completed":
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
        case "in progress":
            return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
        case "pending":
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
}

const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
        case "high":
            return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        case "medium":
            return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
        case "low":
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
}

export default function WorkOrdersPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Work orders"
                customButtons={
                    <Button size="md" className="inline-flex items-center">
                        <RiAddLine className="size-4 shrink-0 mr-1.5" aria-hidden="true" />
                        Create work order
                    </Button>
                }
            />

            <div className="rounded-lg border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Submitted by</TableHead>
                            <TableHead>Submitted date</TableHead>
                            <TableHead>Building</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {workOrders.map((order) => (
                            <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50">
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.title}</TableCell>
                                <TableCell>
                                    <Badge className={getStatusColor(order.status)} variant="secondary">
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge className={getPriorityColor(order.priority)} variant="secondary">
                                        {order.priority}
                                    </Badge>
                                </TableCell>
                                <TableCell>{order.submittedBy}</TableCell>
                                <TableCell>{order.submittedDate}</TableCell>
                                <TableCell>{order.building}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
} 