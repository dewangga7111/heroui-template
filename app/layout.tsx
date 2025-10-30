import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import { MainLayout } from "./main-layout";

export const metadata: Metadata = {
  title: {
    default: `${process.env.NEXT_WEB_TITLE}`,
    template: `%s`,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="flex min-h-screen w-full bg-gradient-to-b from-stone-50 via-primary-100 to-stone-50 dark:bg-black dark:bg-none">
            <MainLayout>{children}</MainLayout>
          </div>
        </Providers>
      </body>
    </html>
  );
}
