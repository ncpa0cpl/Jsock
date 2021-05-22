import execa from "execa";
import { run, stdin } from "./libs";

async function main() {
  // Add everything to the commit
  const add = await run(execa("git", ["add", "."]));
  if (add.error) {
    return console.error(add.error.stderr);
  }
  console.info(add.data.stdout);

  // Run eslint check
  const lint = await run(execa("npm", ["run", "lint"]));
  if (lint.error) {
    return console.error(lint.error.stderr);
  }
  console.info(lint.data.stdout);

  // Run typescript check
  const tsc = await run(execa("npm", ["run", "tsc"]));
  if (tsc.error) {
    return console.error(tsc.error.stderr);
  }
  console.info(tsc.data.stdout);

  // Run prettier check
  const pretty = await run(execa("npm", ["run", "pretty:check"]));
  if (pretty.error) {
    return console.error(pretty.error.stderr);
  }
  console.info(pretty.data.stdout);

  //   const { error } = await run(execa("npm", ["run", "test"]));
  //   if (error) {
  //     return console.error(error);
  //   }

  const commitMessage = await stdin("Commit message:\n");

  if (commitMessage.length === 0) {
    console.error("Commit message cannot be empty!");
    return;
  }

  const commit = await run(execa("git", ["commit", "-m", commitMessage]));
  if (commit.error) {
    return console.error(commit.error.stderr);
  }
  console.info(commit.data.stdout);

  const push = await run(execa("git", ["push"]));
  if (push.error) {
    return console.error(push.error.stderr);
  }
  console.info(push.data.stdout);

  return true;
}

main();
