import type { UnitProperty } from "..";
import { initUnitProperty } from "..";
import { iterateOver } from "../../../libs";

export function unitPropertyStorage(handlePropertyChange: () => void) {
  const storage: UnitProperty[] = [];
  let iterator = iterateOver(storage);
  const reset = () => {
    iterator = iterateOver(storage);
  };
  const next = () => {
    const property = iterator.next();
    if (property) {
      return property;
    }
    const newProperty = initUnitProperty(handlePropertyChange);
    storage.push(newProperty);
    return newProperty;
  };
  return {
    reset,
    next,
  };
}
