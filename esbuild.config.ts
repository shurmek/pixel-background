import { BuildOptions } from 'esbuild';

const config: BuildOptions = {
  entryPoints: ['./src/index.ts'],
  platform: 'browser',
  outdir: './lib',
  bundle: true,
  minify: true,
  format: 'esm',
};

export default config;
