import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Login - ' + process.env.NEXT_WEB_TITLE,
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>{children}</>
  );
}
