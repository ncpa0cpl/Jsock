export type Initializer<T> = ((old: T) => T) | T;

export type InitializedType<T> = T extends (v: infer P) => infer P ? P : T;
