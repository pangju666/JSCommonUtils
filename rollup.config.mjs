import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/bundle.umd.js',
      format: 'umd',
      name: 'PangJuUtils',
      sourcemap: true,
    },
    { file: 'dist/pangju-utils.esm.js', format: 'es', sourcemap: true },
    { file: 'dist/pangju-utils.cjs.js', format: 'cjs', sourcemap: true },
  ],
  // 多格式打包配置
  plugins: [
    resolve({ preferBuiltins: false }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist/types',
    }),
    babel({
      babelHelpers: 'bundled', // 确保 Babel helpers 内嵌到打包文件中
      extensions: ['.ts', '.tsx'],
    }),
    terser({
      module: true, // 保留 Tree Shaking
    }),
  ],
  treeshake: {
    moduleSideEffects: false,
  },
};
