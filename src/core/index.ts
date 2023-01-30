import { Options } from '../types';
import { setStyles, toCssUnit, validateOptions } from '../utils';

function createCanvas(
  width: number,
  height: number,
  left: number,
  top: number
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  setStyles(canvas, {
    position: 'absolute',
    left: toCssUnit(left, 'px'),
    top: toCssUnit(top, 'px'),
  });

  return canvas;
}

function createContainer(): HTMLDivElement {
  const div = document.createElement('div');
  setStyles(div, {
    zIndex: '-1',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
  });
  return div;
}

function createResizeObserver(canvas: HTMLCanvasElement) {
  return new ResizeObserver((entries) => {
    const node = entries[0];
    const { width, height, left, top } = node.target.getBoundingClientRect();

    setStyles(canvas, {
      left: toCssUnit(left, 'px'),
      top: toCssUnit(top, 'px'),
    });

    canvas.width = width;
    canvas.height = height;
  });
}

function createMouseListener(
  canvas: HTMLCanvasElement,
  size: number,
  color: string
) {
  const ctx = canvas.getContext('2d')!;
  const offset = size / 2;

  return (e: MouseEvent) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const x = e.clientX;
    const y = e.clientY;
    ctx.beginPath();
    ctx.fillRect(x - offset, y - offset, size, size);
    ctx.fillStyle = color;
    ctx.fill();
  };
}

const defaultOptions: Required<Omit<Options, 'node'>> = {
  color: '#953553',
  size: 80,
  background: '#19191A',
};

export function InitPixelBackground(options: Options) {
  validateOptions(options);

  const mergedOptions: Required<Options> = {
    ...options,
    ...defaultOptions,
  };

  const { width, height, left, top } =
    mergedOptions.node.getBoundingClientRect();
  const container = createContainer();
  const canvas = createCanvas(width, height, left, top);
  const resizeObserver = createResizeObserver(canvas);

  document.body.prepend(container);
  container.appendChild(canvas);

  const mouseListener = createMouseListener(
    canvas,
    mergedOptions.size,
    mergedOptions.color
  );

  document.addEventListener('mousemove', mouseListener);
  resizeObserver.observe(mergedOptions.node);
}

export default InitPixelBackground;
