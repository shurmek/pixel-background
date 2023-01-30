import esbuild from 'esbuild';
import config from '../esbuild.config';

async function build() {
  esbuild.build(config);
}

build();
