import React from 'react';
import PropTypes from 'prop-types';

import UserSetPassword from '../UserSetPassword/UserSetPassword';

const UsersListItem = ({user}) => {
  return (
    <div>
      username: { user.username
        ? user.username
        : 'Undefined' }
      <br />
      email: { user.emails[0].address
        ? user.emails[0].address
        : 'Undefined' }
      <br />
      roles: { user.roles && (user.roles.length > 0)
        ? user.roles
        : 'Undefined' }
      <br />
      <UserSetPassword id={user._id} />
      <br />
      <button onClick={ () => Meteor.call('user.adminPerm', user._id)}>Add admin permissions</button>
      <br />
      <button onClick={() => window.confirm('Are you sure?')
        ? (Meteor.call('user.delete', user._id))
        : console.log('nope')
      }>delete account</button>
      <br />
      <br />
    </div>
  );
}

UsersListItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UsersListItem;
