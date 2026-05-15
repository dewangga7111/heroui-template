import { Metadata } from 'next';
import RolesEditPage from '@/components/pages/roles/roles-edit-page';

export const metadata: Metadata = {
  title: 'Edit Roles - ' + process.env.NEXT_PUBLIC_WEB_TITLE,
};

export default function Page() {
  return <RolesEditPage />;
}
