// Converts hex to RGB channel array [r, g, b]
export function hexToRgbChannel(hex: string): number[] {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map((x) => x + x).join('');
  }
  const bigint = parseInt(hex, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

// Set default font settings
export function setFont(fontFamily: string = 'Public Sans, sans-serif'): {
  fontFamily: string;
  fontWeight: number;
  fontSize: number;
  lineHeight: number;
} {
  return {
    fontFamily,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 1.5,
  };
}

// Palette channel generator (simplified)
export function createPaletteChannel(color: string): {
  main: string;
  contrastText: string;
} {
  return {
    main: color,
    contrastText: '#fff',
  };
}
