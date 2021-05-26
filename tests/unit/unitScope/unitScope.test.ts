import { UnitScopeValidationError } from "../../../src/unit/unitScopeManager/Helpers/unitScopeValidationError";
import { UnitScopeManager } from "../../../src/unit";

describe("UnitScopeManager()", () => {
  it("throws error when no scope is available", () => {
    expect(() => UnitScopeManager.getStorage()).toThrowError(UnitScopeValidationError);
  });
});
