import React from 'react';
import PropTypes from 'prop-types';

const UsersListItem = ({user}) => {
  return (
    <div>
      email: { user.emails[0].address }
      <br />
      nameDisplayed: { user.profile
        ? user.profile.nameDisplayed
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
