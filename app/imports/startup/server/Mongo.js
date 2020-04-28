import { Meteor } from 'meteor/meteor';
import { Books } from '../../api/book/Book';
import { Profiles } from '../../api/profile/Profile';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Books.insert(data);
}

/** Initialize the collection if empty. */
if (Books.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultBook.map(data => addData(data));
  }
}

