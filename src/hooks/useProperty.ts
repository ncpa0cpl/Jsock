import type { Widen } from "../types";
import type { Initializer, UnitProperty } from "../unit";
import { UnitScopeManager } from "../unit";

export function useProperty<T = undefined>(v: Initializer<Widen<T>>) {
  const prop = UnitScopeManager.getStorage().next() as UnitProperty<Widen<T>>;
  prop.init(v);
  return [prop.value, prop.set] as const;
}
