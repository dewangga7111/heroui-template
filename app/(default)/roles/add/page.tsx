import { Metadata } from 'next';
import RolesAddPage from '@/components/pages/roles/roles-add-page';

export const metadata: Metadata = {
  title: 'Add Roles - ' + process.env.NEXT_PUBLIC_WEB_TITLE,
};

export default function Page() {
  return <RolesAddPage />;
}
