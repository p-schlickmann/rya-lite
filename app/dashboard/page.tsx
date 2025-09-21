import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { BaseLayout } from "@/layouts/base-layout";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  const { data: audiences, error: audiencesError } = await supabase
    .from("audiences")
    .select("*");
  if (!audiences?.length) {
    redirect("/dashboard/audiences/new");
  }

  console.log(audiences);

  return (
    <BaseLayout>
      <div className={"mx-auto min-h-[75vh] px-4"}>audiences list!</div>
    </BaseLayout>
  );
}
