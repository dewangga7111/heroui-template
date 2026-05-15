"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface BlurTextProps {
  children: string;
  duration?: number;
  delay?: number;
  splitBy?: "characters" | "words";
  className?: string;
}

export function BlurText({ children, duration = 0.8, delay = 0, splitBy = "characters", className }: BlurTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const parts = splitBy === "characters" ? children.split("") : children.split(" ");
    ref.current.innerHTML = parts
      .map((p) => `<span style="display:inline-block">${p === " " ? "&nbsp;" : p}</span>`)
      .join("");

    gsap.fromTo(
      ref.current.children,
      { opacity: 0, filter: "blur(10px)", y: 10 },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration,
        stagger: 0.05,
        delay,
        ease: "power2.out",
      }
    );
  }, [children, duration, delay, splitBy]);

  return <span ref={ref} className={className}>{children}</span>;
}
