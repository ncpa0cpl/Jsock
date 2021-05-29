import {
  UnitScopeIllegalScopeAccess,
  UnitScopeValidationError,
} from "../../../src/unit/unitScopeManager/Helpers/unitScopeErrors";
import { getTestUnitScope } from "./testHelpers/getTestUnitScope";
import { publicUnitScopeManager } from "./testHelpers/publicUnitScopeManager";

describe("UnitScopeManager()", () => {
  describe("enterScope() and leaveScope()", () => {
    it("correctly handles entering and leaving the scope", () => {
      const scope1 = getTestUnitScope({ values: [1] });
      const scope2 = getTestUnitScope({ values: [2] });
      const scope3 = getTestUnitScope({ values: [3] });

      publicUnitScopeManager.enterScope(scope3);
      publicUnitScopeManager.enterScope(scope2);
      publicUnitScopeManager.enterScope(scope1);

      expect(publicUnitScopeManager.getStorage().next().value).toEqual(1);

      publicUnitScopeManager.leaveScope();

      expect(publicUnitScopeManager.getStorage().next().value).toEqual(2);

      publicUnitScopeManager.leaveScope();

      expect(publicUnitScopeManager.getStorage().next().value).toEqual(3);

      publicUnitScopeManager.leaveScope();

      expect(() => publicUnitScopeManager.getStorage()).toThrowError(UnitScopeValidationError);
    });
  });

  describe("getStorage()", () => {
    it("throws error when no scope is available", () => {
      expect(() => publicUnitScopeManager.getStorage()).toThrowError(UnitScopeValidationError);
    });
  });

  describe("deferAction()", () => {
    it("executes the side effect immediately when added outside Unit lifecycle", () => {
      const fn = jest.fn();

      publicUnitScopeManager.deferAction(fn);

      expect(fn.mock.calls.length).toEqual(1);
    });
    it("executes side effects only after all scoped has been left", () => {
      const fn = jest.fn();

      const scope1 = getTestUnitScope({ values: [1] });
      const scope2 = getTestUnitScope({ values: [2] });
      const scope3 = getTestUnitScope({ values: [3] });

      publicUnitScopeManager.enterScope(scope1);
      publicUnitScopeManager.enterScope(scope2);
      publicUnitScopeManager.enterScope(scope3);

      publicUnitScopeManager.deferAction(fn);
      expect(fn.mock.calls.length).toEqual(0);

      publicUnitScopeManager.leaveScope(); // leave scope 3

      publicUnitScopeManager.deferAction(fn);
      expect(fn.mock.calls.length).toEqual(0);

      publicUnitScopeManager.leaveScope(); // leave scope 2

      publicUnitScopeManager.deferAction(fn);
      expect(fn.mock.calls.length).toEqual(0);

      // leaving the last scope should trigger all deffered actions
      publicUnitScopeManager.leaveScope(); // leave scope 1

      expect(fn.mock.calls.length).toEqual(3);
    });
    it("correctly resolves when an side effect is created within another side effect", () => {
      const fn = jest.fn();

      const scope1 = getTestUnitScope({ values: [1] });
      const scope2 = getTestUnitScope({ values: [2] });

      publicUnitScopeManager.enterScope(scope1);

      publicUnitScopeManager.deferAction(() => {
        publicUnitScopeManager.enterScope(scope2);

        publicUnitScopeManager.deferAction(fn);
        expect(fn.mock.calls.length).toEqual(0);

        publicUnitScopeManager.leaveScope();

        expect(fn.mock.calls.length).toEqual(0);
      });

      expect(() => publicUnitScopeManager.leaveScope()).not.toThrowError();

      expect(fn.mock.calls.length).toEqual(1);
    });
    it("doesn't throw an error when the scope storage is accessed within an effect if another scope is entered", () => {
      const scope1 = getTestUnitScope({ values: [1] });
      const scope2 = getTestUnitScope({ values: [2] });

      publicUnitScopeManager.enterScope(scope1);

      publicUnitScopeManager.deferAction(() => {
        publicUnitScopeManager.enterScope(scope2);
        publicUnitScopeManager.getScope().storage.next();
        publicUnitScopeManager.leaveScope();
      });

      expect(() => publicUnitScopeManager.leaveScope()).not.toThrowError();
    });
    it("correctly throws an error when the scope storage is accessed within an effect", () => {
      const scope1 = getTestUnitScope({ values: [1] });

      publicUnitScopeManager.enterScope(scope1);

      publicUnitScopeManager.deferAction(() => {
        publicUnitScopeManager.getScope().storage.next();
      });

      expect(() => publicUnitScopeManager.leaveScope()).toThrowError(UnitScopeIllegalScopeAccess);
    });
  });
});
