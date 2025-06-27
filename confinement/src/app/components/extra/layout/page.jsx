import { CONFIG } from 'src/global-config';

import { LayoutView } from 'src/sections/_examples/extra/layout-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Layout | Components - ${CONFIG.appName}` };

export default function Page() {
  return <LayoutView />;
}
