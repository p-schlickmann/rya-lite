import Link from "next/link";
import { AuthButton } from "@/components/auth-button";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/back-button";

export function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-2 items-center font-semibold">
              <Link className={"text-lg"} href={"/"}>
                RYA Lite
              </Link>
              {/*<ThemeSwitcher />*/}
            </div>
            <AuthButton />
          </div>
        </nav>
        {children}
        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-8">
          <p>
            Powered by{" "}
            <a
              href="https://www.stationsciences.com/"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Station Sciences
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
