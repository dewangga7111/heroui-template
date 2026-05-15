import { Metadata } from 'next';
import { RouteGuardProvider } from "@/context/route-guard-context";

export const metadata: Metadata = {
  title: 'Add Roles - ' + process.env.NEXT_PUBLIC_WEB_TITLE,
};

export default function RolesLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuardProvider pageId="ROLES_PAGE" access="create">
      {children}
    </RouteGuardProvider>
  );
}
