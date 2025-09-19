import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { BaseLayout } from "@/components/layouts/base-layout";

export default async function AskPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <BaseLayout>
      <div className="flex-1 w-full flex flex-col gap-12">
        <div className="flex flex-col gap-2 items-start">
          <h2 className="font-bold text-2xl mb-4">Your user details</h2>
          <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
            {JSON.stringify(data.claims, null, 2)}
          </pre>
        </div>
      </div>
    </BaseLayout>
  );
}
