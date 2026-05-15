"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { PlusIcon } from "lucide-react";
import { button } from "@/utils/primitives";

import Datatable from "@/components/datatable/datatable";
import Filter from "@/components/datatable/filter";
import { TableColumnType, TableRowType } from "@/types/table";
import { FilterField } from "@/types/filter";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUsers } from "@/redux/api/users-api";
import { fetchRoles } from "@/redux/api/roles-api";
import { useLoading } from "@/hooks/useLoading";
import { clearUsers } from "@/redux/slices/users-slice";
import { RouteGuardProvider } from "@/context/route-guard-context";
import UsersRenderCell from "./users-render-cell";

export default function UsersPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state.users);
  const rolesStore = useSelector((state: RootState) => state.roles);
  const isLoading = useLoading("users");

  const fields: FilterField[] = [
    { type: "input", key: "name", label: "Name" },
    {
      type: "autocomplete",
      key: "role",
      label: "Role",
      placeholder: "Select role",
      options: (rolesStore.data ?? []).map((opt) => ({
        label: opt.role_name,
        value: opt.role_name,
      })),
    },
    { type: "datepicker", key: "joinedAt", label: "Joined Date" },
    { type: "daterange", key: "activeRange", label: "Active Range" },
  ];

  const columns: TableColumnType[] = [
    { key: "action", label: "Action", width: 50, align: "center" },
    { key: "firstName", label: "Name", width: 200 },
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
  ];

  const renderCell = (item: TableRowType, columnKey: React.Key) => (
    <UsersRenderCell item={item} columnKey={columnKey} />
  );

  useEffect(() => {
    dispatch(fetchUsers({ ...store.params, ...store.paging }));
    dispatch(fetchRoles({}));

    return () => {
      dispatch(clearUsers());
    };
  }, [dispatch]);

  return (
    <RouteGuardProvider pageId="USERS_PAGE" access="read">
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
            dispatch(fetchUsers({ ...store.params, ...store.paging, page }));
          }}
          topContent={
            <div className="flex justify-end">
              <Button variant="primary" className={button()} onPress={() => router.push("/users/add")}>
                <PlusIcon size={16} />
                Add
              </Button>
            </div>
          }
        />
      </div>
    </RouteGuardProvider>
  );
}
