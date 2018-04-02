import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AppRoute = ({ component: Component, layout: Layout, authenticated, ...rest }) => (
  <Route {...rest} render={props => (
    authenticated ?
      <Layout>
        <Component {...props} userId={rest.userId} />
      </Layout>
    : <Redirect to="/login" />
  )} />
)

export default AppRoute;
