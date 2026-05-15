import { Metadata } from 'next';
import RolesPermissionPage from '@/components/pages/roles/roles-permission-page';

export const metadata: Metadata = {
  title: 'Edit Permission - ' + process.env.NEXT_PUBLIC_WEB_TITLE,
};

export default function Page() {
  return <RolesPermissionPage />;
}
