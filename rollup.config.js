import typescript from 'rollup-plugin-typescript2';
import json from "@rollup/plugin-json";
import dts from 'rollup-plugin-dts';

export default [
  // ES module
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "es",
    },
    plugins: [typescript(), json()],
    external: [
      "@ffmpeg/ffmpeg",
      "@ffmpeg/util",
      "monaco-editor-core",
      "@fullstackcraftllc/virtual-code-block",
    ],
  },
  // type declarations
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.d.ts",
        format: "es",
      },
    ],
    plugins: [dts()],
    external: [
      "@ffmpeg/ffmpeg",
      "@ffmpeg/util",
      "monaco-editor-core",
      "@fullstackcraftllc/virtual-code-block",
    ],
  },
];
