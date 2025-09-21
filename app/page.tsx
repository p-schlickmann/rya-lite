import { Hero } from "@/components/hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BaseLayout } from "@/layouts/base-layout";

export default function Home() {
  return (
    <BaseLayout>
      <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
        <Hero />
      </div>
    </BaseLayout>
  );
}
