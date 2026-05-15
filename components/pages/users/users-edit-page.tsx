"use client";

import { title } from "@/utils/primitives";
import { RouteGuardProvider } from "@/context/route-guard-context";

function UsersEditContent() {
  return (
    <div>
      <h1 className={title()}>Blog</h1>
    </div>
  );
}

export default function UsersEditPage() {
  return (
    <RouteGuardProvider pageId="USERS_PAGE" access="update">
      <UsersEditContent />
    </RouteGuardProvider>
  );
}
