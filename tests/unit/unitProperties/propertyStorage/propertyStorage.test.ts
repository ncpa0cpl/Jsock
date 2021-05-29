import { unitPropertyStorage } from "../../../../src/unit/unitProperties";

describe("unitPropertyStorage()", () => {
  it("correctly returns the same values after reset", () => {
    const storage = unitPropertyStorage(() => {});

    const prop1 = storage.next();
    prop1.init("string");

    const prop2 = storage.next();
    prop2.init(123);

    const prop3 = storage.next();
    prop3.init({ isObj: true });

    storage.reset();

    expect(storage.next().value).toEqual("string");
    expect(storage.next().value).toEqual(123);
    expect(storage.next().value).toMatchObject({ isObj: true });
  });
  it("correctly executes the callback passed", () => {
    const mockFn = jest.fn(() => {});

    const storage = unitPropertyStorage(mockFn);

    const prop1 = storage.next();
    prop1.init("string");

    const prop2 = storage.next();
    prop2.init(123);

    prop1.set("abc"); // first time

    storage.reset();

    storage.next();
    const prop2_2 = storage.next();
    prop2_2.set(0); // second time

    storage.reset();

    const prop1_3 = storage.next();
    storage.next();
    prop1_3.set("yeeet"); // third time

    expect(mockFn.mock.calls.length).toEqual(3);
  });
});
