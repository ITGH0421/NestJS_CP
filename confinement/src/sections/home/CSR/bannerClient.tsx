'use client';

import dynamic from 'next/dynamic';

// Dynamically import the Banner component (already client)
const Banner = dynamic(() => import('../Banner'), { ssr: false });

export default function bannerClient() {
  return <Banner />;
}
