import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  'user.register': function (user, roles) {
    // TODO: Create disabled account
    const id = Accounts.createUser(user);

    // NOTE: Delete this lines
    if(roles.admin) {
      Roles.addUsersToRoles(id, 'admin');
    }

    return id;
  },

  'user.add': function (user, roles) {
    if (!Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized', 'Must be authorized to add new user!');
    }

    const id = Accounts.createUser(user);

    if(roles.admin) {
      Roles.addUsersToRoles(id, 'admin');
    }

    return id;
  },

  'user.toDelete': function (id) {
    if(Roles.userIsInRole(this.userId, 'admin') && (this.userId == id)) {
      throw new Meteor.Error('method-not-allowed', 'Can\'t add admin toDelete role');
    }
    Roles.addUsersToRoles(this.userId, 'delete');
  },

  'user.delete': function (id) {
    if (!Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized', 'Must be authorized to delete user!');
    } else if (this.userId === id) {
      throw new Meteor.Error('bad-request', 'Can\'t delete yourself!');
    }
    check(id, String);

    Meteor.users.remove(id);
  },

  'user.changeUsername': function (id, newUsername) {
    check(id, String);
    check(newUsername, String);

    if (this.user.username === newUsername) {
      throw new Meteor.Error('bad-request', 'New username must be different from the old one.');
    }

    Accounts.setUsername(id, newUsername);
  },

  'user.setPassword': function (id, newPass) {
    if (!Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized', 'Must be authorized to add new user!');
    }
    check(id, String);
    check(newPass, String);

    Accounts.setPassword(id, newPass);
  },

  'user.permission': function (id, permName) {
    if (!Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized', 'Must be authorized to add new user!');
    } else if ((this.userId === id) && (permName === 'admin')) {
      throw new Meteor.Error('method-not-allowed', 'Can\'t revoke admin permissions!');
    }

    if(!Roles.userIsInRole(id, permName)) {
      Roles.addUsersToRoles(id, permName);
    } else {
      Roles.removeUsersFromRoles(id, permName);
    }
  },
});
