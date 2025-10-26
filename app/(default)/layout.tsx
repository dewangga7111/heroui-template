import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Suspense } from "react";

import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import Footer from "@/components/footer";
import Loading from "./loading";
import Mounted from "./mounted";

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
          <div className="flex min-h-screen w-full bg-gradient-to-b from-stone-50 via-stone-100 to-stone-50 dark:bg-black dark:bg-none">
            <Sidebar />
            <div className="flex flex-col flex-1">
              <div className="sticky top-0 z-50 mx-3">
                <Navbar />
              </div>
              <main className="flex-grow px-3 py-3 overflow-y-auto">
                <Mounted>
                  <Suspense fallback={<Loading />}>{children}</Suspense>
                </Mounted>
              </main>
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
