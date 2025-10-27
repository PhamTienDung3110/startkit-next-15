import { FieldError } from "react-hook-form";

/**
 * Form Input Utilities
 * 
 * @description Utility functions cho form styling và validation:
 * - Error state styling
 * - Input class generation
 * - Validation helpers
 */

/**
 * Generate input classes với error state
 * 
 * @param baseClasses - Base CSS classes
 * @param error - Field error từ react-hook-form
 * @param errorClasses - Custom error classes (optional)
 * @returns Combined CSS classes string
 */
export const getInputClasses = (
  baseClasses: string,
  error?: FieldError,
  errorClasses: string = "border-red-500 focus:border-red-500 focus:ring-red-500"
): string => {
  return `${baseClasses} ${error ? errorClasses : ""}`.trim();
};

/**
 * Check if field has error
 * 
 * @param error - Field error từ react-hook-form
 * @returns boolean
 */
export const hasError = (error?: FieldError): boolean => {
  return !!error;
};

/**
 * Get error message
 * 
 * @param error - Field error từ react-hook-form
 * @returns Error message string hoặc undefined
 */
export const getErrorMessage = (error?: FieldError): string | undefined => {
  return error?.message;
};

/**
 * Common input class combinations
 */
export const inputClasses = {
  base: "h-12",
  withIcon: "h-12 pl-10",
  withToggle: "h-12 pr-10 pl-10",
  error: "border-red-500 focus:border-red-500 focus:ring-red-500",
  success: "border-green-500 focus:border-green-500 focus:ring-green-500",
} as const;

/**
 * Form field variants
 */
export const fieldVariants = {
  default: "border-input",
  error: "border-red-500",
  success: "border-green-500",
  warning: "border-yellow-500",
} as const;
