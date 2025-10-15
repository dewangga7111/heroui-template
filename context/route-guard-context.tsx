"use client";

import constants from "@/utils/constants"
import { usePermission } from "@/context/permission-context"; // ✅ imported global one

import { createContext, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

// This context is just a placeholder (no values exposed)
const RouteGuardContext = createContext<boolean | undefined>(undefined);

// context ini untuk menjaga routing bedasarkan permission
export const RouteGuardProvider = ({
  children,
  pageId,
}: {
  children: React.ReactNode;
  pageId: string;
}) => {
  const router = useRouter();
  const { permissions } = usePermission(); // ✅ read from global context

  useEffect(() => {
    if (!pageId || permissions.length === 0) return;

    if (!permissions.includes(pageId)) {
      console.warn(`🚫 No permission for: ${pageId}`);
      router.push(constants.path.UNAUTHORIZED);
    }
  }, [pageId, permissions, router]);

  return (
    <RouteGuardContext.Provider value={true}>
      {children}
    </RouteGuardContext.Provider>
  );
};
