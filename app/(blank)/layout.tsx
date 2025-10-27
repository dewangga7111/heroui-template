import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Suspense } from "react";

import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import Loading from "./loading";
import Mounted from "./mounted";
import { mainContainer } from "@/utils/primitives";

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
          <div className={mainContainer()}>
            <div className="flex flex-col flex-1">
              <main className="flex-grow px-3 py-3 overflow-y-auto">
                <Mounted>
                  <Suspense fallback={<Loading />}>{children}</Suspense>
                </Mounted>
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
