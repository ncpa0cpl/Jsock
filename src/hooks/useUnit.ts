import { useProperty, useReference, useSideEffect } from ".";
import type { Initializer } from "../unit";
import { ON_STATE_UPDATE } from "../unit/unitConstructor";

export function useUnit<T extends Initializer<object>>(initUnit: T) {
  const unit = useReference(initUnit);
  const [, triggerUpdate] = useProperty(null);

  useSideEffect(() => {
    const _unit = unit.current as { [ON_STATE_UPDATE]?: () => void };
    const prevCaller = _unit[ON_STATE_UPDATE];
    if (prevCaller !== undefined) {
      _unit[ON_STATE_UPDATE] = () => triggerUpdate(null);
    } else {
      throw new Error("Object passed tho th useUnit hook must be a Unit object.");
    }
  }, []);

  return unit.current;
}
