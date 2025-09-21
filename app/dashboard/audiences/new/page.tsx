import AudienceForm from "@/forms/audience-form";
import { BaseLayout } from "@/layouts/base-layout";

export default function NewAudiencesPage() {
  return (
    <BaseLayout>
      <div className={"mx-auto min-h-[75vh] px-4"}>
        <AudienceForm />
      </div>
    </BaseLayout>
  );
}
