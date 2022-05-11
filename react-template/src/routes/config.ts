import layouts from '@/layouts/index';
import React, { lazy, LazyExoticComponent } from 'react';

const { BasicLayout = '' } = { ...layouts };
export interface MenuBase {
  path: string;
  name: string;
  exact?: boolean;
  strict?: string;
  render?: any;
  query?: string;
  auth?: string;
  /** 是否登录校验，true不进行校验（访客） */
  requiresAuth?: boolean;
  layout?: React.ReactElement | any;
  component?: React.ReactElement | LazyExoticComponent<any> | any;
  routes?: MenuBase[];
}
const routes: MenuBase[] = [
  // 菜单相关路由
  {
    path: '/',
    name: '首页',
    exact: true,
    layout: BasicLayout,
    component: lazy(() => import('@/pages/home'))
  },
  {
    path: '/interview',
    name: '面试',
    exact: true,
    layout: BasicLayout,
    component: lazy(() => import('@/pages/interview'))
  },
  {
    path: '/hooksDemo',
    name: 'hooksDemo',
    exact: true,
    layout: BasicLayout,
    component: lazy(() => import('@/pages/hooksDemo'))
  },
  {
    path: '/notFound',
    name: 'notFound',
    exact: true,
    component: lazy(() => import('@/pages/notFound')),
  },
];

export default routes;
