import execa from "execa";
import readline from "readline";

export async function run<T>(promise: Promise<T>) {
  try {
    return {
      error: null,
      data: await promise,
    };
  } catch (e) {
    return { error: e as execa.ExecaError, data: null };
  }
}

export const stdin = (() => {
  return (message: string) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    return new Promise<string>((resolve) => {
      rl.question(message, (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  };
})();
