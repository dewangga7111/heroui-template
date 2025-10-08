import { Metadata } from 'next';
import { RouteGuardProvider } from "@/context/route-guard-context";

export const pageId = "USERS_PAGE";

export const metadata: Metadata = {
  title: 'Add Users - ' + process.env.NEXT_WEB_TITLE,
};

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuardProvider pageId={pageId}>
      {children}
    </RouteGuardProvider>
  );
}
