import type { Widen } from "../types";
import type { Initializer, UnitProperty } from "../unit";
import { UnitScopeManager } from "../unit";

export const isPropertyInterfaceSymbol = Symbol();

export function isPropertyInterface(v: unknown): v is PropertyInterface<unknown> {
  // @ts-ignore
  if (typeof v === "object" && v !== null && v[isPropertyInterfaceSymbol] === true) return true;
  return false;
}

export type PropertyInterface<T> = {
  get(): Widen<T>;
  set(v: Initializer<Widen<T>>): void;
};

export function useProperty<T = undefined>(v: Initializer<Widen<T>>): PropertyInterface<T> {
  const prop = UnitScopeManager.getStorage().next() as UnitProperty<Widen<T>>;

  prop.init(v);

  const propInterface: PropertyInterface<T> = {
    get() {
      return prop.value;
    },
    set(v: Initializer<Widen<T>>) {
      prop.set(v);
    },
  };

  Object.assign(propInterface, { [isPropertyInterfaceSymbol]: true });

  return propInterface;
}
