export type Unit = 'px' | 'em' | 'rem';
export const toCssUnit = (num: number, unit: Unit): string => num.toString() + unit;