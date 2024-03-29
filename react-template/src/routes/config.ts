import React, { lazy, LazyExoticComponent } from 'react';

import layouts from '@/layouts/index';

const { BasicLayout = null } = { ...layouts };

interface Imate {
  title: '';
}
export interface MenuBase {
  path: string;
  name: string;
  label?: string;
  replace?: string;
  mate?: Imate;
  layout?: React.ReactElement | any;
  element?: React.ReactElement | LazyExoticComponent<any> | any;
  children?: MenuBase[];
}
const routes: MenuBase[] = [
  // 菜单相关路由
  {
    path: '/',
    name: 'home',
    label: 'Home',
    layout: BasicLayout,
    element: lazy(() => import('@/pages/home')),
  },
  {
    path: '/hooksDemo',
    name: 'hooksDemo',
    label: 'hooksDemo',
    layout: BasicLayout,
    element: lazy(() => import('@/pages/hooksDemo')),
  },
];

export default routes;
