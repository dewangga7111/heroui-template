"use client";
import { createContext, useContext, useState, useEffect } from "react";

type PermissionContextType = {
  permissions: string[];
  hasPermission: (pageId: string) => boolean;
};

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export const PermissionProvider = ({ children }: { children: React.ReactNode }) => {
  const [permissions, setPermissions] = useState<string[]>([]);

  // Load permissions once
  useEffect(() => {
    const stored = localStorage.getItem("permissions");
    if (stored) {
      setPermissions(JSON.parse(stored));
    } else {
      // default simulated permissions
      setPermissions([
        "HOME_PAGE",
        "USERS_PAGE",
        "BLOG_PAGE",
        // "SETTINGS_PAGE"
      ]);
    }
  }, []);

  const hasPermission = (perm: string) => permissions.includes(perm);

  return (
    <PermissionContext.Provider value={{ permissions, hasPermission }}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission = () => {
  const ctx = useContext(PermissionContext);
  if (!ctx) throw new Error("usePermission must be used within PermissionProvider");
  return ctx;
};
