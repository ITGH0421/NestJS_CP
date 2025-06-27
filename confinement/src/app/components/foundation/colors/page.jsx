import { CONFIG } from 'src/global-config';

import { ColorsView } from 'src/sections/_examples/foundation/colors-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Colors | Foundations - ${CONFIG.appName}` };

export default function Page() {
  return <ColorsView />;
}
