import type { Initializer } from ".";

export function resolveInitializer<T>(
  init: Initializer<T>,
  oldValue: Initializer<T> | undefined
): T {
  return typeof init === "function" ? init(oldValue) : init;
}
