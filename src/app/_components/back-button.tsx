"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      className="absolute left-5 top-5"
      onClick={(_) => {
        router.back();
      }}
      variant={"secondary"}
    >
      Go Back
    </Button>
  );
}
