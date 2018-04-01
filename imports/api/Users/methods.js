import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  'user.register': function (user, roles) {
    // TODO: Create disabled account

    const id = Accounts.createUser(user);

    if(roles.admin) {
      Roles.addUsersToRoles(id, 'admin');
    }
  },

  'user.add': function (user, roles) {
    if (!Roles.userIsInRole(this.userId, 'admin')) {
     throw new Meteor.Error('not-authorized', 'Must be authorized to add new user!');
    }

    const id = Accounts.createUser(user);

    if(roles.admin) {
      Roles.addUsersToRoles(id, 'admin');
    }
  },
});
