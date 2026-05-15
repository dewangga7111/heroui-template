import { Metadata } from 'next';
import UsersPage from '@/components/pages/users/users-page';

export const metadata: Metadata = {
  title: 'Users - ' + process.env.NEXT_PUBLIC_WEB_TITLE,
};

export default function Page() {
  return <UsersPage />;
}
