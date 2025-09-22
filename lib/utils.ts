import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uniquify(array: string[]) {
  return [...new Set(array)];
}

// lib/utils.ts
export function formatAgeRange(
  ageMin?: string | number | null,
  ageMax?: string | number | null,
): string {
  const min =
    ageMin == null
      ? NaN
      : typeof ageMin === "string"
        ? parseInt(ageMin, 10)
        : ageMin;
  const max =
    ageMax == null
      ? NaN
      : typeof ageMax === "string"
        ? parseInt(ageMax, 10)
        : ageMax;

  const hasMin = !isNaN(min);
  const hasMax = !isNaN(max);

  if (hasMin && hasMax) {
    if (min === max) return `${min} years old`;
    return `${min} to ${max} years old`;
  }

  if (hasMin) {
    return `${min} years old and older`;
  }

  if (hasMax) {
    return `Up to ${max} years old`;
  }

  return "";
}
