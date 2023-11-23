// @ts-check

import terser from '@rollup/plugin-terser';
import typescript2 from 'rollup-plugin-typescript2';
import packageJSON from './package.json' assert { type: 'json' };
import resolve from '@rollup/plugin-node-resolve';

/**
 * Comment with library information to be appended in the generated bundles.
 */
const banner = `/*!
 * ${packageJSON.name} v${packageJSON.version}
 * (c) ${packageJSON.author.name}
 * Released under the ${packageJSON.license} License.
 */
`;

/**
 * Creates an output options object for Rollup.js.
 * @param {import('rollup').OutputOptions} options
 * @returns {import('rollup').OutputOptions}
 */
function createOutputOptions(options) {
  return {
    banner,
    name: 'Atm0s',
    exports: 'named',
    sourcemap: true,
    ...options,
  };
}

/**
 * @type {import('rollup').RollupOptions}
 */
const options = {
  input: './src/index.ts',
  output: [
    createOutputOptions({
      file: './dist/index.js',
      format: 'commonjs',
      // plugins: [resolve()],
    }),
    createOutputOptions({
      file: './dist/index.cjs',
      format: 'commonjs',
      // plugins: [resolve()],
    }),
    createOutputOptions({
      file: './dist/index.mjs',
      format: 'esm',
      // plugins: [resolve()],
    }),
    createOutputOptions({
      file: './dist/index.esm.js',
      format: 'esm',
      // plugins: [resolve()],
    }),
    createOutputOptions({
      file: './dist/index.umd.js',
      format: 'umd',
      // plugins: [resolve()],
    }),
    createOutputOptions({
      file: './dist/index.umd.min.js',
      format: 'umd',
      plugins: [terser()],
    }),
    createOutputOptions({
      file: './dist/index.iife.js',
      format: 'iife',
      // plugins: [resolve()],
    }),
    createOutputOptions({
      file: './dist/index.iife.min.js',
      format: 'iife',
      plugins: [terser()],
    }),
  ],
  plugins: [
    resolve(),
    typescript2({
      clean: true,
      useTsconfigDeclarationDir: true,
      tsconfig: './tsconfig.bundle.json',
    }),
  ],
};

export default options;
