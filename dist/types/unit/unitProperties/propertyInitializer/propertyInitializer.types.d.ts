export declare type Initializer<T> = ((old: T) => T) | T;
export declare type InitializedType<T> = T extends (v: infer P) => infer P ? P : T;
