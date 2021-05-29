import { unitPropertyStorage, UnitScope } from "../../../../src/unit";

export function getTestUnitScope(
  params: { callback?: () => void; values?: any[] } = {}
): UnitScope {
  const { callback = () => {}, values = [] } = params;

  const storage = unitPropertyStorage(callback);

  for (const v of values) {
    storage.next().set(v);
  }

  storage.reset();

  return { storage, sideEffects: [] };
}
