import type { Initializer } from ".";
export declare function resolveInitializer<T>(
  init: Initializer<T>,
  oldValue: Initializer<T> | undefined
): T;
