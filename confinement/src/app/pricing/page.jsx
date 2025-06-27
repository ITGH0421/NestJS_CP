import { CONFIG } from 'src/global-config';

import { PricingView } from 'src/sections/pricing/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Pricing - ${CONFIG.appName}` };

export default function Page() {
  return <PricingView />;
}
