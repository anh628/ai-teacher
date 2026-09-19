/**
 * check if a string is nonempty
 * @param s string to check
 * @returns return true if string is not empty, false otherwise
 */
export function isNotEmptyString(s: string): boolean {
  return s.trim().length > 0;
}
