"use client";

import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import MultiChoices from "@/components/ui/multi-choices";
import MultiSelect from "@/components/ui/multi-select";
import { uniquify } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import Error from "@/components/ui/error";
import type { NewAudience } from "@/lib/types";

const INITIAL_AUDIENCE_STATE: NewAudience = {
  name: "",
  brand_description: "",
  age_min: null,
  age_max: null,
  birth_sex: "",
  state: "",
  city: "",
  income: "",
  interests: [],
};

const BIRTH_SEX_LIST = ["Male", "Female", "Both"];
const INCOME_LIST = ["Low", "Medium", "High", "Premium"];
const INTERESTS_LIST = [
  "nature",
  "surf",
  "sports",
  "golf",
  "technology",
  "artificial Intelligence",
  "cars",
  "cooking",
];

export default function AudienceForm() {
  const [audience, setAudience] = useState<NewAudience>(INITIAL_AUDIENCE_STATE);
  const [formError, setFormError] = useState("");

  const setAudienceForm = (field: Partial<NewAudience>) =>
    setAudience({ ...audience, ...field });

  const createAudience = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // validate
    setFormError("");
    if (
      audience.age_min &&
      audience.age_max &&
      +audience?.age_min > +audience?.age_max
    ) {
      return setFormError("Age range is invalid.");
    }
    if (!audience.interests.length) {
      return setFormError("Make sure to add some interests to your audience!");
    }

    // submit to supabase
    const supabase = createClient();
    const {
      data: createdAudience,
      error,
      status,
    } = await supabase.from("audiences").insert([audience]).select().single();
    if (error) return setFormError(error.message);
    if (status == 201)
      redirect(
        createdAudience.id
          ? `/dashboard/audiences/${createdAudience?.id}`
          : "/dashboard",
      );
  };

  const handleSelectOption = (option: string, unselect?: boolean) => {
    if (unselect) {
      setAudienceForm({
        interests: audience.interests?.filter((i) => i !== option),
      });
    } else {
      setAudienceForm({
        interests: uniquify([...audience.interests, option]),
      });
    }
  };

  return (
    <>
      <h1 className={"text-3xl font-bold"}>Let&#39;s create an audience</h1>
      <form onSubmit={createAudience} className={"grid grid-cols-2 gap-2 mt-8"}>
        <div className={"col-span-2"}>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            required
            placeholder={"Cool audience name..."}
            value={audience.name}
            onChange={(e) => setAudienceForm({ name: e.target.value })}
          />
        </div>
        <div className={"col-span-2 relative"}>
          <Label htmlFor={"interests"}>Interests</Label>
          <MultiSelect
            id={"interests"}
            placeholder={"Search..."}
            options={INTERESTS_LIST}
            handleSelectOption={handleSelectOption}
            optionsSelected={audience.interests}
          />
        </div>
        <div className={"col-span-2"}>
          <Label htmlFor="age_min">Age</Label>
          <div className={"flex items-center gap-x-2 text-sm"}>
            From{" "}
            <Input
              placeholder={"20"}
              maxLength={3}
              className={"w-9 h-8 p-1"}
              id={"age_min"}
              value={audience.age_min || ""}
              onChange={(e) => setAudienceForm({ age_min: e.target.value })}
            />{" "}
            to{" "}
            <Input
              placeholder={audience.age_min ? "" : "30"} // hide the placeholder if the user has filled age_min
              maxLength={3}
              className={"w-9 h-8 p-1"}
              id={"age_max"}
              value={audience.age_max || ""}
              onChange={(e) => setAudienceForm({ age_max: e.target.value })}
            />{" "}
            years old
          </div>
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            placeholder={"CA"}
            value={audience.state}
            onChange={(e) => setAudienceForm({ state: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder={"San Francisco"}
            value={audience.city}
            onChange={(e) => setAudienceForm({ city: e.target.value })}
          />
        </div>
        <div className={"col-span-2"}>
          <Label>Sex</Label>
          <MultiChoices
            options={BIRTH_SEX_LIST}
            form={audience}
            setForm={setAudienceForm}
            fieldName={"birth_sex"}
          />
        </div>
        <div className={"col-span-2"}>
          <Label>Income</Label>
          <MultiChoices
            options={INCOME_LIST}
            form={audience}
            setForm={setAudienceForm}
            fieldName={"income"}
          />
        </div>
        <div className={"col-span-2"}>
          <Label htmlFor="brand_description">Brand description</Label>
          <Input
            id="brand_description"
            required
            placeholder={"What does your brand do?"}
            value={audience.brand_description}
            onChange={(e) =>
              setAudienceForm({ brand_description: e.target.value })
            }
          />
        </div>
        <Button className={"col-span-2 mt-4"} type={"submit"}>
          Create Audience
        </Button>
      </form>
      {formError ? <Error message={formError} className={"mt-4"} /> : null}
    </>
  );
}
