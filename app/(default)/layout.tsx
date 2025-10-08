import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { ReduxProvider } from "@/redux/providers";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import Footer from "@/components/footer";
import { Suspense } from "react";
import { BreadcrumbProvider } from "@/context/breadcrumbs-context";
import { PermissionProvider } from "@/context/permission-context";
import Loading from "./loading";

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
          fontSans.variable,
        )}
      >
        <ReduxProvider>
          <Suspense fallback={<Loading />}>
            <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
              <PermissionProvider>
                <BreadcrumbProvider>
                  <div className="flex min-h-screen w-full">
                    {/* Sidebar always on the left */}
                    <Sidebar />

                    {/* Main content area */}
                    <div className="flex flex-col flex-1">
                      {/* ✅ Navbar stays at the top */}
                      <div className="sticky top-0 z-50 mx-3">
                        <Navbar />
                      </div>

                      {/* Page content */}
                      <main className="flex-grow px-3 py-3 overflow-y-auto bg-background">
                        {children}
                      </main>

                      {/* ✅ Footer Component */}
                      <Footer />
                    </div>
                  </div>
                </BreadcrumbProvider>
              </PermissionProvider>
            </Providers>
          </Suspense>
        </ReduxProvider>
      </body>
    </html>
  );
}
