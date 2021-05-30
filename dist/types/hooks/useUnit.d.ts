import type { Initializer } from "../unit";
export declare function useUnit<T extends Initializer<object>>(initUnit: T): import("../unit").InitializedType<T>;
