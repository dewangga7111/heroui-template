import { Metadata } from 'next';
import UsersAddPage from '@/components/pages/users/users-add-page';

export const metadata: Metadata = {
  title: 'Add Users - ' + process.env.NEXT_PUBLIC_WEB_TITLE,
};

export default function Page() {
  return <UsersAddPage />;
}
