import React, { Suspense } from 'react';
import DocumentTitle from 'react-document-title';
import { Route, Redirect, Switch } from 'react-router-dom';
import { MenuBase } from './config';
import NotFound from '@/pages/notFound';

const SuspenseComponent = (props: any, extraProps: any, route: MenuBase) => {
  return (
    <Suspense fallback={<div></div>}>
      <route.component {...props} {...extraProps} route={route} />
    </Suspense>
  );
};

function renderRoutes(routes: MenuBase[], extraProps = {}, switchProps = {}) {
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route: MenuBase, i: number) => {
        return (
          <Route
            key={route.path || i}
            path={route.path}
            exact={route.exact}
            render={props => {
              return route.render ? (
                route.render({ ...props, ...extraProps, route: route })
              ) : (
                <DocumentTitle title={route.name}>
                  {route.layout ? (
                    <route.layout route={route}>
                      {SuspenseComponent(props, extraProps, route)}
                    </route.layout>
                  ) : (
                    SuspenseComponent(props, extraProps, route)
                  )}
                </DocumentTitle>
              );
            }}
          />
        );
      })}
      <Route path="/notFound" component={NotFound} />
      <Redirect to="/notFound" />
    </Switch>
  ) : null;
}

export default renderRoutes;
