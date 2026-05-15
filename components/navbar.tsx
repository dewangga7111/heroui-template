"use client";

import { useEffect, useState } from "react";
import { Avatar, Button, useOverlayState, Drawer, Dropdown } from "@heroui/react";
import { ThemeSwitch } from "@/components/theme-switch";
import { useRouter } from "next/navigation";
import { EllipsisVertical, LogOut, Menu, User } from "lucide-react";
import { MobileView, isMobile } from "react-device-detect";

import SidebarContent from "./sidebar/sidebar-content";
import { useConfirmation } from "@/context/confirmation-context";
import { showSuccessToast } from "@/utils/common";

export const Navbar = () => {
  const router = useRouter();
  const drawerState = useOverlayState();
  const { confirm } = useConfirmation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <nav className="sticky top-0 z-10 flex items-center justify-between backdrop-blur-md rounded-bl-lg rounded-br-lg shadow-sm px-4 h-[50px] bg-overlay/80">
        {isMobile && (
          <Button
            isIconOnly
            variant="ghost"
            onPress={drawerState.open}
            aria-label="Toggle Menu"
          >
            <Menu size={20} />
          </Button>
        )}

        <div className="ml-auto flex items-center gap-2">
          <ThemeSwitch />
          <div className="flex items-center">
            <Avatar size="sm" className="ring-2 ring-accent ring-offset-1">
              <Avatar.Image src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="User" />
              <Avatar.Fallback>JD</Avatar.Fallback>
            </Avatar>
            <div className="mx-2 min-w-[120px]">
              <p className="text-sm font-medium ml-2">John Doe</p>
              <p className="text-xs text-muted ml-2">Admin</p>
            </div>
            <Dropdown>
              <Dropdown.Trigger className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-default cursor-pointer">
                <EllipsisVertical size={20} />
              </Dropdown.Trigger>
              <Dropdown.Popover placement="bottom end" className="min-w-32">
                <Dropdown.Menu aria-label="User actions">
                  <Dropdown.Item id="profile" onAction={() => { }}>
                    <span className="flex items-center gap-2"><User size={13} /> Profile</span>
                  </Dropdown.Item>
                  <Dropdown.Item
                    id="logout"
                    className="text-danger"
                    onAction={() => {
                      confirm({
                        message: "Are you sure you want to logout?",
                        onConfirm: () => {
                          showSuccessToast("You have been logged out!");
                          router.push("/auth/login");
                        },
                      });
                    }}
                  >
                    <span className="flex items-center gap-2"><LogOut size={13} /> Logout</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>
        </div>
      </nav>

      <MobileView>
        <Drawer state={drawerState}>
          <Drawer.Backdrop />
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.Body>
                <SidebarContent open={true} setOpen={() => { }} onClose={drawerState.close} />
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer>
      </MobileView>
    </>
  );
};
