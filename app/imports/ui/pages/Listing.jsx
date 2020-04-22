import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Header, Image, Loader, Menu } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Books } from '../../api/book/Book';
import { Link, NavLink } from 'react-router-dom';
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
          <Image src= {this.props.book.image} />
          <Header as="h2" textAlign="center">{this.props.book.name}</Header>
          <p align="center"><b>Price:</b> $  {this.props.book.price}</p>
          <p align="center"><b>Condition:</b> {this.props.book.condition}</p>
          <p align="center"><b>Description:</b>  {this.props.book.description}</p>
          <p align="center"><b>Sold by:</b>  {this.props.book.owner}</p>
          <p align="center"><Link>Place a request to buy</Link></p>


          {(this.props.currentUser ===this.props.book.owner) ?  (
              [
                <p align="right"><Link to={`/editBook/${this.props.book._id}`}>Edit</Link></p>]
          ) : ''}
        </Container>
    );
  }
}

/** Require an array of Book documents in the props. */
Listing.propTypes = {
  book: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({match}) => {
  // Get access to Book documents.
  console.log(match.params.id);
  const bookId = match.params.id;
  console.log(bookId);
  const currentUser = Meteor.user() ? Meteor.user().username : '';
 // const owner = Meteor.user().username;
//  console.log("owner is "+owner);
  const subscription = Meteor.subscribe('AllBook');
  return {
    book: Books.findOne(bookId),
    ready: subscription.ready(),
    currentUser,
  };
})(Listing);
