import { PageHeader } from "@/components/PageHeader"
import { columns } from "@/components/ui/data-table/columns"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { usage } from "@/data/data"

export default function Discounts() {
    return (
        <div>
            <PageHeader
                title="Discounts"
                primaryCta="Add New Discount"
            />
            <div className="mt-4">
                <DataTable data={usage} columns={columns} />
            </div>
        </div>
    )
} 