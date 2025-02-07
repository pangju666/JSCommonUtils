import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import { dts } from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/pangju-utils.umd.js',
        format: 'umd',
        name: 'PangJuUtils',
        sourcemap: true,
        globals: {
          'date-fns': 'DateFns',
        },
      },
      { file: 'dist/pangju-utils.esm.js', format: 'es', sourcemap: true },
      { file: 'dist/pangju-utils.cjs.js', format: 'cjs', sourcemap: true },
    ],
    plugins: [
      resolve({ modulesOnly: true, extensions: ['.js', '.ts'] }),
      commonjs({ extensions: ['.js', '.ts'] }),
      typescript({
        tsconfig: './tsconfig.json',
      }),
      babel({
        exclude: '**/node_modules/**',
        babelHelpers: 'bundled',
        extensions: ['.ts', '.js'],
      }),
      terser({
        module: true,
        compress: {
          drop_console: true,
        },
      }),
    ],
    external: ['**/test/**'],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/pangju-utils.d.ts',
      format: 'esm',
    },
    plugins: [
      dts(),
      del({
        targets: 'dist/types',
      }),
    ],
  },
];
