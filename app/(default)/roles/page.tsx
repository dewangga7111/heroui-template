import { Metadata } from 'next';
import RolesPage from '@/components/pages/roles/roles-page';

export const metadata: Metadata = {
  title: 'Roles - ' + process.env.NEXT_PUBLIC_WEB_TITLE,
};

export default function Page() {
  return <RolesPage />;
}
