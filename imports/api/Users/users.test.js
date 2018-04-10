import { Meteor } from 'meteor/meteor';
import { expect } from 'meteor/practicalmeteor:chai';

import { validateNewUser } from './users';
import './methods';

if (Meteor.isServer) {
  import { resetDatabase } from 'meteor/xolvio:cleaner';
  import { Roles } from 'meteor/alanning:roles';
  import { Accounts } from 'meteor/accounts-base';

  describe('userValidation', function() {
    it('should allow valid user', function() {
      const testUser = {
        emails: [
          {
            address: "test@example.com"
          }
        ],
        username: 'testUser',
      };
      const res = validateNewUser(testUser);

      expect(res).to.be.true
    });

    it('should reject to short username', function() {
      const testUser = {
        emails: [
          {
            address: "test@example.com"
          }
        ],
        username: 'test',
      };

      expect(function() {
        validateNewUser(testUser);
      }).to.throw('Username must be at least 5 characters')
    });

    it('should reject to long username', function() {
      const testUser = {
        emails: [
          {
            address: "test@example.com"
          }
        ],
        username: 'test1test1test1test1test12',
      };

      expect(function() {
        validateNewUser(testUser);
      }).to.throw('Username cannot exceed 25 characters')
    });

    it('should reject email', function() {
      const testUser = {
        emails: [
          {
            address: "test.com"
          }
        ],
        username: 'testUser',
      };

      expect(function() {
        validateNewUser(testUser);
      }).to.throw('Email must be a valid email address')
    });
  });

  describe('userMethods', function () {
    const testUser = {
      email: 'test@example.com',
      password: 'password123',
      username: 'testUser',
    };
    const roles = {
      admin: false
    };

    describe('user.register', function () {
      beforeEach(function () {
        resetDatabase();
      });

      it('should return id of registered user', function() {
        const id = Meteor.server.method_handlers['user.register'](testUser, roles);
        expect(id).to.be.a('string');
      });

      it('should fail validate user', function() {
        expect(function () {
          Meteor.server.method_handlers['user.register']({}, roles);
        }).to.throw('Need to set a username or email');
      });


    });

    describe('user.add', function () {
      beforeEach(function () {
        resetDatabase();
      });

      it('should return id of registered user', function() {
        const adminUserId = Accounts.createUser({
          email: 'admin@testing',
          password: 'testAdmin',
          username: 'testAdmin',
        });

        Roles.addUsersToRoles(adminUserId, 'admin');

        const id = Meteor.server.method_handlers['user.add'].apply({ userId: adminUserId }, [testUser, roles]);
        expect(id).to.be.a('string');
      });

      it('should fail validate user', function() {
        const adminUserId = Accounts.createUser({
          email: 'admin@testing',
          password: 'testAdmin',
          username: 'testAdmin',
        });

        Roles.addUsersToRoles(adminUserId, 'admin');

        expect(function () {
          Meteor.server.method_handlers['user.add'].apply({ userId: adminUserId }, [{}, roles]);
        }).to.throw('Need to set a username or email');
      });

      it('should fail authorization of user', function() {
        expect(function () {
          Meteor.server.method_handlers['user.add'](testUser, roles);
        }).to.throw('Must be authorized to add new user!');
      });
    });

    describe('user.toDelete', function () {
      const adminUser = {
        email: 'admin@testing',
        password: 'testAdmin',
        username: 'testAdmin',
      };

      const normalUser = {
        email: 'normal@testing',
        password: 'testUser',
        username: 'testUser',
      };

      beforeEach(function () {
        resetDatabase();
      });

      it('should add normalUser toDelete role', function() {
        const normalUserId = Accounts.createUser(normalUser);

        const res = Meteor.server.method_handlers['user.toDelete'].apply({ userId: normalUserId }, [normalUserId]);
        expect(Roles.userIsInRole(normalUserId, 'delete')).to.be.true;
      });

      it('should refuse add admin toDelete role', function() {
        const adminUserId = Accounts.createUser(adminUser);

        Roles.addUsersToRoles(adminUserId, 'admin');

        expect(function () {
          Meteor.server.method_handlers['user.toDelete'].apply({ userId: adminUserId }, [adminUserId]);
        }).to.throw('Can\'t add admin toDelete role');
      });
    });
  });
}
