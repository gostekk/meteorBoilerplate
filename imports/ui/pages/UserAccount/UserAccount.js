import React from 'react';

import UserChangePassword from '../../components/UserChangePassword/UserChangePassword';
import UserChangeUsername from '../../components/UserChangeUsername/UserChangeUsername';

const UserAccount = (props) => {
  return (
    <div>
      <UserChangeUsername {...props} />
      <br/><br/>edit user<br/><br/>
      <button onClick={() => window.confirm('Are you sure?')
        ? (Meteor.call('user.toDelete', props.userId, () => Meteor.logout()) )
        : console.log('nope')
      }>delete account</button>
      <br/>
      <UserChangePassword {...props} />
    </div>
  );
}

export default UserAccount;
