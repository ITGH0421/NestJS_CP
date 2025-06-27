import { CONFIG } from 'src/global-config';

import { PaginationView } from 'src/sections/_examples/mui/pagination-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Pagination | MUI - ${CONFIG.appName}` };

export default function Page() {
  return <PaginationView />;
}
