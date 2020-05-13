import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Books } from '../../api/book/Book';
import { Notes } from '../../api/notes/Notes';
import { Profiles } from '../../api/profile/Profile';
import { UserInfo } from '../../api/userinfo/UserInfo';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Book', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Books.find({ owner: username });
  }
  return this.ready();
});
Meteor.publish('AllBook', function publish() {

    return Books.find();

  // eslint-disable-next-line no-unreachable
  return this.ready();
});
/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('BookAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Books.find();
  }
  return this.ready();
});

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Profile', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profiles.find({ owner: username });
  }
  return this.ready();
});

// eslint-disable-next-line meteor/audit-argument-checks
Meteor.publish('Notes', function publish() {
  return Notes.find();
});

Meteor.publish('UserInfo', function publish() {
  if (this.userId) {
    return UserInfo.find();
  }
  return this.ready();
});
