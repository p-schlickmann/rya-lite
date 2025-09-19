import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center">
        <Link href="/">
          <Image width={500} height={200} src={"/rya.png"} alt={"Rya Lite"} />
        </Link>
      </div>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center mt-8 mb-16">
        <b>R</b>adical <b>Y</b>et <b>A</b>cceptable breakthrough marketing, at
        the touch of a button.
      </p>
      <Button
        className={"w-fit rounded-mx text-lg px-10 py-7"}
        variant={"default"}
        asChild
      >
        <Link href={"/ask"}>Get Started</Link>
      </Button>
    </div>
  );
}
