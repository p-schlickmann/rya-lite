import { cn } from "@/lib/utils";

export default function MultiChoices({
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
    <div className={"text-xs flex items-center flex-wrap gap-x-3 gap-y-1"}>
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
                ? "bg-yellow-500 border-yellow-500 text-white font-medium"
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
