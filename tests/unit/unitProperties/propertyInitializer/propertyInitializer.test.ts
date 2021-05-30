import { resolveInitializer } from "../../../../src/unit/unitProperties";

describe("resolveInitializer()", () => {
  it("correctly resolves values", () => {
    expect(resolveInitializer("123", undefined)).toEqual("123");
    expect(resolveInitializer(123, undefined)).toEqual(123);
    expect(resolveInitializer({ a: 1 }, undefined)).toMatchObject({ a: 1 });
  });
  it("correctly resolves methods", () => {
    expect(resolveInitializer((v: number) => v + 5, 1)).toEqual(6);
    expect(resolveInitializer((v: string) => `value: ${v}`, "123")).toEqual("value: 123");
    expect(resolveInitializer((v: number[]) => [0, ...v, 0], [1])).toEqual([0, 1, 0]);
  });
});
