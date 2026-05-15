"use client";

import { usePermission } from "@/context/permission-context";

import { createContext, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

// This context is just a placeholder (no values exposed)
const RouteGuardContext = createContext<boolean | undefined>(undefined);

export const RouteGuardProvider = ({
  children,
  pageId,
  access,
}: {
  children: React.ReactNode;
  pageId: string;
  access: string;
}) => {
  const router = useRouter();
  const { hasPermission } = usePermission();

  useEffect(() => {
    if (!pageId) return;
    
    const hasAccess = hasPermission(pageId, access);

    if (!hasAccess) {
      console.warn(`🚫 No ${access} permission for: ${pageId}`);
      router.push("/misc/403");
    }
  }, [pageId, access, hasPermission, router]);

  return (
    <RouteGuardContext.Provider value={true}>
      {children}
    </RouteGuardContext.Provider>
  );
};
