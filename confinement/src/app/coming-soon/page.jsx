import { CONFIG } from 'src/global-config';

import { ComingSoonView } from 'src/sections/coming-soon/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Coming soon - ${CONFIG.appName}` };

export default function Page() {
  return <ComingSoonView />;
}
