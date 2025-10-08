"use client";

import { useEffect } from "react";
import {
  getKeyValue,
  Link,
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";

import Datatable from "@/components/pages/datatable";
import Filter from "@/components/pages/filter";
import { TableColumnType, TableRowType } from "@/types/table";
import { FilterField } from "@/types/filter";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUsers } from "@/redux/api/users-api";
import { useLoading } from '@/hooks/useLoading';

export default function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state.users);
  const isLoading = useLoading('users');

  const columns: TableColumnType[] = [
    { key: "firstName", label: "Name" },
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "website", label: "Website" },
    { key: "phone", label: "Phone" },
  ];

  const renderCell = (item: TableRowType, columnKey: React.Key) => {
    const key = String(columnKey);
    const cellValue = getKeyValue(item, key);

    switch (key) {
      case "website":
        return (
          <Link
            isExternal
            href={cellValue}
          >
            {cellValue}
          </Link>
        );

      default:
        return cellValue;
    }
  };

  useEffect(() => {
    dispatch(fetchUsers({ ...store.params, ...store.paging }))
  }, []);

  const handlePagination = (page: number) => {
    dispatch(fetchUsers({ ...store.params, ...store.paging, page }))
  }

  const fields: FilterField[] = [
    { type: "input", name: "name", label: "Name" },
    {
      type: "autocomplete",
      name: "role",
      label: "Role",
      placeholder: "Select role",
      options: (store.data ?? []).map((opt) => ({
        label: opt.firstName,
        value: opt.firstName
      })),
    },
    { type: "datepicker", name: "joinedAt", label: "Joined Date" },
    { type: "daterange", name: "activeRange", label: "Active Range" },
  ];

  return (
    <div>
      <Filter
        fields={fields}
        onFilter={(data) => {
          dispatch(fetchUsers({ ...data, ...store.paging, page: 1 }));
        }}
        onClear={() => {
          dispatch(fetchUsers({ ...store.paging, page: 1 }));
        }}
      />
      <Datatable
        columns={columns}
        rows={store.data}
        renderCell={renderCell}
        loading={isLoading}
        page={store.paging.page!}
        totalPage={store.paging.totalPage!}
        totalRows={store.paging.totalRows!}
        onPageChange={handlePagination}
      />
    </div>
  );
}
