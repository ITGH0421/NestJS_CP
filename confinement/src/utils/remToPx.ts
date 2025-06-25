// This function takes a color in hex format and an alpha value (0 to 1),
export function remToPx(value: number): number {
  return Math.round(value * 16);
}
