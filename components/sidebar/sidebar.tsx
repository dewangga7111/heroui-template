"use client";

import { useEffect, useState } from "react";
import { Button, Card, Tooltip, ScrollShadow } from "@heroui/react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import SidebarMenuItem from "./sidebar-item";
import { menus } from "@/config/menu";
import { isMenuActive } from "./utils";
import { usePermission } from "@/context/permission-context";

export default function Sidebar() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const pathname = usePathname();
  const { theme } = useTheme();
  const { hasPermission } = usePermission();

  useEffect(() => setMounted(true), []);

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // auto-open parents if current pathname is inside children
  useEffect(() => {
    const newOpenMenus: Record<string, boolean> = {};
    menus.forEach((item) => {
      if (item.children && isMenuActive(item, pathname)) {
        newOpenMenus[item.key] = true;
      }
    });
    setOpenMenus((prev) => ({ ...prev, ...newOpenMenus }));
  }, [pathname]);

  // ✅ Helper: check if parent should be shown
  const shouldShowMenu = (item: any): boolean => {
    // if it has a direct permission
    if (item.key && hasPermission(item.key)) return true;

    // if it has children and at least one child is allowed
    if (item.children && item.children.some((child: any) => shouldShowMenu(child)))
      return true;

    return false;
  };

  return (
    <Card
      className={`h-screen sticky top-0 transition-all duration-300 rounded-none
        ${open ? "w-64" : "w-16"} flex flex-col`}
      shadow="sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3">

        <Tooltip
          content={open ? "Close Sidebar" : "Open Sidebar"}
          showArrow={true}
          placement="right"
          color="foreground"
          closeDelay={0}
          delay={500}
          size="sm"
        >
          <Button
            isIconOnly
            variant="light"
            onPress={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            <Menu size={20} />
          </Button>
        </Tooltip>
        {open && <span className="font-bold">MyApp</span>}
      </div>

      {/* Menu */}
      <ScrollShadow aria-label="Sidebar menu" className="flex-grow">
        {menus
          .filter((item) => shouldShowMenu(item)) // ✅ show only if allowed (direct or child)
          .map((item) => (
            <SidebarMenuItem
              key={item.key || item.label}
              item={{
                ...item,
                children: item.children?.filter((child) => shouldShowMenu(child)), // ✅ filter children
              }}
              pathname={pathname}
              theme={theme}
              open={open}
              openMenus={openMenus}
              toggleMenu={toggleMenu}
              mounted={mounted}
            />
          ))}
      </ScrollShadow>
    </Card>
  );
}
