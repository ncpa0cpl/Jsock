import type { Initializer, UnitProperty } from "../unit";
import { UnitScope } from "../unit";

export function useProperty<T = undefined>(v: Initializer<T>) {
  const prop = UnitScope.getStorage().next() as UnitProperty<T>;
  prop.init(v);
  return [prop.value, prop.set] as const;
}
