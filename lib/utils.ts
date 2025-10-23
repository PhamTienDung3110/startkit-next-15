/**
 * Utility Functions
 *
 * @description Helper functions dùng chung trong app
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn - Class Name Helper
 *
 * @description Combine và merge Tailwind CSS classes một cách thông minh
 * - clsx: Kết hợp conditional classes
 * - twMerge: Merge Tailwind classes và resolve conflicts
 *
 * @param inputs - Các class names (string, object, array)
 * @returns Merged class string
 *
 * @example
 * cn("px-2 py-1", "px-4") // → "py-1 px-4" (px-4 override px-2)
 * cn("text-red-500", condition && "text-blue-500") // → conditional
 * cn({ "bg-red-500": isError, "bg-green-500": isSuccess }) // → object syntax
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
