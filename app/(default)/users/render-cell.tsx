"use client";

import { useState, useEffect } from "react";
import {
  Button,
  getKeyValue,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { EllipsisVertical, Trash2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

import constants from "@/utils/constants";
import { RenderCellProps } from "@/types/table";
import { formatEllipsis, showSuccessToast } from "@/utils/common";
import { useConfirmation } from "@/context/confirmation-context";

export default function UsersRenderCell({ item, columnKey }: RenderCellProps) {
  const key = String(columnKey);
  const cellValue = getKeyValue(item, key);
  const router = useRouter();
  const { confirm } = useConfirmation();

  // 🔹 local popover open state
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // 🔹 close popover when global "close-all-popovers" event fires (from confirmation)
  useEffect(() => {
    const handleCloseAll = () => setIsPopoverOpen(false);
    window.addEventListener("close-all-popovers", handleCloseAll);
    return () => window.removeEventListener("close-all-popovers", handleCloseAll);
  }, []);

  switch (key) {
    case "email":
      return <div>{formatEllipsis(cellValue, 20)}</div>;

    case "action":
      return (
        <Popover
          placement="right"
          isOpen={isPopoverOpen}
          onOpenChange={setIsPopoverOpen}
        >
          <PopoverTrigger>
            <Button
              variant="light"
              size="sm"
              isIconOnly
              onPress={() => setIsPopoverOpen((v) => !v)}
            >
              <EllipsisVertical size={18} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Listbox aria-label="User actions" variant="flat">
              <ListboxItem
                key="edit"
                startContent={<Pencil size={13}/>}
                onPress={() => {
                  router.push(`${constants.path.USERS}/edit/${item.id}`);
                }}
              >
                Edit
              </ListboxItem>
              <ListboxItem
                key="delete"
                className="text-danger"
                color="danger"
                startContent={<Trash2 size={13}/>}
                onPress={() => {
                  confirm("Are you sure you want to delete this item?", () => {
                    showSuccessToast("Item deleted!");
                  });
                }}
              >
                Delete
              </ListboxItem>
            </Listbox>
          </PopoverContent>
        </Popover>
      );

    default:
      return cellValue;
  }
}
