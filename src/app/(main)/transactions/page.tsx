import { PageHeader } from "@/components/PageHeader"
import { columns } from "@/components/ui/data-table/columns"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { usage } from "@/data/data"

export default function Transactions() {
  return (
    <div>
      <PageHeader title="Transactions" />
      <div className="mt-4">
        <DataTable data={usage} columns={columns} />
      </div>
    </div>
  )
}
