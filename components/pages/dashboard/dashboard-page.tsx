"use client";

import { Link } from "@heroui/react";
import { Card } from "@heroui/react";
import { Palette, Shield, Github } from "lucide-react";

import { title, subtitle } from "@/utils/primitives";

export default function DashboardPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Make&nbsp;</span>
        <span className={title({ color: "yellow" })}>beautiful&nbsp;</span>
        <br />
        <span className={title()}>
          websites regardless of your design experience.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          href="#"
          className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-accent text-accent-foreground shadow hover:opacity-90"
        >
          Documentation
        </Link>
        <Link
          href="https://github.com/heroui-inc/heroui"
          className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium border border-border hover:bg-default"
        >
          <Github size={20} />
          GitHub
        </Link>
      </div>

      <div className="mt-8">
        <div className="border border-border rounded-lg px-4 py-3 text-sm font-mono">
          Get started by editing{" "}
          <code className="text-accent font-medium">app/page.tsx</code>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-5xl px-4">
        <Card className="shadow-sm rounded-2xl">
          <Card.Content className="flex flex-col items-center text-center p-6">
            <h3 className="font-semibold text-lg mb-2">Fast &amp; Responsive</h3>
            <p className="text-muted text-sm">
              Optimized for performance with built-in responsive design.
            </p>
          </Card.Content>
        </Card>
        <Card className="shadow-sm rounded-2xl">
          <Card.Content className="flex flex-col items-center text-center p-6">
            <Palette className="text-violet-500 mb-4" size={32} />
            <h3 className="font-semibold text-lg mb-2">Beautiful UI</h3>
            <p className="text-muted text-sm">
              Pre-styled components and theming to match your brand.
            </p>
          </Card.Content>
        </Card>
        <Card className="shadow-sm rounded-2xl">
          <Card.Content className="flex flex-col items-center text-center p-6">
            <Shield className="text-success mb-4" size={32} />
            <h3 className="font-semibold text-lg mb-2">Secure by Default</h3>
            <p className="text-muted text-sm">
              Built with best practices to keep your app safe.
            </p>
          </Card.Content>
        </Card>
      </div>
    </section>
  );
}
