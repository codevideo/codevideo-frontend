import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // has to be this long because the single thread ffmpeg process can take a while
    // tests take a while to pass
    defaultCommandTimeout: 120000
  },
});
