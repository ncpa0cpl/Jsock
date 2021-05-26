import { useReference } from ".";
import { compareArrays } from "../libs";
import { UnitScopeManager } from "../unit";

export function useSideEffect(effect: () => void, deps?: any[]) {
  const prevDeps = useReference<any[]>([]);
  if (!deps || !compareArrays(deps, prevDeps.current)) {
    UnitScopeManager.deferAction(effect);
    if (deps) prevDeps.current = deps;
  }
}
