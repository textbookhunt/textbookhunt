import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Books = new Mongo.Collection('Books');

/** Define a schema to specify the structure of each document in the collection. */
const BookSchema = new SimpleSchema({
  name: String,
  price: Number,
  description: String,
  image: String,
  owner: String,
  condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Books.attachSchema(BookSchema);

/** Make the collection and schema available to other code. */
export { Books, BookSchema };
