import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Books } from '../../api/book/Book';
import { Link } from 'react-router-dom';
/** Renders a table containing all of the Book documents. Use <BookItem> to render each row. */
class Listing extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Book Name</Header>
          <p align="center"><b>Price:</b> $----</p>
          <p align="center"><b>Condition:</b> ----</p>
          <p align="center"><b>Description:</b> ------</p>
          <p align="center"><Link>Place a request to buy</Link></p>
          <p align="right"><Link>Edit</Link></p>
        </Container>
    );
  }
}

/** Require an array of Book documents in the props. */
Listing.propTypes = {
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
})(Listing);
