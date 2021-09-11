import { isPropertyInterface, useReference } from ".";
import { compareArrays } from "../libs";
import { UnitScopeManager } from "../unit";

export function useSideEffect(effect: () => void, deps?: any[]) {
  const prevDeps = useReference<any[] | undefined>(undefined);

  const currentDeps = deps?.map((d) => (isPropertyInterface(d) ? d.get() : d));

  if (!currentDeps || !prevDeps.current || !compareArrays(currentDeps, prevDeps.current)) {
    UnitScopeManager.deferAction(effect);
    if (currentDeps) prevDeps.current = currentDeps;
  }
}
