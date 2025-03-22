"use client"

import { Button } from "@/components/Button"
import { Searchbar } from "@/components/Searchbar"
import { RiDownloadLine } from "@remixicon/react"
import { Table } from "@tanstack/react-table"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { DataTableFilter } from "./DataTableFilter"
import { ViewOptions } from "./DataTableViewOptions"

interface FilterbarProps<TData> {
  table: Table<TData>
}

export function Filterbar<TData>({ table }: FilterbarProps<TData>) {
  const [searchTerm, setSearchTerm] = useState<string>("")

  const debouncedSetGlobalFilter = useDebouncedCallback((value) => {
    table.setGlobalFilter(value)
  }, 300)

  const handleSearchChange = (event: any) => {
    const value = event.target.value
    setSearchTerm(value)
    debouncedSetGlobalFilter(value)
  }

  const filterableColumns = table
    .getAllColumns()
    .filter((column) => column.getCanFilter())

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-x-6">
      <div className="flex w-full flex-col gap-2 sm:w-fit sm:flex-row sm:items-center">
        <Searchbar
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full sm:max-w-[250px] sm:[&>input]:h-[30px]"
        />
        {filterableColumns.map((column) => (
          <DataTableFilter
            key={column.id}
            column={column}
            title={column.columnDef.meta?.displayName}
            options={column.columnDef.meta?.filterOptions}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <ViewOptions table={table} />
        <Button
          variant="secondary"
          className="hidden gap-x-2 px-2 py-1.5 text-sm sm:text-xs lg:flex"
        >
          <RiDownloadLine className="size-4" aria-hidden="true" />
          Download
        </Button>
      </div>
    </div>
  )
}
