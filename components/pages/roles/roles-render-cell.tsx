"use client";

import { Dropdown } from "@heroui/react";
import { EllipsisVertical, Trash2, Pencil, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

import { RenderCellProps } from "@/types/table";
import { showSuccessToast } from "@/utils/common";
import { useConfirmation } from "@/context/confirmation-context";

export default function RolesRenderCell({ item, columnKey }: RenderCellProps) {
  const key = String(columnKey);
  const cellValue = (item as any)[key];
  const router = useRouter();
  const { confirm } = useConfirmation();

  switch (key) {
    case "action":
      return (
        <Dropdown>
          <Dropdown.Trigger className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-default cursor-pointer">
            <EllipsisVertical size={18} />
          </Dropdown.Trigger>
          <Dropdown.Popover className="min-w-32">
            <Dropdown.Menu aria-label="Role actions">
              <Dropdown.Item id="permission" onAction={() => router.push(`/roles/permission/${item.id}`)}>
                <span className="flex items-center gap-2"><Lock size={13} /> Permission</span>
              </Dropdown.Item>
              <Dropdown.Item id="edit" onAction={() => router.push(`/roles/edit/${item.id}`)}>
                <span className="flex items-center gap-2"><Pencil size={13} /> Edit</span>
              </Dropdown.Item>
              <Dropdown.Item
                id="delete"
                className="text-danger"
                onAction={() => {
                  confirm({
                    message: "Are you sure you want to delete this data?",
                    onConfirm: () => showSuccessToast("Data Deleted Successfully"),
                  });
                }}
              >
                <span className="flex items-center gap-2"><Trash2 size={13} /> Delete</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      );

    default:
      return cellValue;
  }
}
