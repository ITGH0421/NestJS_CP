'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@/theme'; // this works now because of your index.js fix

export default function Providers({ children }: { children: React.ReactNode }) {
  const theme = createTheme(); // your custom Minimal theme
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
