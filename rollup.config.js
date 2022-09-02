import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";

import path from "path";
import pkg from "./package.json";

const resolvePath = (...args) => path.resolve(__dirname, ...args);

module.exports = [
  // 生成 .d.ts 类型声明文件
  {
    input: resolvePath("src/index.ts"),
    output: {
      file: resolvePath("./", pkg.types),
      format: "es",
    },
    plugins: [dts()],
  },
  // 多格式打包配置
  {
    input: resolvePath("./src/index.ts"),
    output: [
      // cjs 格式打包
      { file: resolvePath("./", pkg.main), format: "cjs" },
      // es 格式打包
      { file: resolvePath("./", pkg.module), format: "es" },
      // umd 格式打包
      {
        file: resolvePath("./", pkg.unpkg),
        format: "umd",
        name: "PangJuUtils",
        globals: {},
        plugins: [],
      },
    ],
    plugins: [
      // 解析第三方模块
      nodeResolve({ modulesOnly: true, extensions: [".js", ".ts"] }),
      // 配置babel
      babel({
        exclude: "**/node_modules/**",
        babelHelpers: "runtime",
        extensions: [".js", ".ts"],
      }),
      // commonjs模块转es6模块
      commonjs({ extensions: [".js", ".ts"] }),
      // 代码压缩
      terser({
        compress: {
          // 去除 console
          drop_console: true,
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
    ],
  },
];
