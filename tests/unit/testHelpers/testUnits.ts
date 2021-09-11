import { Unit, useProperty, useSideEffect } from "../../../src";

export const simpleTestUnit = Unit((initVal: string) => {
  const value = useProperty(initVal);
  return {
    value: value.get(),
    setValue: value.set,
  };
});

export const testUnitWithOuterMethodInBody = Unit((initValue: string, method: () => void) => {
  const value = useProperty(initValue);
  method();
  return {
    value: value.get(),
    setValue: value.set,
  };
});

export const testUnitWithEffectOnValueChange = Unit(
  (initVal: string, effect: (c: string) => void) => {
    const value = useProperty(initVal);

    useSideEffect(() => {
      effect(value.get());
    }, [value]);

    return {
      value: value.get(),
      setValue: value.set,
    };
  }
);

export const testUnitWithPropSetterWithinSideEffect = Unit((initVal: string) => {
  const value = useProperty(initVal);
  const count = useProperty(0);
  useSideEffect(() => {
    count.set(count.get() + 1);
  }, [value]);
  return {
    count: count.get(),
    value: value.get(),
    setValue: value.set,
  };
});

export const testUnitWithSideEffectOnEveryChange = Unit((initVal: string, onEffect: () => void) => {
  const value1 = useProperty(initVal);
  const value2 = useProperty(initVal);
  const value3 = useProperty(initVal);
  useSideEffect(() => {
    onEffect();
  });
  return {
    value1: value1.get(),
    value2: value2.get(),
    value3: value3.get(),
    setValue1: value1.set,
    setValue2: value2.set,
    setValue3: value3.set,
  };
});

export const testUnitWithSideEffectOnCreate = Unit((initVal: string, onEffect: () => void) => {
  const value1 = useProperty(initVal);
  const value2 = useProperty(initVal);
  const value3 = useProperty(initVal);
  useSideEffect(() => {
    onEffect();
  }, []);
  return {
    value1: value1.get(),
    value2: value2.get(),
    value3: value3.get(),
    setValue1: value1.set,
    setValue2: value2.set,
    setValue3: value3.set,
  };
});
