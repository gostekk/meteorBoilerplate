import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';

// export const onCreateUser = (options, user) => {
//   if ( options.profile ) {
//     user.info = options.profile;
//   }
//
//   return user;
// }

// Accounts.onCreateUser(onCreateUser);

export const validateNewUser = (user) => {

  const email = user.emails[0].address;
  const username =  user.username;

  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
      optional: true,
    },
    username: {
      type: String,
      min: 5,
      max: 25,
      required: true,
    }
  }).validate({ email, username });

  return true;
}

if (Meteor.isServer) {
  Accounts.validateNewUser(validateNewUser);
}
