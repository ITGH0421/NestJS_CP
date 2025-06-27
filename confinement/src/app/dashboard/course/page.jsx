import { CONFIG } from 'src/global-config';

import { OverviewCourseView } from 'src/sections/overview/course/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Course | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <OverviewCourseView />;
}
