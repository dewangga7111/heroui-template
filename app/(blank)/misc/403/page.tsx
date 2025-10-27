"use client";

import { button } from "@/utils/primitives";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function ForbiddenPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-5xl font-bold text-red-500">🚫 Access Denied</h1>
      <p className="text-gray-600 mt-2">You don’t have permission to view this page.</p>
      <Button
        color="primary"
        className={`${button()} mt-5`}
        onPress={() => router.push("/")}
      >
        Back Home
      </Button>
    </div>
  );
}
