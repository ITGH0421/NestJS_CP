'use client';

import dynamic from 'next/dynamic';

// Dynamically import the Banner component (already client)
const Trusted = dynamic(() => import('../TrustedSection'), { ssr: false });

export default function trusdtedClient() {
  return <Trusted />;
}