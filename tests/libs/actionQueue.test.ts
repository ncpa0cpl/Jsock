import { actionQueue } from "../../src/libs";
import { getCountCallMock } from "../Helpers/countCallsMock";
import { sleep } from "../Helpers/sleep";

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
    let end = () => {};
    queue.exec(
      () =>
        new Promise((resolve) => {
          end = resolve;
        })
    );

    expect(queue.isRunning).toEqual(true);

    end();
  });

  it("does not executes an action until a previous action is still running", async () => {
    let end = () => {};
    queue.exec(
      () =>
        new Promise((resolve) => {
          end = () => {
            resolve();
          };
        })
    );

    queue.exec(() => {
      actionOne();
    });

    await sleep(10);
    expect(actionOne.count).toEqual(0);

    end();

    await sleep(10);
    expect(actionOne.count).toEqual(1);
  });

  it("executes actions in the same order they were added", async () => {
    const orderCheck: number[] = [];

    queue.exec(
      () =>
        new Promise((resolve) => {
          sleep(30).then(() => {
            orderCheck.push(1);
            resolve();
          });
        })
    );

    queue.exec(
      () =>
        new Promise((resolve) => {
          sleep(100).then(() => {
            orderCheck.push(2);
            resolve();
          });
        })
    );

    queue.exec(
      () =>
        new Promise((resolve) => {
          sleep(60).then(() => {
            orderCheck.push(3);
            resolve();
          });
        })
    );

    queue.exec(
      () =>
        new Promise((resolve) => {
          sleep(10).then(() => {
            orderCheck.push(4);
            resolve();
          });
        })
    );

    queue.exec(
      () =>
        new Promise((resolve) => {
          sleep(40).then(() => {
            orderCheck.push(5);
            resolve();
          });
        })
    );

    queue.exec(
      () =>
        new Promise((resolve) => {
          sleep(0).then(() => {
            orderCheck.push(6);
            resolve();
          });
        })
    );

    await sleep(250);

    expect(orderCheck).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
