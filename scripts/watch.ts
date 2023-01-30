import esbuild from 'esbuild';
import config from '../esbuild.config';

async function watch() {
  const ctx = await esbuild.context(config);
  return ctx.watch();
}

await watch();
