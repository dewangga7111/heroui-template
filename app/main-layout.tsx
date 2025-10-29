"use client";

import type { ThemeProviderProps } from "next-themes";
import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar/sidebar";
import { Navbar } from "@/components/navbar";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import Footer from "@/components/footer";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const blankLayoutPaths = ["/auth", "/misc"];

  const isBlank = blankLayoutPaths.some((path) => pathname.includes(path));

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Loading />;
  }

  if (isBlank) {
    return <div className="flex flex-col flex-1">
      <main className="flex-grow px-3 py-3 overflow-y-auto">
        {children}
      </main>
    </div>
  }

  return (
    <>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <div className="sticky top-0 z-50 mx-3">
          <Navbar />
        </div>
        <main className="flex-grow px-3 py-3 overflow-y-auto">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}
