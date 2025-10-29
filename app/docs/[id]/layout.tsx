import { Metadata } from 'next';

export const pageId = "DOCS_PAGE";

export const metadata: Metadata = {
  title: 'Docs - ' + process.env.NEXT_WEB_TITLE,
};
export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        {children}
      </div>
    </section>
  );
}
