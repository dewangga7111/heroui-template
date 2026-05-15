import { Metadata } from 'next';
import RolesFormPage from '@/components/pages/roles/roles-form-page';

export const metadata: Metadata = {
  title: 'Add Roles - ' + process.env.NEXT_PUBLIC_WEB_TITLE,
};

export default function Page() {
  return <RolesFormPage />;
}
