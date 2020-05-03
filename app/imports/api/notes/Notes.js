import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Notes = new Mongo.Collection('Notes');

/** Define a schema to specify the structure of each document in the collection. */
const NoteSchema = new SimpleSchema({
  note: String,
  book: String,
  owner: String,
  ownerId: String,
  date: Date,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Notes.attachSchema(NoteSchema);

/** Make the collection and schema available to other code. */
export { Notes, NoteSchema };
