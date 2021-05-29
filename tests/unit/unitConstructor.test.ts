import {
  simpleTestUnit,
  testUnitWithEffectOnValueChange,
  testUnitWithOuterMethodInBody,
  testUnitWithPropSetterWithinSideEffect,
  testUnitWithSideEffectOnCreate,
  testUnitWithSideEffectOnEveryChange,
} from "./testHelpers/testUnits";

describe("Unit()", () => {
  it("creates an object which is being updated on property change", () => {
    const u = simpleTestUnit("str");

    expect(u.value).toEqual("str");

    u.setValue("another str");

    expect(u.value).toEqual("another str");
  });
  describe("correctly handles updating a Unit from Within another Unit", () => {
    it("within sideEffect", () => {
      const u1 = simpleTestUnit("abc");
      const u2 = testUnitWithEffectOnValueChange("0", () => u1.setValue("123"));

      u2.setValue("1");

      expect(u1.value).toEqual("123");
      expect(u2.value).toEqual("1");
    });
    it("within unit body", () => {
      const u1 = simpleTestUnit("abc");
      const u2 = testUnitWithOuterMethodInBody("0", () => u1.setValue("123"));

      u2.setValue("1");

      expect(u1.value).toEqual("123");
      expect(u2.value).toEqual("1");
    });
  });
  describe("correctly resolves side effects", () => {
    it("with side effect on property change", () => {
      const res: { val?: string } = {};
      const fn = jest.fn((s: string) => {
        res.val = s;
      });
      const u = testUnitWithEffectOnValueChange("str", fn);

      expect(fn.mock.calls.length === 1);
      expect(res.val).toEqual("str");

      u.setValue("abc");

      expect(fn.mock.calls.length).toEqual(2);
      expect(res.val).toEqual("abc");
    });
    it("with side effect that updates the state", () => {
      const u = testUnitWithPropSetterWithinSideEffect("abc");

      expect(u.count).toEqual(1);

      u.setValue("o");
      expect(u.count).toEqual(2);

      u.setValue("o");
      expect(u.count).toEqual(2);
    });
    it("with side effect that runs on every change", () => {
      const fn = jest.fn();

      const u = testUnitWithSideEffectOnEveryChange("a", fn);

      expect(fn.mock.calls.length).toEqual(1);

      u.setValue1("asd");
      expect(fn.mock.calls.length).toEqual(2);

      u.setValue2("ntt");
      expect(fn.mock.calls.length).toEqual(3);

      u.setValue3("123");
      expect(fn.mock.calls.length).toEqual(4);
    });
    it("with side effect that runs only when unit is initialized", () => {
      const fn = jest.fn();

      const u = testUnitWithSideEffectOnCreate("a", fn);

      expect(fn.mock.calls.length).toEqual(1);

      u.setValue1("asd");
      expect(fn.mock.calls.length).toEqual(1);

      u.setValue2("ntt");
      expect(fn.mock.calls.length).toEqual(1);

      u.setValue3("123");
      expect(fn.mock.calls.length).toEqual(1);
    });
  });
});
