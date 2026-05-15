import { Metadata } from 'next';
import ForbiddenPage from '@/components/pages/misc/forbidden-page';

export const metadata: Metadata = {
  title: 'Access Denied - ' + process.env.NEXT_PUBLIC_WEB_TITLE,
};

export default function Page() {
  return <ForbiddenPage />;
}
