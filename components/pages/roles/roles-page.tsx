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
import { fetchRoles } from "@/redux/api/roles-api";
import { useLoading } from "@/hooks/useLoading";
import { clearRoles } from "@/redux/slices/roles-slice";
import { RouteGuardProvider } from "@/context/route-guard-context";
import RolesRenderCell from "./roles-render-cell";

export default function RolesPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state.roles);
  const isLoading = useLoading("roles");

  const fields: FilterField[] = [
    { type: "input", key: "role_name", label: "Name" },
  ];

  const columns: TableColumnType[] = [
    { key: "action", label: "Action", width: 50, align: "center" },
    { key: "role_name", label: "Name", width: 200 },
    { key: "description", label: "Description" },
  ];

  const renderCell = (item: TableRowType, columnKey: React.Key) => (
    <RolesRenderCell item={item} columnKey={columnKey} />
  );

  useEffect(() => {
    dispatch(fetchRoles({ ...store.params, ...store.paging }));

    return () => {
      dispatch(clearRoles());
    };
  }, [dispatch]);

  return (
    <RouteGuardProvider pageId="ROLES_PAGE" access="read">
      <div>
        <Filter
          fields={fields}
          onFilter={(data) => {
            dispatch(fetchRoles({ ...data, ...store.paging, page: 1 }));
          }}
          onClear={() => {
            dispatch(fetchRoles({ ...store.paging, page: 1 }));
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
            dispatch(fetchRoles({ ...store.params, ...store.paging, page }));
          }}
          topContent={
            <div className="flex justify-end">
              <Button variant="primary" className={button()} onPress={() => router.push("/roles/add")}>
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
