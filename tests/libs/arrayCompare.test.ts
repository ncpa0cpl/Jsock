import { compareArrays } from "../../src/libs";

describe("arrayCompare()", () => {
  describe("correctly resolves identical arrays", () => {
    it("case 1", () => {
      const arrayOne: [] = [];
      const arrayTwo: [] = [];
      expect(compareArrays(arrayOne, arrayTwo)).toEqual(true);
    });
    it("case 2", () => {
      const arrayOne = [1, "abc"];
      const arrayTwo = [1, "abc"];
      expect(compareArrays(arrayOne, arrayTwo)).toEqual(true);
    });
    it("case 3", () => {
      const arrayOne = [8, 4, 2, 1, 5, 8];
      const arrayTwo = [8, 4, 2, 1, 5, 8];
      expect(compareArrays(arrayOne, arrayTwo)).toEqual(true);
    });
    it("case 4", () => {
      const obj = {};
      const arrayOne = [obj];
      const arrayTwo = [obj];
      expect(compareArrays(arrayOne, arrayTwo)).toEqual(true);
    });
    it("case 5", () => {
      const arr = [1, "abc", new Set()];
      const fn = () => {};
      const arrayOne = [arr, fn, "123", 123];
      const arrayTwo = [arr, fn, "123", 123];
      expect(compareArrays(arrayOne, arrayTwo)).toEqual(true);
    });
  });
  describe("correctly resolves different arrays", () => {
    it("case 1", () => {
      const arrayOne: [] = [];
      const arrayTwo = [1];
      expect(compareArrays(arrayOne, arrayTwo)).toEqual(false);
    });
    it("case 2", () => {
      const arrayOne = ["1", 1];
      const arrayTwo = [1, "1"];
      expect(compareArrays(arrayOne, arrayTwo)).toEqual(false);
    });
    it("case 3", () => {
      const arrayOne = [{ a: 1 }];
      const arrayTwo = [{ a: 1 }];
      expect(compareArrays(arrayOne, arrayTwo)).toEqual(false);
    });
    it("case 4", () => {
      const arrayOne = [1, "2", 3, () => {}];
      const arrayTwo = [1, "2", 3, () => {}];
      expect(compareArrays(arrayOne, arrayTwo)).toEqual(false);
    });
    it("case 5", () => {
      const arrayOne = [1, "2", 3, () => {}];
      const arrayTwo = [1, "2", 3, () => {}];
      expect(compareArrays(arrayOne, arrayTwo)).toEqual(false);
    });
  });
});
