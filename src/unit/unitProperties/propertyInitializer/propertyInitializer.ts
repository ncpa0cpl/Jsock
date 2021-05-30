import type { InitializedType, Initializer } from ".";

export function resolveInitializer<
  T extends Initializer<any>,
  K extends T extends (...any: any[]) => infer R ? R : T
>(init: T, oldValue: K | undefined): InitializedType<T> {
  return typeof init === "function" ? init(oldValue) : init;
}
