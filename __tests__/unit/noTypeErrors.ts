
import util from 'util'
import childProcess from 'child_process';

describe("TypeScript compilation should have no warnings or errors", () => {
  test("tsc --noEmit has an empty output", async () => {
    // special promisified expect
    const exec = util.promisify(childProcess.exec); 

    // use it to get typescript compiler output
    const { stdout, stderr } = await exec('tsc --noEmit');
    expect(stdout).toBe("");
    expect(stderr).toBe("");
  });
});
