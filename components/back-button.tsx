"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      className={"absolute top-20 left-2"}
      onClick={() => router.back()}
      variant={"ghost"}
    >
      <ArrowLeft />
      Back
    </Button>
  );
}
