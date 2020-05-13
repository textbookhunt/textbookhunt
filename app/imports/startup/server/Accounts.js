import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { UserInfo } from '../../api/userinfo/UserInfo';

/* eslint-disable no-console */

function createUser(email, password, role, firstName, lastName, major, image, description) {
  console.log(`  Creating user ${email}.`);
  const user = email;
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
  UserInfo.insert({ user, firstName, lastName, image, major, description });
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({
                                           email, password, role, firstName,
                                           lastName, major, image, description,
                                         }) => createUser(
        email, password, role, firstName, lastName, major, image, description,
    ));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
