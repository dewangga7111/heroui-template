import { Metadata } from 'next';
import UsersEditPage from '@/components/pages/users/users-edit-page';

export const metadata: Metadata = {
  title: 'Edit Users - ' + process.env.NEXT_PUBLIC_WEB_TITLE,
};

export default function Page() {
  return <UsersEditPage />;
}
