import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { BaseLayout } from "@/components/layouts/base-layout";
import AudienceForm from "@/components/audience-form";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  const { data: audiences, error: audiencesError } = await supabase
    .from("audiences")
    .select("id");
  console.log(audiences, audiencesError, "chama?");

  return (
    <BaseLayout>
      <div className={"mx-auto min-h-[75vh]"}>
        {audiences?.length === 0 ? <AudienceForm /> : null}
      </div>
    </BaseLayout>
  );
}
