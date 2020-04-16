import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Books } from '../../api/book/Book';
import BookItemAdmin from '../components/BookItemAdmin';
import BookItem from '../components/BookItem';
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
          <Header as="h2" textAlign="center">List Book</Header>
          <Card.Group>
            {this.props.books.map((book) => <BookItem key={book._id} book={book} />)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Book documents in the props. */
ListBookAdmin.propTypes = {
  books: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Book documents.
  const subscription = Meteor.subscribe('Book');
  return {
    books: Books.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListBookAdmin);
