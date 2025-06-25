// src/app/layout.tsx
import '@/app/globals.css';

import type { Metadata } from 'next';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { themeConfig, ThemeProvider } from '@/theme';


export const metadata: Metadata = {
  title: 'Chilli Padi Confinement',
  description: 'Premium confinement meals delivered to your door',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript
          defaultMode={themeConfig.defaultMode as 'light' | 'dark' | 'system'}
          modeStorageKey={themeConfig.modeStorageKey}
          attribute={themeConfig.cssVariables.colorSchemeSelector}
        />

        <AppRouterCacheProvider options={{ key: 'css' }}>
          <ThemeProvider
            defaultMode={themeConfig.defaultMode}
            modeStorageKey={themeConfig.modeStorageKey}
            themeOverrides={themeConfig.themeOverrides}
          >
            {/* <Suspense fallback={<Loading />}> */}
              
              {children}
             
            {/* </Suspense> */}
          </ThemeProvider> 
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
