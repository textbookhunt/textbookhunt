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

if (Profiles.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    // eslint-disable-next-line no-use-before-define
    Meteor.settings.defaultProfile.map(data => addProfile(data));
  }
}

function addProfile(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Profiles.insert(data);
}
