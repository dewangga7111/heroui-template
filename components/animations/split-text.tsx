"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface SplitTextProps {
  children: string;
  duration?: number;
  delay?: number;
  splitBy?: "words" | "characters";
  className?: string;
}

export function SplitText({ children, duration = 0.5, delay = 0, splitBy = "words", className }: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const parts = splitBy === "words" ? children.split(" ") : children.split("");
    ref.current.innerHTML = parts
      .map((p) => `<span style="display:inline-block;margin-right:${splitBy === "words" ? "0.25em" : "0"}">${p}</span>`)
      .join("");

    gsap.fromTo(
      ref.current.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger: 0.08,
        delay,
        ease: "power3.out",
      }
    );
  }, [children, duration, delay, splitBy]);

  return <span ref={ref} className={className}>{children}</span>;
}
