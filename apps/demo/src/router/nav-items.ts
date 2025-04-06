import type { NavItem } from '@hui/components';

import { routeType } from '@/router/route-type.js';

export default [
  {
    label: 'home',
    icon: 'home',
    path: routeType.home,
  },
] as const satisfies ReadonlyArray<NavItem>;
