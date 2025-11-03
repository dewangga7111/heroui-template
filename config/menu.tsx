import { Home, Settings, Users, LogOut, Bell } from "lucide-react";
import { ReactNode } from "react";

type MenuItem = {
  key: string;
  label: string;
  path?: string;
  icon?: ReactNode;
  children?: MenuItem[];
};

export const menus: MenuItem[] = [
  {
    key: "HOME_PAGE",
    label: "Home",
    icon: <Home size={18} />,
    path: "/",
  },
  {
    key: "settings",
    label: "Settings",
    icon: <Settings size={18} />,
    children: [
      {
        key: "USERS_PAGE",
        label: "Users",
        path: "/users",
      },
    ],
  },
  {
    key: "logout",
    label: "Logout",
    icon: <LogOut size={18} />,
    path: "/logout",
  },
];
