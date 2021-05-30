import { useProperty } from ".";
import type { Initializer } from "../unit";
import { resolveInitializer } from "../unit";

export function useReference<T extends Initializer<any>>(refVal: T) {
  const [reference] = useProperty({ current: resolveInitializer(refVal, undefined) });

  return reference;
}
