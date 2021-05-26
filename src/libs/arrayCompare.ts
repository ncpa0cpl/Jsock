/**
 * Compares two arrays
 * @returns `true` if all elements are similiar, false otherwise
 */
export function compareArrays(a: any[], b: any[]) {
  if (a.length !== b.length) return false;
  for (const i in a) {
    if (!Object.is(a[i], b[i])) return false;
  }
  return true;
}
