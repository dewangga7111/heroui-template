"use client";

import { useEffect } from "react";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Avatar,
  Breadcrumbs,
  BreadcrumbItem
} from "@heroui/react";
import { ThemeSwitch } from "@/components/theme-switch";
import { usePathname } from "next/navigation";
import { EllipsisVertical } from "lucide-react";
import { breadcrumbsItems } from "../config/breadcrumbs";
import { useBreadcrumbs, Breadcrumb } from "@/context/breadcrumbs-context";

// 🔑 Recursive function to find the breadcrumb trail
const findBreadcrumbTrail = (
  items: any[],
  pathname: string,
  trail: Breadcrumb[] = []
): Breadcrumb[] | null => {
  for (const item of items) {
    const newTrail = [...trail, { label: item.label, path: item.path }];

    if (item.path === pathname) {
      return newTrail;
    }

    if (item.children) {
      const childTrail = findBreadcrumbTrail(item.children, pathname, newTrail);
      if (childTrail) {
        return childTrail;
      }
    }
  }
  return null;
};

export const Navbar = () => {
  const pathname = usePathname();
  const { breadcrumbs, setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    const trail = findBreadcrumbTrail(breadcrumbsItems, pathname) || [];
    setBreadcrumbs(trail);
  }, [pathname, setBreadcrumbs]);

  return (
    <HeroNavbar
      maxWidth="full"
      className="bg-background backdrop-blur-md rounded-bl-lg rounded-br-lg shadow-sm"
      position="sticky"
    >
      <NavbarBrand>
        {breadcrumbs.length > 0 && (
          <Breadcrumbs size="lg">
            {breadcrumbs.map((crumb, idx) => (
              <BreadcrumbItem key={idx} href={crumb.path} isDisabled={!crumb.path} className="font-semibold">
                {crumb.label}
              </BreadcrumbItem>
            ))}
          </Breadcrumbs>
        )}
      </NavbarBrand>

      {/* Right Section - Actions */}
      <NavbarContent justify="end">
        <NavbarItem className="flex items-center">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="flex items-center">
          <Avatar
            isBordered
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            size="sm"
          />
          <div className="mx-2 min-w-[120px]">
            <p className="text-sm font-medium ml-2">John Doe</p>
            <p className="text-xs text-default-500 ml-2">Admin</p>
          </div>
          <EllipsisVertical size={20} />
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  );
};
