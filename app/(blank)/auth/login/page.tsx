import { Metadata } from 'next';
import LoginPage from '@/components/pages/auth/login-page';

export const metadata: Metadata = {
  title: 'Login - ' + process.env.NEXT_PUBLIC_WEB_TITLE,
};

export default function Page() {
  return <LoginPage />;
}
