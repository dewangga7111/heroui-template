"use client";

import { useEffect, useState } from "react";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Avatar,
  Breadcrumbs,
  BreadcrumbItem,
  Drawer,
  useDisclosure,
  Button,
  DrawerContent,
  DrawerBody,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Listbox,
  ListboxItem
} from "@heroui/react";
import { ThemeSwitch } from "@/components/theme-switch";
import { usePathname, useRouter } from "next/navigation";
import { EllipsisVertical, LogOut, Menu, User } from "lucide-react";
import { breadcrumbsItems } from "../config/breadcrumbs";
import { useBreadcrumbs, Breadcrumb } from "@/context/breadcrumbs-context";
import { MobileView, isMobile } from "react-device-detect";
import SidebarContent from "./sidebar/sidebar-content";
import { useConfirmation } from "@/context/confirmation-context";
import { showSuccessToast } from "@/utils/common";
import { ManagedPopover } from "./common/managed-popover";

const getBasePath = (path: string) => {
  // Remove query/hash
  let cleanPath = path.split(/[?#]/)[0].replace(/\/$/, "");

  // Split into parts
  const parts = cleanPath.split("/").filter(Boolean);

  // If the last part looks like an ID (number or UUID-like), remove it
  if (/^\d+$/.test(parts.at(-1) as any) || /^[A-Za-z0-9_-]{6,}$/.test(parts.at(-1) as any)) {
    parts.pop();
  }

  return "/" + parts.join("/");
}

// 🔑 Recursive function to find the breadcrumb trail
const findBreadcrumbTrail = (
  items: any[],
  pathname: string,
  trail: Breadcrumb[] = []
): Breadcrumb[] | null => {
  for (const item of items) {
    const newTrail = [...trail, { label: item.label, path: item.path }];

    if (item.path == getBasePath(pathname)) {
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
  const router = useRouter();
  const pathname = usePathname();
  const { breadcrumbs, setBreadcrumbs } = useBreadcrumbs();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { confirm } = useConfirmation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const trail = findBreadcrumbTrail(breadcrumbsItems, pathname) || [];
    setBreadcrumbs(trail);
  }, [pathname, setBreadcrumbs]);

  if (!mounted) return null;

  return (
    <>
      <HeroNavbar
        maxWidth="full"
        className="backdrop-blur-md rounded-bl-lg rounded-br-lg shadow-sm"
        position="sticky"
      >
        {isMobile ? (
          <NavbarBrand>
            <Button
              isIconOnly
              variant="light"
              onPress={onOpen}
              aria-label="Toggle Menu"
            >
              <Menu size={20} />
            </Button>
          </NavbarBrand>
        ) : (
          <NavbarBrand>
            {breadcrumbs.length > 0 && (
              <Breadcrumbs size="lg">
                {breadcrumbs.map((crumb, idx) => (
                  <BreadcrumbItem key={idx} onPress={() => router.push(crumb.path as string)} isDisabled={!crumb.path} className="font-semibold">
                    {crumb.label}
                  </BreadcrumbItem>
                ))}
              </Breadcrumbs>
            )}
          </NavbarBrand>
        )}

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
            <ManagedPopover
              key="user-actions-popover"
              trigger={
                <Button
                  variant="light"
                  size="sm"
                  isIconOnly
                >
                  <EllipsisVertical size={20} />
                </Button>
              }
            >
              <Listbox aria-label="User actions" variant="flat">
                <ListboxItem
                  key="profile"
                  startContent={<User size={13} />}
                  onPress={() => {
                  }}
                >
                  Profile
                </ListboxItem>
                <ListboxItem
                  key="logout"
                  className="text-danger"
                  color="danger"
                  startContent={<LogOut size={13} />}
                  onPress={() => {
                    confirm("Are you sure you want to logout?", () => {
                      showSuccessToast("You have been loged out!");
                    });
                  }}
                >
                  Logout
                </ListboxItem>
              </Listbox>
            </ManagedPopover>
          </NavbarItem>
        </NavbarContent>
      </HeroNavbar>
      <MobileView>
        <Drawer
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="full"
          placement="left"
          motionProps={{
            variants: {
              enter: {
                opacity: 1,
                x: 0,
              },
              exit: {
                x: -100,
                opacity: 0,
              },
            },
          }}
        >
          <DrawerContent>
            {(onClose) => (
              <DrawerBody>
                <SidebarContent open={true} setOpen={() => { }} onClose={onClose} />
              </DrawerBody>
            )}
          </DrawerContent>
        </Drawer>
      </MobileView>
    </>
  );
};
