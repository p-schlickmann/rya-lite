import { cn } from "@/lib/utils";

export default function MultiSelect({
  options,
  form,
  setForm,
  fieldName,
}: {
  options: string[];
  form: unknown;
  setForm: (field: unknown) => void;
  fieldName: string;
}) {
  return (
    <div className={"text-sm flex items-center gap-x-4"}>
      {options.map((sex) => {
        return (
          <button
            onClick={(e) => {
              const optionSelected = e.target.textContent;
              if (form[fieldName] === optionSelected) {
                setForm({ [fieldName]: "" });
              } else {
                setForm({ [fieldName]: optionSelected });
              }
            }}
            type={"button"}
            key={sex}
            className={cn(
              "rounded-xl px-3 py-1 border focus-visible:outline-yellow-400",
              sex === form[fieldName]
                ? "bg-yellow-500 border-yellow-500 text-white"
                : "",
            )}
          >
            {sex}
          </button>
        );
      })}
    </div>
  );
}
