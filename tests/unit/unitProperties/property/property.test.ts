import { initUnitProperty } from "../../../../src/unit/unitProperties";

describe("initPropertyStorage()", () => {
  it("set() works properly", () => {
    const property = initUnitProperty(() => {});

    property.init("123");
    expect(property.value).toEqual("123");

    property.set("abc");
    expect(property.value).toEqual("abc");

    property.set(100);
    expect(property.value).toEqual(100);
  });
  it("init() does work only the first time it's called", () => {
    const property = initUnitProperty(() => {});

    property.init("123");
    expect(property.value).toEqual("123");

    property.init(0);
    expect(property.value).toEqual("123");

    property.set(1);
    expect(property.value).toEqual(1);

    property.init("string");
    expect(property.value).toEqual(1);
  });
  it("init() and set() can be detached from the object and still work", () => {
    const property = initUnitProperty(() => {});
    const { init, set } = property;

    init("123");
    expect(property.value).toEqual("123");

    set("abc");
    expect(property.value).toEqual("abc");

    set(100);
    expect(property.value).toEqual(100);
  });
  it("correctly executes the callback on property change", () => {
    const mockFn = jest.fn(() => {});

    const property = initUnitProperty(mockFn);

    property.init("123");
    property.init(0);
    property.set(1);
    property.init("string");
    property.set("str");
    property.set(undefined);

    expect(mockFn.mock.calls.length).toEqual(3);
  });
});
