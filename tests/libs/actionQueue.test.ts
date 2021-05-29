import { actionQueue } from "../../src/libs";
import { getCountCallMock } from "../Helpers/countCallsMock";

describe("actionQueue()", () => {
  let queue = actionQueue();

  let actionOne = getCountCallMock();

  beforeEach(() => {
    queue = actionQueue();
    actionOne = getCountCallMock();
  });

  it("executes passed action when no previous actions have finished", () => {
    queue.exec(actionOne);

    expect(actionOne.count).toEqual(1);
  });

  it("correctly sets `isRunning` property", () => {
    queue.exec(() => {
      expect(queue.isRunning).toEqual(true);
    });
    expect(queue.isRunning).toEqual(false);
  });

  it("does not executes an action until a previous action is still running", async () => {
    queue.exec(() => {
      queue.exec(() => {
        actionOne();
      });
      expect(actionOne.count).toEqual(0);
    });
    expect(actionOne.count).toEqual(1);
  });

  it("executes actions in the same order they were added", async () => {
    const orderCheck: number[] = [];

    queue.exec(() => {
      queue.exec(() => {
        orderCheck.push(2);
      });
      queue.exec(() => {
        queue.exec(() => {
          orderCheck.push(5);
        });
        orderCheck.push(3);
      });
      queue.exec(() => {
        orderCheck.push(4);
      });
      orderCheck.push(1);
    });

    expect(orderCheck).toEqual([1, 2, 3, 4, 5]);
  });
});
