import { clsx, type ClassValue } from "clsx"; // Import clsx and ClassValue type from clsx
import { twMerge } from "tailwind-merge"; // Import twMerge from tailwind-merge

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs)); // Merge class names using clsx and twMerge
}
