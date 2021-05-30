import type { Initializer, UnitProperty } from "../unit";
import { UnitScopeManager } from "../unit";

export function useProperty<T extends Initializer<any>>(v: T) {
  const prop = UnitScopeManager.getStorage().next() as UnitProperty<T>;
  prop.init(v as any);
  return [prop.value, prop.set] as const;
}
