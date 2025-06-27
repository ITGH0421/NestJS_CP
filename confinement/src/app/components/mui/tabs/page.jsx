import { CONFIG } from 'src/global-config';

import { TabsView } from 'src/sections/_examples/mui/tabs-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Tabs | MUI - ${CONFIG.appName}` };

export default function Page() {
  return <TabsView />;
}
