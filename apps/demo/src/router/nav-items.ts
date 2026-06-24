import { routeType } from '@/router/route-type.js';
import  type { NavItem } from '@hui/components';

export default [
  {
    label: 'home',
    icon: 'home',
    path: routeType.home,
  },
] as const satisfies ReadonlyArray<NavItem>;
