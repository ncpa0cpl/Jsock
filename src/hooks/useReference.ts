import { useProperty } from ".";

export function useReference<T>(refVal: T): { current: T } {
  const reference = useProperty({ current: refVal }).get();

  return reference;
}
