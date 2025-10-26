"use client";

import { useEffect, useState } from "react";
import Loading from "./loading";

export default function Mounted({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Loading />;
  }

  return <>{children}</>;
}
