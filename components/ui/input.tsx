import * as React from "react";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const INPUT_DEFAULT_CLASSNAME =
  "flex h-9 w-full rounded-md border !order-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-400 focus-visible:outline-none focus-visible:border-yellow-400 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

interface CustomInputInterface {
  clearable?: boolean;
  onClear?: () => void;
}

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & CustomInputInterface
>(({ className, type, clearable, onClear, ...props }, ref) => {
  return (
    <div className={"relative"}>
      <input
        type={type}
        className={cn(INPUT_DEFAULT_CLASSNAME, className)}
        ref={ref}
        {...props}
      />
      {clearable ? (
        <div
          className={
            "absolute right-2 top-0 h-full flex flex-col items-center justify-center"
          }
        >
          <button
            type={"button"}
            onClick={onClear}
            className={"outline-yellow-500"}
          >
            <X size={17} className={""} />
          </button>
        </div>
      ) : null}
    </div>
  );
});
Input.displayName = "Input";

export { Input, INPUT_DEFAULT_CLASSNAME };
