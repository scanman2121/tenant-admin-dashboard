import "@tanstack/react-table"

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string
    displayName: string
    filterOptions?: {
      label: string
      value: string
    }[]
  }
}
