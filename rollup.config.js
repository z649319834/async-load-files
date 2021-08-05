import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import alias from '@rollup/plugin-alias'
import json from '@rollup/plugin-json'
import image from '@rollup/plugin-image'
import pkg from './package.json'
import { DEFAULT_EXTENSIONS } from '@babel/core'

const ENV = process.env.NODE_ENV
export default {
  // 入口文件
  input: 'src/index.ts',
  // 输出文件配置
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.browser,
      format: 'umd',
      name: 'asyncLoadFiles', // 请更改模块名称
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  watch: {
    include: 'src/**',
  },
  plugins: [
    alias({
      entries: {
        '@': './src',
        '~': './',
      },
    }),
    resolve(),
    commonjs(),
    json(),
    image(),
    typescript(),
    babel({
      exclude: 'node_modules/**', // 只编译我们的源代码
      babelHelpers: 'runtime',
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    }),
    terser({
      compress: {
        drop_debugger: true,
      },
    }),
  ],
  // 需要排除的模块
  external: [],
  banner: '/*  version ' + pkg.version + ' */',
  // 警告提示
  onwarn({ loc, frame, message }) {
    // 打印位置信息
    if (loc) {
      console.warn(`${loc.file} (${loc.line}:${loc.column}) ${message}`)
      if (frame) console.warn(frame)
    } else {
      console.warn(message)
    }
  },
}
