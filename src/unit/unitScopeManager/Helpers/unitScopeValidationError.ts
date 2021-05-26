export class UnitScopeValidationError extends Error {
  constructor() {
    super("Usage of hooks outside of unit body is forbidden.");
  }
}
