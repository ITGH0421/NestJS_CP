import { CONFIG } from 'src/global-config';

import { ContactView } from 'src/sections/contact/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Contact us - ${CONFIG.appName}` };

export default function Page() {
  return <ContactView />;
}
