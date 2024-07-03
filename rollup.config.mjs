import { chromeExtension, simpleReloader } from 'rollup-plugin-chrome-extension'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

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
    commonjs()
  ],
}