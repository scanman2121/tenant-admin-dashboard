import { columns } from "@/components/ui/data-table/columns"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { usage } from "@/data/data"

export default function Transactions() {
  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
        Transactions
      </h1>
      <div className="mt-4">
        <DataTable data={usage} columns={columns} />
      </div>
    </div>
  )
}
