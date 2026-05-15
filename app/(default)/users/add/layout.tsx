import { Metadata } from 'next';
import { RouteGuardProvider } from "@/context/route-guard-context";

export const metadata: Metadata = {
  title: 'Add Users - ' + process.env.NEXT_PUBLIC_WEB_TITLE,
};

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuardProvider pageId="USERS_PAGE" access="create">
      {children}
    </RouteGuardProvider>
  );
}
