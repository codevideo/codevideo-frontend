import { exec } from "child_process";

describe("TypeScript compilation should have no warnings or errors", () => {
  test("npm run type-check has an empty output", async () => {
    const exitCode = await new Promise<number>((resolve, reject) => {
      exec("npm run type-check", (error, stdout, stderr) => {
        console.log("stdout: ", stdout);
        console.log("stderr: ", stderr);
        if (error) {
          reject(error.code);
        } else {
          resolve(0);
        }
      });
    });

    // Assert that the command exited with code 0
    expect(exitCode).toBe(0);
  });
});
