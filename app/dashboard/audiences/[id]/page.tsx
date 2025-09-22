import { BaseLayout } from "@/layouts/base-layout";
import { createClient } from "@/lib/supabase/server";
import { Audience, Concept } from "@/lib/types";
import AudienceDetail from "@/components/audience-detail";
import Error from "@/components/ui/error";
import BackButton from "@/components/back-button";
import ConceptsList from "@/app/dashboard/audiences/[id]/concepts-list";

export default async function AudienceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const awaitedParams = await params;

  const supabase = await createClient();

  const { data: audience, error: audienceError } = await supabase
    .from("audiences")
    .select("*")
    .eq("id", awaitedParams.id)
    .single();

  const { data: concepts, error: conceptsError } = await supabase
    .from("concepts")
    .select("*")
    .eq("audience_id", awaitedParams.id)
    .order("id", { ascending: false });

  const error = audienceError?.message || conceptsError?.message;

  return (
    <BaseLayout>
      <BackButton href={"/dashboard"} />
      <div className="mx-auto min-h-[75vh] px-4">
        {error ? <Error message={error} /> : null}
        <AudienceDetail audience={audience as Audience} large />
        <ConceptsList
          audience={audience as Audience}
          conceptsProp={concepts as Concept[]}
        />
      </div>
    </BaseLayout>
  );
}
