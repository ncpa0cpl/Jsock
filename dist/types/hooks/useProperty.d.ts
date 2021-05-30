import type { Initializer } from "../unit";
export declare function useProperty<T extends Initializer<any>>(v: T): readonly [import("../../dist/types/types").Widen<import("../unit").InitializedType<T>>, (v: import("../../dist/types/types").Widen<T>) => void];
