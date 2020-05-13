import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Books } from '../../api/book/Book';
import { Notes } from '../../api/notes/Notes';
import BookItemAdmin from '../components/BookItemAdmin';

/** Renders a table containing all of the Book documents. Use <BookItemAdmin> to render each row. */
class ListBookAdmin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Browse for Books</Header>
          <Card.Group>
            {this.props.books.map((book, index) => <BookItemAdmin key={index} book={book} notes=
                {this.props.notes.filter(note => (note.contactId === book._id))
                }/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Book documents in the props. */
ListBookAdmin.propTypes = {
  books: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Book documents.
  const subscription = Meteor.subscribe('AllBook');
  const subscription2 = Meteor.subscribe('Notes');
  return {
    books: Books.find({}).fetch(),
    notes: Notes.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(ListBookAdmin);
