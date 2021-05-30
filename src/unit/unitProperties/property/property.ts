import type { UnitProperty } from ".";
import { resolveInitializer } from "..";

export function initUnitProperty<T = unknown>(handlePropertyChange: () => void): UnitProperty<T> {
  const property: UnitProperty<T> = {
    value: undefined as any,
    init(v) {
      this.value = resolveInitializer(v, undefined) as any;
      this.init = () => {};
    },
    set(v) {
      this.value = resolveInitializer(v, this.value as any) as any;
      handlePropertyChange();
    },
  };
  property.init = property.init.bind(property);
  property.set = property.set.bind(property);
  return property;
}
