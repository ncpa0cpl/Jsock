import { Unit, useProperty, useReference, useSideEffect, useUnit } from "../../../src";

export const simpleTestUnit = Unit((initVal: string) => {
  const [value, setValue] = useProperty(initVal);
  return {
    value,
    setValue,
  };
});

export const testUnitWithNestedUnit = Unit((initVal: string) => {
  const [_, triggerUpdate] = useProperty(null);
  const simpleUnit = useReference(() => simpleTestUnit(initVal));

  return {
    val: simpleUnit.current.value,
    set: simpleUnit.current.setValue,
    update: () => triggerUpdate(null),
  };
});

export const testUnitWithUseUnit = Unit((initVal: string) => {
  const simpleUnit = useUnit(() => simpleTestUnit(initVal));

  return {
    val: simpleUnit.value,
    set: simpleUnit.setValue,
  };
});

export const testUnitWithOuterMethodInBody = Unit((initValue: string, method: () => void) => {
  const [value, setValue] = useProperty(initValue);
  method();
  return {
    value,
    setValue,
  };
});

export const testUnitWithEffectOnValueChange = Unit(
  (initVal: string, effect: (c: string) => void) => {
    const [value, setValue] = useProperty(initVal);
    useSideEffect(() => {
      effect(value);
    }, [value]);
    return {
      value,
      setValue,
    };
  }
);

export const testUnitWithPropSetterWithinSideEffect = Unit((initVal: string) => {
  const [value, setValue] = useProperty(initVal);
  const [count, setCount] = useProperty(0);
  useSideEffect(() => {
    setCount(count + 1);
  }, [value]);
  return {
    count,
    value,
    setValue,
  };
});

export const testUnitWithSideEffectOnEveryChange = Unit((initVal: string, onEffect: () => void) => {
  const [value1, setValue1] = useProperty(initVal);
  const [value2, setValue2] = useProperty(initVal);
  const [value3, setValue3] = useProperty(initVal);
  useSideEffect(() => {
    onEffect();
  });
  return {
    value1,
    value2,
    value3,
    setValue1,
    setValue2,
    setValue3,
  };
});

export const testUnitWithSideEffectOnCreate = Unit((initVal: string, onEffect: () => void) => {
  const [value1, setValue1] = useProperty(initVal);
  const [value2, setValue2] = useProperty(initVal);
  const [value3, setValue3] = useProperty(initVal);
  useSideEffect(() => {
    onEffect();
  }, []);
  return {
    value1,
    value2,
    value3,
    setValue1,
    setValue2,
    setValue3,
  };
});
