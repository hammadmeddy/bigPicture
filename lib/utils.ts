/**
 * Join class names, filtering out falsy values.
 * Lightweight alternative to clsx for interview-friendly projects.
 */
export function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}
