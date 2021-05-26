import { iterateOver } from "../../src/libs";

describe("iterateOver()", () => {
  it("correctly iterates over an array", () => {
    const list = [1, "2", 1000, { a: "1" }, () => {}, Date.now()];

    const iterator = iterateOver(list);

    expect(iterator.next()).toEqual(list[0]);
    expect(iterator.next()).toEqual(list[1]);
    expect(iterator.next()).toEqual(list[2]);
    expect(iterator.next()).toEqual(list[3]);
    expect(iterator.next()).toEqual(list[4]);
    expect(iterator.next()).toEqual(list[5]);
  });
  it("correctly returns undefined after reaching end of the array", () => {
    const list = [1];

    const iterator = iterateOver(list);

    expect(iterator.next()).toEqual(1);
    expect(iterator.next()).toEqual(undefined);
    expect(iterator.next()).toEqual(undefined);
    expect(iterator.next()).toEqual(undefined);
  });
});
