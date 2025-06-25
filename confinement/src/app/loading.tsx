'use client';

import React from 'react';

// Explicit import from compiled JS modules
import { LoadingScreen } from '@/components/loading-screen';
// import { SplashScreen } from '@/components/splash-screen';

export default function Loading() {
  return (
    <>
      <LoadingScreen />
    </>
  );
}
