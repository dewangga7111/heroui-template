import { Metadata } from 'next';
import DashboardPage from '@/components/pages/dashboard/dashboard-page';

export const metadata: Metadata = {
  title: 'Dashboard - ' + process.env.NEXT_PUBLIC_WEB_TITLE,
};

export default function Page() {
  return <DashboardPage />;
}
