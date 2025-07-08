import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnResizeMode,
  getSortedRowModel,
  type SortingState,
  type ColumnSort,
} from "@tanstack/react-table";
import { useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";

type TableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  title?: string;
  loading?: boolean;
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
  defaultSorting?: ColumnSort[];
};

const BasicTable = <TData extends object>({
  data = [],
  columns,
  title,
  className = "",
  headerClassName = "",
  rowClassName = "",
  defaultSorting = [],
  loading,
}: TableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>(defaultSorting);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange" as ColumnResizeMode,
  });

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {title && (
        <h2 className="text-xl font-semibold mb-4 text-gray-200">{title}</h2>
      )}
      <div className="bg-white/5 rounded-xl p-4 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className={`bg-gray-800/50 ${headerClassName}`}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    const canSort = header.column.getCanSort();
                    const sortDirection = header.column.getIsSorted();

                    return (
                      <th
                        key={header.id}
                        className={`px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider ${
                          index === 0 ? "rounded-l-lg" : ""
                        } ${
                          index === headerGroup.headers.length - 1
                            ? "rounded-r-lg"
                            : ""
                        } ${
                          canSort
                            ? "cursor-pointer select-none hover:bg-gray-700/50"
                            : ""
                        }`}
                        onClick={
                          canSort
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                      >
                        <div className="flex items-center justify-between">
                          <span className="truncate">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </span>
                          {canSort && (
                            <span className="ml-2 flex-none">
                              {sortDirection === "asc" ? (
                                <ArrowUpIcon className="h-3.5 w-3.5" />
                              ) : sortDirection === "desc" ? (
                                <ArrowDownIcon className="h-3.5 w-3.5" />
                              ) : (
                                <ArrowsUpDownIcon className="h-3.5 w-3.5 opacity-30" />
                              )}
                            </span>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            <tbody className="divide-y divide-gray-700">
              {table.getRowModel().rows.length > 0 &&
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-gray-800/30 transition-colors ${rowClassName}`}
                  >
                    {row.getVisibleCells().map((cell, cellIndex) => (
                      <td
                        key={cell.id}
                        className={`px-6 py-4 whitespace-nowrap ${
                          cellIndex === 0
                            ? "font-medium text-white"
                            : "text-gray-300"
                        }`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}{" "}
              {!loading && table.getRowModel().rows.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>

            {loading && (
              <tbody className="divide-y divide-gray-700">
                {[...Array(5)].map((_, rowIndex) => (
                  <tr key={`skeleton-row-${rowIndex}`} className="animate-pulse">
                    {Array(columns.length).fill(0).map((_, cellIndex) => (
                      <td 
                        key={`skeleton-cell-${rowIndex}-${cellIndex}`}
                        className="px-6 py-4"
                      >
                        <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default BasicTable;
