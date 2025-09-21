import { useEffect, RefObject, ReactNode, useRef } from "react";

export function useOutsideClick<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  onClickOutside: () => void,
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // event.target can be any EventTarget, so we coerce to Node
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
}

interface OutsideAlerterProps {
  children: ReactNode;
  onClickOutside: () => void;
}

export function OutsideAlerter({
  children,
  onClickOutside,
}: OutsideAlerterProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(wrapperRef, onClickOutside);

  return <div ref={wrapperRef}>{children}</div>;
}
