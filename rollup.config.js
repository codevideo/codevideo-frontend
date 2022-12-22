import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/esm/index.js',
    format: 'module',
    sourcemap: true,
    strict: false,
  },
  plugins: [typescript(), json()],
  external: ['@ffmpeg/ffmpeg']
};