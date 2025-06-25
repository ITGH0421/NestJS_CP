'use client';

import dynamic from 'next/dynamic';

// Dynamically import the Banner component (already client)
const Packages = dynamic(() => import('../PackagesSection'), { ssr: false });

export default function packageClient() {
  return <Packages />;
}