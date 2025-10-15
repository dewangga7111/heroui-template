"use client";

import { useEffect } from "react";
import {
  Button,
  getKeyValue,
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";

import Datatable from "@/components/pages/datatable";
import Filter from "@/components/pages/filter";
import constants from "@/utils/constants"
import { TableColumnType, TableRowType } from "@/types/table";
import { FilterField } from "@/types/filter";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUsers } from "@/redux/api/users-api";
import { useLoading } from '@/hooks/useLoading';
import { formatEllipsis, showSuccessToast, showErrorToast } from "@/utils/common";
import { useConfirmation } from "@/context/confirmation-context";

import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";

export default function UsersPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state.users);
  const isLoading = useLoading('users');
  const { confirm } = useConfirmation();

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

  const columns: TableColumnType[] = [
    { key: "firstName", label: "Name", width: 200 },
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "action", label: "action", width: '100px', align: 'center' },
  ];

  // contoh render cell untuk nge render column custom
  const renderCell = (item: TableRowType, columnKey: React.Key) => {
    const key = String(columnKey);
    const cellValue = getKeyValue(item, key);

    switch (key) {
      case "email":
        return (
          <div>
            {formatEllipsis(cellValue, 20)}
          </div>
        );
      case "action":
        return (
          <div className="flex justify-end gap-2">
            <Button
              color="primary"
              className="max-w-[120px]"
              onPress={() => router.push(`${constants.path.USERS}/edit/${item.id}`)}
              size="sm"
              isIconOnly
            >
              <Pencil size={18} />
            </Button>
            <Button
              color="danger"
              className="max-w-[120px]"
              onPress={() =>
                confirm("Are you sure you want to delete this item?", () => {
                  showSuccessToast("Item deleted!");
                })}
              size="sm"
              isIconOnly
            >
              <Trash2 size={18} />
            </Button>
          </div >
        );

      default:
        return cellValue;
    }
  };

  useEffect(() => {
    dispatch(fetchUsers({ ...store.params, ...store.paging }))
  }, []);

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
        onPageChange={(page: number) => {
          dispatch(fetchUsers({ ...store.params, ...store.paging, page }))
        }}
        doAdd={() => router.push(`${constants.path.USERS}/add`)}
      />
    </div>
  );
}
