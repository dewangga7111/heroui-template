"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  Spinner,
  Button,
  Card,
} from "@heroui/react";
import { DynamicTableProps, TableColumnType } from "@/types/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { isMobile } from "react-device-detect";

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
  topContent,
}: DynamicTableProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const finalColumns: TableColumnType[] = [
    { key: "no", label: "No", align: "center", width: 50 },
    ...columns,
  ];

  const startRow = totalRows === 0 ? 0 : (page - 1) * 10 + 1;
  const endRow = Math.min(page * 10, totalRows);

  const bottomContent = (
    <div className="flex w-full justify-between items-center px-2 mt-3 max-sm:flex-col max-sm:justify-center">
      <p className="text-sm text-muted max-sm:mb-5">
        {totalRows > 0
          ? `Showing ${startRow}–${endRow} of ${totalRows} entries`
          : "No data to display"}
      </p>
      {totalPage > 0 && (
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            isDisabled={page <= 1}
            onPress={() => onPageChange?.(page - 1)}
            isIconOnly
          >
            <ChevronLeft size={16} />
          </Button>
          {Array.from({ length: Math.min(totalPage, 7) }, (_, i) => {
            const pageNum = i + 1;
            return (
              <Button
                key={pageNum}
                variant={page === pageNum ? "primary" : "ghost"}
                size="sm"
                onPress={() => onPageChange?.(pageNum)}
                isIconOnly
              >
                {pageNum}
              </Button>
            );
          })}
          <Button
            variant="outline"
            size="sm"
            isDisabled={page >= totalPage}
            onPress={() => onPageChange?.(page + 1)}
            isIconOnly
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </div>
  );

  // Mobile card view
  const renderMobileCards = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-40">
          <Spinner size="lg" />
        </div>
      );
    }

    if (!rows || rows.length === 0) {
      return <p className="text-center text-muted py-6">{emptyContent}</p>;
    }

    return (
      <div className="w-full">
        {topContent && <div className="mb-3">{topContent}</div>}
        <div className="flex flex-col gap-3">
          {rows.map((item, index) => {
            const actionColumn = columns.find((col) => col.key === "action");
            return (
              <Card key={(item as any).key || index} className="shadow-sm p-3">
                <Card.Header className="flex justify-between items-center">
                  <p className="font-semibold text-sm">
                    #{(page - 1) * 10 + (index + 1)}
                  </p>
                  {actionColumn && (
                    <div>
                      {renderCell
                        ? renderCell(item, actionColumn.key)
                        : (item as any)[actionColumn.key]}
                    </div>
                  )}
                </Card.Header>
                <Card.Content className="grid grid-cols-1 gap-2 text-sm">
                  {columns
                    .filter((col) => col.key !== "action")
                    .map((col) => (
                      <div key={col.key} className="flex justify-between">
                        <span className="text-muted font-medium">{col.label}</span>
                        <span className="text-right">
                          {renderCell
                            ? renderCell(item, col.key)
                            : (item as any)[col.key]}
                        </span>
                      </div>
                    ))}
                </Card.Content>
              </Card>
            );
          })}
        </div>
        {bottomContent}
      </div>
    );
  };

  // Desktop table view
  const renderDesktopTable = () => (
    <Card>
      <Card.Content>
        {topContent && <div className="mb-3">{topContent}</div>}
        <Table variant="secondary">
          <Table.Content>
            <Table.Header>
              {finalColumns.map((column) => (
                <Table.Column
                  key={column.key}
                  isRowHeader={column.key === "no"}
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.label}
                </Table.Column>
              ))}
            </Table.Header>
            <Table.Body
              renderEmptyState={() => (
                <p className="text-center text-muted py-6">{emptyContent}</p>
              )}
            >
              {rows.map((item, index) => (
                <Table.Row key={(item as any).id || (item as any).key || index}>
                  {finalColumns.map((column) => (
                    <Table.Cell key={column.key} style={column.align ? { textAlign: column.align } : undefined}>
                      {column.key === "no"
                        ? (page - 1) * 10 + (index + 1)
                        : renderCell
                          ? renderCell(item, column.key)
                          : (item as any)[column.key]}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table>
        {loading && (
          <div className="flex justify-center py-4">
            <Spinner size="lg" />
          </div>
        )}
        {bottomContent}
      </Card.Content>
    </Card>
  );

  if (!mounted) return null;

  return (
    <div className={className}>
      {isMobile ? renderMobileCards() : renderDesktopTable()}
    </div>
  );
}
