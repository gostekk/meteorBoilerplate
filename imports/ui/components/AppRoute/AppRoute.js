import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

const AppRoute = ({ component: Component, layout: Layout, adminOnly, ...rest }) => (
  <Route {...rest} render={props => (
    rest.authenticated && (Roles.userIsInRole(rest.userId, 'admin') || !adminOnly) ?
      <Layout>
        <Component {...props} userId={rest.userId} authenticated={rest.authenticated} />
      </Layout>
    : <Redirect to="/login" />
  )} />
)

export default AppRoute;
