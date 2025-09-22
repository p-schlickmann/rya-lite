import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BackButton({ href }: { href: string }) {
  return (
    <Button className={"absolute top-20 left-2"} asChild variant={"ghost"}>
      <Link href={href}>
        <ArrowLeft />
        Back
      </Link>
    </Button>
  );
}
