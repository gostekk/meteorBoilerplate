import React from 'react';

const PermissionsButton = (props) => {
  return (
    <div>
      <button onClick={ () => Meteor.call('user.permission', props.id, props.permName)}>{props.permName} permissions</button>
    </div>
  );
}

export default PermissionsButton;
