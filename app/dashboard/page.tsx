import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BaseLayout } from "@/layouts/base-layout";
import Error from "@/components/ui/error";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Audience } from "@/lib/types";
import AudienceDetail from "@/components/audience-detail";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  const { data: audiencesData, error: audiencesError } = await supabase
    .from("audiences")
    .select("*");
  const audiences = audiencesData as Audience[];
  if (!audiences?.length) {
    redirect("/dashboard/audiences/new");
  }

  return (
    <BaseLayout>
      <div className="mx-auto min-h-[75vh] px-4">
        <div className={"flex justify-between"}>
          <div>
            <h1 className="text-3xl font-bold">Audiences</h1>
            <h2 className="text-md text-gray-600">
              Select an audience to create a marketing concept
            </h2>
          </div>
          <Button asChild>
            <Link href={"/dashboard/audiences/new"}>
              Create
              <Plus />
            </Link>
          </Button>
        </div>

        {audiencesError?.message && (
          <Error message={audiencesError.message} className="mt-4" />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {audiences.map((aud, idx) => (
            <Link
              className="border rounded-lg p-4 flex flex-col justify-between shadow-sm cursor-pointer hover:border-yellow-500"
              key={aud.id || idx}
              href={`/dashboard/audiences/${aud.id}`}
            >
              <AudienceDetail audience={aud} />
            </Link>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}
