export declare type Initializer<T> = T extends any ? T | ((old: T) => T) : never;
