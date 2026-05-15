"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ShinyTextProps {
  children: string;
  className?: string;
}

export function ShinyText({ children, className }: ShinyTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    );
  }, []);

  return <span ref={ref} className={className}>{children}</span>;
}
