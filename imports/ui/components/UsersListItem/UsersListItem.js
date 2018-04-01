import React from 'react';
import PropTypes from 'prop-types';

const UsersListItem = ({user}) => {
  return (
    <div>
      email: { user.emails[0].address }
      <br />
      nameDisplayed: { user.hasOwnProperty('profile.nameDisplayed')
        ? user.profile.nameDisplayed
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
