import { CONFIG } from 'src/global-config';

import { PaymentView } from 'src/sections/payment/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Payment - ${CONFIG.appName}` };

export default function Page() {
  return <PaymentView />;
}
