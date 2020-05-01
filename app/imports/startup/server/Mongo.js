import { Meteor } from 'meteor/meteor';
import { Books } from '../../api/book/Book';
import { UserInfo } from '../../api/userinfo/UserInfo';

/** Initialize the database with a default data document. */
function addBook(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Books.insert(data);
}

/** Initialize the collection if empty. */
if (Books.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultBook.map(data => addBook(data));
  }
}



