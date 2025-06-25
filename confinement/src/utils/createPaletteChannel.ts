export function createPaletteChannel(color: string) {
  return {
    main: color,
    contrastText: '#fff', // optional, but good for buttons/text
  };
}
