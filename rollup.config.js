import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import dts from 'rollup-plugin-dts';

export default [
  {
    input: "src/index.ts",
    output: {
      file: "dist/esm/index.js",
      format: "module",
      sourcemap: true,
      strict: false,
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
