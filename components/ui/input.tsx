import * as React from "react";

import { cn } from "@/lib/utils";

const INPUT_DEFAULT_CLASSNAME =
  "flex h-9 w-full rounded-md border !order-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-400 focus-visible:outline-none focus-visible:border-yellow-400 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(INPUT_DEFAULT_CLASSNAME, className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input, INPUT_DEFAULT_CLASSNAME };
