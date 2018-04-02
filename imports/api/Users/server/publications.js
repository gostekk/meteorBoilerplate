import { Meteor } from 'meteor/meteor';

Meteor.publish("usersList", function () {
  if (Roles.userIsInRole(this.userId, 'admin')) {
    return Meteor.users.find({},
    {
      fields: {
        emails: 1,
        username: 1,
        roles: 1,
      }
    });
  }

  this.stop();
  return;
});
