import { Options } from '../types';
import { isHtmlElement } from './isHtmlElement';

// TODO: Add the validation to color option;
// TODO: Add the validation to background option;
// TODO: Add the validation to size option;
export function validateOptions(options: Options): void {
  const isArray = Array.isArray(options);

  if (typeof options !== 'object' || isArray) {
    const subject = isArray ? 'array' : typeof options;

    throw new Error(`Invalid options. Expected an object but got a ${subject}`);
  }

  const nodeIsNullOrUndefined =
    options.node === undefined || options.node === null;

  if (!isHtmlElement(options.node) || nodeIsNullOrUndefined) {
    const subject = nodeIsNullOrUndefined
      ? typeof options.node
      : Object.getPrototypeOf(options.node);

    throw new Error(
      `Invalid options.node. Expected a HTMLElement but got a ${subject}`
    );
  }

  if (options.node.tagName.toLowerCase() === 'body') {
    throw new Error(
      `Invalid options.node. Don't use the document.body element. You should create a container`
    );
  }

  return;
}
