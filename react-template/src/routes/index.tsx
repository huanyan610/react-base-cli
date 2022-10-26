import React, { Suspense } from 'react';
import DocumentTitle from 'react-document-title';
import { Navigate, Route, Routes } from 'react-router-dom';

import NotFound from '@/pages/notFound';

import { MenuBase } from './config';

interface Iprops {
  routes?: MenuBase[];
  extraProps?: {};
}

function renderRoute(routes: MenuBase[], extraProps = {}) {
  return (
    <>
      {routes.map((route: MenuBase, i: number) => {
        return (
          <Route
            key={route.path || i}
            path={route.path}
            element={
              route?.replace ? (
                <Navigate replace to={route.path} />
              ) : (
                <DocumentTitle title={route.name}>
                  {route.layout ? (
                    <route.layout route={route} {...extraProps}>
                      {SuspenseComponent(route, extraProps)}
                    </route.layout>
                  ) : (
                    SuspenseComponent(route, extraProps)
                  )}
                </DocumentTitle>
              )
            }
          >
            {route?.children ? renderRoute(route?.children, extraProps) : <></>}
          </Route>
        );
      })}
    </>
  );
}

const SuspenseComponent = (route: MenuBase, extraProps: any) => {
  return (
    <Suspense fallback={<></>}>
      <route.element route={route} {...extraProps} />
    </Suspense>
  );
};

function RoutesElement(props: Iprops) {
  const { routes = [], extraProps } = props;
  console.log('RoutesElement', routes);
  return (
    <Routes>
      {routes ? renderRoute(routes, extraProps) : <></>}
      <Route path="/" element={<Navigate replace to={routes[0]?.path} />} />
      <Route path="/notFound" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/notFound" />} />
    </Routes>
  );
}

export default RoutesElement;
