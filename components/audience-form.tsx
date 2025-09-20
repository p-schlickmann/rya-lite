"use client";

import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import MultiSelect from "@/components/multi-select";

const INITIAL_AUDIENCE_STATE = {
  name: "",
  age_min: "",
  age_max: "",
  birth_sex: "",
  state: "",
  city: "",
  income: "",
  interests: [],
};

const BIRTH_SEX_LIST = ["Male", "Female", "Both"];
const INCOME_LIST = ["Low", "Medium", "High", "Premium"];

export default function AudienceForm() {
  const [audience, setAudience] = useState(INITIAL_AUDIENCE_STATE);
  const setAudienceForm = (field) => setAudience({ ...audience, ...field });
  const createAudience = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        <div className={"col-span-2"}>
          <Label htmlFor="age_min">Age</Label>
          <div className={"flex items-center gap-x-2 text-sm"}>
            From{" "}
            <Input
              placeholder={"20"}
              maxLength={3}
              className={"w-9 h-8 p-1"}
              id={"age_min"}
              value={audience.age_min}
              onChange={(e) => setAudienceForm({ age_min: e.target.value })}
            />{" "}
            to{" "}
            <Input
              placeholder={audience.age_min ? "" : "30"} // hide the placeholder if the user has filled age_min
              maxLength={3}
              className={"w-9 h-8 p-1"}
              id={"age_max"}
              value={audience.age_max}
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
          <MultiSelect
            options={BIRTH_SEX_LIST}
            form={audience}
            setForm={setAudienceForm}
            fieldName={"birth_sex"}
          />
        </div>
        <div className={"col-span-2"}>
          <Label>Income</Label>
          <MultiSelect
            options={INCOME_LIST}
            form={audience}
            setForm={setAudienceForm}
            fieldName={"income"}
          />
        </div>
        <Button className={"col-span-2 mt-4"} type={"submit"}>
          Create Audience
        </Button>
      </form>
    </>
  );
}
