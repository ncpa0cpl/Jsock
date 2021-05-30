import type { InitializedType, Initializer } from ".";
export declare function resolveInitializer<T extends Initializer<any>, K extends T extends (...any: any[]) => infer R ? R : T>(init: T, oldValue: K | undefined): InitializedType<T>;
