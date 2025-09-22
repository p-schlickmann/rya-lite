import { Input } from "@/components/ui/input";
import { OutsideAlerter } from "@/lib/hooks/useOutsideClick";
import React, { useState } from "react";
import { uniquify } from "@/lib/utils";
import { X } from "lucide-react";

export default function MultiSelect({
  id,
  placeholder,
  options,
  handleSelectOption,
  optionsSelected,
}: {
  id: string;
  placeholder?: string;
  options: string[];
  handleSelectOption: (option: string, unselect?: boolean) => void;
  optionsSelected: string[];
}) {
  const [query, setQuery] = useState("");
  const [areOptionsPresented, setAreOptionsPresented] = useState(false);

  const filterOptions = (interest: string) => {
    if (!interest) return false;
    if (!query && optionsSelected.includes(interest)) return false;
    if (!query) return true;
    return interest.toLowerCase().includes(query);
  };

  const uniqueOptions = uniquify([...options, query]);

  const onClearQuery = () => {
    if (query) {
      setQuery("");
    } else {
      setAreOptionsPresented(false);
    }
  };

  const internalHandleSelectOption = (option: string) => {
    handleSelectOption(option);
    setAreOptionsPresented(false);
    setQuery("");
  };

  return (
    <OutsideAlerter onClickOutside={() => setAreOptionsPresented(false)}>
      <Input
        id={id}
        placeholder={placeholder}
        value={query}
        onFocus={() => setAreOptionsPresented(true)}
        onChange={(e) => setQuery(e.target.value?.toLowerCase() || "")}
        clearable
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            internalHandleSelectOption(query);
            e.currentTarget?.blur();
          }
        }}
        onClear={onClearQuery}
      />
      {areOptionsPresented ? (
        <div
          className={
            "absolute z-10 bg-white w-full border rounded-md text-sm max-h-40 overflow-scroll"
          }
        >
          {uniqueOptions.filter(filterOptions).map((option: string) => {
            return (
              <button
                type={"button"}
                key={option}
                className={
                  "w-full text-left block outline-yellow-500 px-4 py-2 rounded-md capitalize hover:bg-gray-100"
                }
                onClick={() => internalHandleSelectOption(option)}
              >
                {option}
              </button>
            );
          })}
        </div>
      ) : null}
      <div
        className={
          "text-xs font-medium flex items-center flex-wrap gap-x-3 gap-y-1 mt-1"
        }
      >
        {optionsSelected?.map((option) => {
          return (
            <div
              key={option}
              className={
                "rounded-xl px-2 py-1 border bg-yellow-500 border-yellow-500 text-white flex items-center capitalize"
              }
            >
              <span>{option}</span>
              <button
                type={"button"}
                className={"ml-1 focus-visible:outline-none"}
                onClick={() => handleSelectOption(option, true)}
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </OutsideAlerter>
  );
}
