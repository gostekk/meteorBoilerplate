import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import UsersListItem from '../../components/UsersListItem/UsersListItem';

const UsersList = ({ loading, users}) => (
  !loading ? (
    <div>
      { users.map((user) => <UsersListItem key={user._id} user={user} />) }
    </div>
  ) : <div>Data missing!</div>
);

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
  const subscription = Meteor.subscribe("usersList");
  return {
    loading: !subscription.ready(),
    users: Meteor.users.find({}).fetch(),
  }
})(UsersList);
