import { chromeExtension, simpleReloader } from 'rollup-plugin-chrome-extension'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy'

export default {
  input: 'src/manifest.json',
  output: {
    dir: 'build/',
    format: 'esm',
  },
  plugins: [
    chromeExtension({
      browserPolyfill: true,
    }),
    simpleReloader(),
    nodeResolve(),
    commonjs(),
    copy({
      targets: [
        {src: "LICENSE", dest: "build/"} /* Copy the license */
      ]
    })
  ],
}