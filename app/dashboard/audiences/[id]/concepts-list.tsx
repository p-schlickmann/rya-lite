"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Audience, Concept } from "@/lib/types";
import Error from "@/components/ui/error";
import { Button } from "@/components/ui/button";
import { Lightbulb, RotateCcw } from "lucide-react";

function ConceptCard({
  concept,
  onRemix,
  remixDisabled,
  concepts,
}: {
  concept: Concept;
  onRemix: () => void;
  remixDisabled?: boolean;
  concepts: Concept[];
}) {
  const getConceptName = (conceptId: number) => {
    return concepts.find((c) => c.id === conceptId)?.name;
  };

  const parentConceptName =
    concept.parent_id && getConceptName(concept.parent_id);

  return (
    <div className="border rounded-lg p-6 shadow hover:shadow-md transition space-y-4 w-[90vw] lg:w-[70vw]">
      <div className={"w-full flex items-center justify-between"}>
        <div className={"mb-2"}>
          <h3 className="text-lg font-semibold">{concept.name}</h3>
          {parentConceptName ? (
            <span className={"text-sm text-gray-600"}>
              Based off{" "}
              <span className={"font-semibold"}>{parentConceptName}</span>
            </span>
          ) : null}
        </div>

        <Button variant={"outline"} disabled={remixDisabled} onClick={onRemix}>
          <RotateCcw />
          Remix concept
        </Button>
      </div>
      <h3 className="text-md mb-2">{concept.description}</h3>
    </div>
  );
}

function ConceptCardSkeleton() {
  return (
    <div className="border rounded-lg p-6 shadow animate-pulse space-y-4 w-[90vw] lg:w-[70vw]">
      <div
        className={
          "flex flex-wrap-reverse gap-4 w-full justify-between items-center"
        }
      >
        <div className="h-6 bg-gray-200 rounded w-1/2" />
        <p className={"whitespace-nowrap text-gray-700"}>
          Generating marketing concept...
        </p>
      </div>

      <div className="h-4 bg-gray-200 rounded w-full" />
    </div>
  );
}

export default function ConceptsList({
  audience,
  conceptsProp,
}: {
  audience: Audience;
  conceptsProp: Concept[];
}) {
  const [newConceptLoading, setNewConceptLoading] = useState(false);
  const [conceptError, setConceptError] = useState("");
  const [concepts, setConcepts] = useState(conceptsProp || []);
  const supabase = createClient();

  const generateConcept = async (conceptToRemix?: Concept) => {
    setConceptError("");
    setNewConceptLoading(true);

    const conceptPayload = conceptToRemix
      ? { ...audience, conceptToRemix }
      : audience;
    const {
      data: newConcept,
      error,
      response,
    } = await supabase.functions.invoke("generate-concept", {
      body: JSON.stringify(conceptPayload),
    });

    if (error) {
      const json = await response?.json();
      setConceptError(
        json?.message
          ? `Error while generating marketing concept: ${json.message}`
          : "An unexpected error occurred while generating the latest concept.",
      );
    }
    if (newConcept) {
      setConcepts([newConcept, ...concepts]);
    }
    setNewConceptLoading(false);
  };

  useEffect(() => {
    if (!concepts.length) {
      generateConcept();
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 mt-4">
      <div className={"w-full relative"}>
        <Button
          disabled={newConceptLoading}
          onClick={() => generateConcept()}
          className={"absolute right-0 -top-20"}
        >
          <Lightbulb />
          Generate concept
        </Button>
      </div>
      {conceptError ? <Error message={conceptError} /> : null}
      {newConceptLoading ? <ConceptCardSkeleton /> : null}
      {concepts.map((concept, idx) => (
        <ConceptCard
          remixDisabled={newConceptLoading}
          onRemix={() => generateConcept(concept)}
          key={concept.id || idx}
          concept={concept}
          concepts={concepts}
        />
      ))}
    </div>
  );
}
