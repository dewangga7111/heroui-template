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
  Button,
} from "@heroui/react";
import { DynamicTableProps, TableColumnType } from "@/types/table";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

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
  doAdd,
}: DynamicTableProps) {
  const router = useRouter();
  const finalColumns: TableColumnType[] = [
    { key: "no", label: "No", align: "center", width: 50 },
    ...columns,
  ];

  // Add top content (like add button)
  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-end gap-3 items-end">
          <Button onPress={doAdd} color="primary" startContent={<PlusIcon />}>
            Add
          </Button>
        </div>
      </div>
    );
  }, []);

  // Calculate table info range
  const startRow = totalRows === 0 ? 0 : (page - 1) * 10 + 1;
  const endRow = Math.min(page * 10, totalRows);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex w-full justify-between items-center px-2">
        {/* ✅ Left side: table info */}
        <p className="text-sm text-default-500">
          {totalRows > 0
            ? `Showing ${startRow}–${endRow} of ${totalRows} entries`
            : "No data to display"}
        </p>

        {/* ✅ Right side: pagination */}
        {totalPage > 0 ? (
          <Pagination
            showControls
            showShadow
            color="primary"
            page={page}
            total={totalPage}
            onChange={(v: number) => onPageChange?.(v)}
          />
        ) : (
          <div />
        )}
      </div>
    );
  }, [page, totalPage, totalRows]);

  return (
    <div className={className}>
      <Table
        topContent={topContent}
        bottomContent={bottomContent}
      >
        <TableHeader columns={finalColumns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.align}
              width={(column.width || 'auto') as any}
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
