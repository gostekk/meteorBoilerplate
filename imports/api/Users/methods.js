import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  'user.register': function (user, roles) {
    // TODO: Create disabled account

    const id = Accounts.createUser(user);

    if(roles.admin) {
      Roles.addUsersToRoles(id, 'admin', Roles.GLOBAL_GROUP);
    }
  },

  'user.add': function (user, roles) {
    if (!Roles.userIsInRole(this.userId, 'admin')) {
     throw new Meteor.Error('not-authorized', 'Must be authorized to add new user!');
    }

    const id = Accounts.createUser(user);

    if(roles.admin) {
      Roles.addUsersToRoles(id, 'admin', Roles.GLOBAL_GROUP);
    }
  },

  'user.toDelete': function (id) {
    if(!Roles.userIsInRole(this.userId, 'admin') && this.userId == id) {
      Roles.addUsersToRoles(Meteor.userId(), 'delete', Roles.GLOBAL_GROUP);
    }
  },

  'user.delete': function (id) {
    if (!Roles.userIsInRole(this.userId, 'admin')) {
     throw new Meteor.Error('not-authorized', 'Must be authorized to add new user!');
    }
    check(id, String);

    Meteor.users.remove(id);
  },
});
