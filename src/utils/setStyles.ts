export const setStyles = (target: HTMLElement, styles: Partial<CSSStyleDeclaration>): void => {
  Object.assign(target.style, styles);
};