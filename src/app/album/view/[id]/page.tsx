"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  router.back();
  return null;
}
