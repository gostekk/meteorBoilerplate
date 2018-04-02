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

  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
      optional: true,
    },
  }).validate({ email });

  return true;
}

Accounts.validateNewUser(validateNewUser);
