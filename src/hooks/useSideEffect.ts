import { useReference } from ".";
import { compareArrays } from "../libs";
import { UnitScope } from "../unit";

export function useSideEffect(effect: () => void, deps?: any[]) {
  const prevDeps = useReference<any[]>([]);
  if (!deps || !compareArrays(deps, prevDeps.current)) {
    UnitScope.getSideEffects().addEffectToQueue(effect);
    if (deps) prevDeps.current = deps;
  }
}
