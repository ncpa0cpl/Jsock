const execa = require("execa");

async function run(promise) {
  try {
    return {
      error: null,
      data: await promise,
    };
  } catch (e) {
    return { error: e, data: null };
  }
}

async function main() {
  const lint = await run(execa("npm", ["run", "lint"]));
  if (lint.error) {
    return console.error(lint.error);
  }

  const tsc = await run(execa("npm", ["run", "tsc"]));
  if (tsc.error) {
    return console.error(tsc.error);
  }

  //   const { error } = await run(execa("npm", ["run", "test"]));
  //   if (error) {
  //     return console.error(error);
  //   }

  const pretty = await run(execa("npm", ["run", "pretty"]));
  if (pretty.error) {
    return console.error(pretty.error);
  }

  console.log(pretty);

  const git = await run(execa("git", ["push"]));
  if (git.error) {
    return console.error(git.error);
  }

  console.info(git.data);
}

main();
