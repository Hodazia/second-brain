import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// id doesn't matter how many inputs u are giving for tailwind merge, it will merge it without
// any issue
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}