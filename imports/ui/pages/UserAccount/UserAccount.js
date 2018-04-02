import React from 'react';

const UserAccount = (props) => {
  console.log(props);
  return (
    <div>
      edit user<br/>
      change password<br/>
      <button onClick={() => window.confirm('Are you sure?') ? Meteor.call('user.toDelete', props.userId) : console.log('nope')} >delete account</button>
      <br/>
      UserAccount<br/>
    </div>
  );
}

export default UserAccount;
