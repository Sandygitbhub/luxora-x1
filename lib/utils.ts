import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges CSS classes together using clsx and tailwind-merge.
 * This ensures that Tailwind utility classes don't conflict.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
