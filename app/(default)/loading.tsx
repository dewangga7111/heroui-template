"use client";

import { Spinner } from "@heroui/react";

export default function Loading() {
  // Or a custom loading skeleton component
  return <div className="flex min-h-screen min-w-xl">
    <Spinner />
  </div>
}