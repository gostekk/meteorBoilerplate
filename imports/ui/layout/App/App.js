import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

// Components
import Authenticated from '../../components/Authenticated/Authenticated';
import Public from '../../components/Public/Public';

// Public
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';

// Authenticated
import AddUser from '../../pages/AddUser/AddUser';
import UsersList from '../../pages/UsersList/UsersList';

// Route
import Index from '../../pages/Index/Index';
import NotFound from '../../pages/NotFound/NotFound';

const App = (props) => (
  <Router>
    <div>
      <Switch>
        <Route exact name="index" path="/" component={Index} />
        <Public exact path="/login" redirectPath="/" component={Login} {...props} />
        <Public exact path="/register" component={Register} {...props} />

        <Authenticated exact path="/adduser" component={AddUser} {...props} />
        <Authenticated exact path="/users" component={UsersList} {...props} />

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
