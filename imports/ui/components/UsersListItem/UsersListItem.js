import React from 'react';
import PropTypes from 'prop-types';

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
      roles: { user.roles
        ? user.roles
        : 'Undefined' }
      <br />
      <br />
    </div>
  );
}

UsersListItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UsersListItem;
