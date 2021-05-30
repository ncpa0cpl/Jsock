import type { Initializer } from "../unit";
export declare function useReference<T extends Initializer<any>>(refVal: T): {
    current: import("../unit").InitializedType<T>;
};
