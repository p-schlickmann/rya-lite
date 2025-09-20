import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import { DashboardButton } from "@/components/dashboard-button";

export async function AuthButton() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  return user ? (
    <div className="flex items-center gap-4">
      <DashboardButton />
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild variant={"outline"}>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild variant={"default"}>
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
