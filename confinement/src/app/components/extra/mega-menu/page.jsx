import { CONFIG } from 'src/global-config';

import { MegaMenuView } from 'src/sections/_examples/extra/mega-menu-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Mega menu | Components - ${CONFIG.appName}` };

export default function Page() {
  return <MegaMenuView />;
}
