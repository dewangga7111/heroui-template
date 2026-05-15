import { Metadata } from 'next';
import UsersFormPage from '@/components/pages/users/users-form-page';

export const metadata: Metadata = {
  title: 'Add Users - ' + process.env.NEXT_PUBLIC_WEB_TITLE,
};

export default function Page() {
  return <UsersFormPage />;
}
