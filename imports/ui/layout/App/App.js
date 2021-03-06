import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

// Components
import AppRoute from '../../components/AppRoute/AppRoute';
import Authenticated from '../../components/Authenticated/Authenticated';
import Public from '../../components/Public/Public';

// Layouts
import NoLayout from '../NoLayout/NoLayout';
import NavLayout from '../NavLayout/NavLayout';
import AdmLayout from '../AdmLayout/AdmLayout';

// Public
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';

// Admin
import Admin from '../../pages/Admin/Admin';
import AddUser from '../../pages/AddUser/AddUser';
import UsersList from '../../pages/UsersList/UsersList';

// User
import Index from '../../pages/Index/Index';
import UserAccount from '../../pages/UserAccount/UserAccount';

// Else
import NotFound from '../../pages/NotFound/NotFound';

const App = (props) => (
  <Router>
    {!props.loading ?  (
      <div>
        <Switch>
          <Route exact name="index" path="/" render={() => <Redirect to="login" />} />

          <Public exact path="/login" redirectPath="/app" component={Login} {...props} />
          <Public exact path="/register" redirectPath="/app" component={Register} {...props} />

          <AppRoute exact path="/app" layout={NavLayout} adminOnly={false} component={Index} {...props} />
          <AppRoute exact path="/account" layout={NavLayout} adminOnly={false} component={UserAccount} {...props} />

          <AppRoute exact path="/admin" layout={AdmLayout} adminOnly={true} component={Admin} {...props} />
          <AppRoute exact path="/adduser" layout={AdmLayout} adminOnly={true} component={AddUser} {...props} />
          <AppRoute exact path="/users" layout={AdmLayout}  adminOnly={true} component={UsersList} {...props} />

          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    ) : ''}
  </Router>
);

App.defaultProps = {
  userId: '',
};

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  userId: PropTypes.string,
  authenticated: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const loggingIn = Meteor.loggingIn();
  const userId = Meteor.userId();
  const loading = !Roles.subscription.ready();
  return {
    loading,
    loggingIn,
    authenticated: !loggingIn && !!userId,
    userId,
  };
})(App);
