"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
  Pagination,
} from "@heroui/react";
import { DynamicTableProps, TableColumnType, TableRowType } from "@/types/table";

export default function Datatable({
  columns,
  rows,
  emptyContent = "No data available",
  loading = true,
  className = "",
  renderCell,
  page = 1,
  totalPage = 0,
  totalRows = 0,
  onPageChange,
}: DynamicTableProps) {
  // ✅ Add default "No" column in front
  const finalColumns: TableColumnType[] = [
    { key: "no", label: "No", align: "center" },
    ...columns,
  ];

  return (
    <div className={className}>
      <Table
        bottomContent={(
          <div className="flex w-full justify-end items-center">
            {/* <span className="text-gray-400">{totalRows}</span> */}
            {totalPage > 0 ? <Pagination
              showControls
              showShadow
              color="primary"
              page={page}
              total={totalPage}
              onChange={(v: number) => onPageChange?.(v)}
            /> : <div />}
          </div>
        )}
      >
        <TableHeader columns={finalColumns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.align}
              allowsSorting={column.sortable}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody
          items={rows}
          emptyContent={emptyContent}
          isLoading={loading}
          loadingContent={<Spinner size="lg" variant="wave" />}
        >
          {(item) => {
            // ✅ Get row index manually
            const index = rows.indexOf(item);
            return (
              <TableRow key={item.key || index}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "no"
                      ? (page - 1) * 10 + (index + 1)
                      : renderCell
                        ? renderCell(item, columnKey)
                        : getKeyValue(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
    </div>
  );
}
