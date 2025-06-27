import { CONFIG } from 'src/global-config';

import { MailView } from 'src/sections/mail/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Mail | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <MailView />;
}
