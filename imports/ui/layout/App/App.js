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

// Public
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';

// Admin
import AddUser from '../../pages/AddUser/AddUser';
import UsersList from '../../pages/UsersList/UsersList';

// User
import Index from '../../pages/Index/Index';
import UserAccount from '../../pages/UserAccount/UserAccount';

// Else
import NotFound from '../../pages/NotFound/NotFound';

const App = (props) => (
  <Router>
    <div>
      <Switch>
        <Route exact name="index" path="/" render={() => <Redirect to="login" />} />

        <Public exact path="/login" redirectPath="/app" component={Login} {...props} />
        <Public exact path="/register" redirectPath="/app" component={Register} {...props} />

        <AppRoute exact path="/app" layout={NavLayout} component={Index} {...props} />
        <AppRoute exact path="/account" layout={NavLayout} component={UserAccount} {...props} />

        <AppRoute exact path="/adduser" layout={NavLayout} component={AddUser} {...props} />
        <AppRoute exact path="/users" layout={NavLayout} component={UsersList} {...props} />

        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  </Router>
);

App.defaultProps = {
  userId: '',
};

App.propTypes = {
  userId: PropTypes.string,
  authenticated: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const userId = Meteor.userId();
  return {
    authenticated: !!userId,
    userId,
  };
})(App);
