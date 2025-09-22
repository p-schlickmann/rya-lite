import { cn, formatAgeRange } from "@/lib/utils";
import type { Audience } from "@/lib/types";
import { Mars, Users, Venus } from "lucide-react";

export default function AudienceDetail({
  audience,
  large,
}: {
  audience: Audience;
  large?: boolean;
}) {
  const Icon =
    audience?.birth_sex?.toLowerCase() === "male"
      ? Mars
      : audience.birth_sex?.toLowerCase() === "female"
        ? Venus
        : Users;

  const incomeAmount = (income: string) => {
    const hashmap = {
      low: "$",
      medium: "$$",
      high: "$$$",
      premium: "$$$$",
    };
    return hashmap[income.toLowerCase() as keyof typeof hashmap];
  };
  return (
    <>
      <div>
        <div className="flex items-center">
          <Icon
            className={cn(
              "text-gray-600 mr-2",
              large ? "w-10 h-10" : "w-5 h-5",
            )}
          />
          <h3 className={cn("font-semibold", large ? "text-3xl" : "text-xl")}>
            {audience.name}
          </h3>
        </div>
        <p className={cn("text-gray-600", large ? "text-lg" : "text-sm")}>
          {audience.city ? `${audience.city}, ` : ""}
          {audience.state}
        </p>
        <p className={cn("text-gray-500", large ? "text-md" : "text-xs")}>
          {formatAgeRange(audience.age_min, audience.age_max)}
        </p>
        {audience.income ? (
          <p className={cn("text-gray-500", large ? "text-md" : "text-xs")}>
            Income: {incomeAmount(audience.income)}
          </p>
        ) : null}
        {audience.brand_description && large ? (
          <p className={cn("text-gray-500", large ? "text-md" : "text-xs")}>
            Brand description: {audience.brand_description}
          </p>
        ) : null}
      </div>

      <div
        className={cn(
          "flex flex-wrap gap-2 mt-4",
          large ? "text-md" : "text-xs",
        )}
      >
        {audience.interests?.map((interest) => (
          <span
            key={interest}
            className={cn(
              "rounded-xl py-1 border border-yellow-500 focus-visible:outline-yellow-400",
              large ? "px-3 font-semibold" : "px-2",
            )}
          >
            {interest}
          </span>
        ))}
      </div>
    </>
  );
}
