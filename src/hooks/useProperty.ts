import type { Initializer, UnitProperty } from "../unit";
import { UnitScopeManager } from "../unit";

export function useProperty<T = undefined>(v: Initializer<T>) {
  const prop = UnitScopeManager.getStorage().next() as UnitProperty<T>;
  prop.init(v);
  return [prop.value, prop.set] as const;
}
