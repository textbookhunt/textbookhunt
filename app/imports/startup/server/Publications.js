import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Books } from '../../api/book/Book';
/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Book', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Books.find({ owner: username });
  }
  return this.ready();
});


Meteor.publish('AllBooks', function publish() {


  return Books.find();

  return this.ready();
});
/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('BookAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Books.find();
  }
  return this.ready();
});
