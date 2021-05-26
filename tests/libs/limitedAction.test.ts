import { limitedAction } from "../../src/libs";

describe("limitedAction()", () => {
  let mockFn = jest.fn(() => {});

  beforeEach(() => {
    mockFn = jest.fn(() => {});
  });

  describe("correctly executes the action only up to", () => {
    it("1 time", () => {
      const action = limitedAction(mockFn);

      action.call();
      action.call();
      action.call();

      expect(mockFn.mock.calls.length).toEqual(1);
    });
    it("2 time", () => {
      const action = limitedAction(mockFn, 2);

      action.call();
      action.call();
      action.call();

      expect(mockFn.mock.calls.length).toEqual(2);
    });
    it("5 time", () => {
      const action = limitedAction(mockFn, 5);

      action.call();
      action.call();
      action.call();
      action.call();
      action.call();
      action.call();
      action.call();
      action.call();
      action.call();

      expect(mockFn.mock.calls.length).toEqual(5);
    });
  });
  describe("reset method correctly resets call count", () => {
    it("case 1", () => {
      const action = limitedAction(mockFn, 1);

      action.call();
      action.call();

      action.reset();

      action.call();
      action.call();

      expect(mockFn.mock.calls.length).toEqual(2);
    });
    it("case 2", () => {
      const action = limitedAction(mockFn, 2);

      action.call();

      action.reset();

      action.call();
      action.call();
      action.call();
      action.call();
      action.call();
      action.call();

      action.reset();

      expect(mockFn.mock.calls.length).toEqual(3);
    });
  });
});
