"use client";

import { Spinner } from "@heroui/react";

export default function Loading() {
  // Or a custom loading skeleton component
  return <div className="flex justify-center items-center h-full">
    <Spinner size="lg" />
  </div>
}