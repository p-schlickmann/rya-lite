import { cn } from "@/lib/utils";

export default function MultiChoices<
  T extends Record<string, null | number | string | string[]>,
  K extends keyof T,
>({
  options,
  form,
  setForm,
  fieldName,
}: {
  options: string[];
  form: T;
  setForm: (field: Partial<T>) => void;
  fieldName: K;
}) {
  return (
    <div className={"text-xs flex items-center flex-wrap gap-x-3 gap-y-1"}>
      {options.map((opt) => {
        return (
          <button
            onClick={() => {
              const chosen = form[fieldName] === opt ? "" : opt;
              setForm({ [fieldName]: chosen } as Partial<T>);
            }}
            type={"button"}
            key={opt}
            className={cn(
              "rounded-xl px-3 py-1 border focus-visible:outline-yellow-400",
              opt === form[fieldName]
                ? "bg-yellow-500 border-yellow-500 text-white font-medium"
                : "",
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
