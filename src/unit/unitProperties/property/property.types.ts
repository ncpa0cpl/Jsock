import type { Initializer } from "..";
import type { Widen } from "../../../../dist/types/types";
import type { InitializedType } from "../propertyInitializer";

export interface UnitProperty<T extends Initializer<any> = unknown> {
  value: Widen<InitializedType<T>>;
  set(v: Widen<T>): void;
  init(v: Widen<T>): void;
}
