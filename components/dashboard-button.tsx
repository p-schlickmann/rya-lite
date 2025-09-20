"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export function DashboardButton() {
  const pathname = usePathname();

  return pathname.includes("/dashboard") ? null : (
    <Button asChild>
      <Link href="/dashboard">Dashboard</Link>
    </Button>
  );
}
