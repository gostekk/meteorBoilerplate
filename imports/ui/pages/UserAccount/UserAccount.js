import React from 'react';

import UserChangePassword from '../../components/UserChangePassword/UserChangePassword';

const UserAccount = (props) => {
  return (
    <div>
      edit user<br/>
      <button onClick={() => window.confirm('Are you sure?')
        ? (Meteor.call('user.toDelete', props.userId, () => Meteor.logout()) )
        : console.log('nope')
      }>delete account</button>
      <br/>
      UserAccount<br/>
      <br/>
      <UserChangePassword {...props} />
    </div>
  );
}

export default UserAccount;
