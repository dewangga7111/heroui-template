"use client";

import { title } from "@/utils/primitives";
import { RouteGuardProvider } from "@/context/route-guard-context";

function RolesEditContent() {
  return (
    <div>
      <h1 className={title()}>Blog</h1>
    </div>
  );
}

export default function RolesEditPage() {
  return (
    <RouteGuardProvider pageId="ROLES_PAGE" access="update">
      <RolesEditContent />
    </RouteGuardProvider>
  );
}
