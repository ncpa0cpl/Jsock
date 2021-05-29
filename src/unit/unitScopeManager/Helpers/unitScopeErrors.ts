export class UnitScopeValidationError extends Error {
  constructor() {
    super("Unit Error: Usage of hooks outside of Unit body is forbidden.");
  }
}

export class UnitScopeIllegalScopeAccess extends Error {
  constructor() {
    super(`Unit Error: Access to unit storage is only allowed within the Unit body, 
    make sure you dont use Unit Hooks outside the Unit body or within a side effect.`);
  }
}
