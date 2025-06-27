import { CONFIG } from 'src/global-config';

import { OrganizationalChartView } from 'src/sections/_examples/extra/organizational-chart-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: `Organizational chart | Components - ${CONFIG.appName}`,
};

export default function Page() {
  return <OrganizationalChartView />;
}
