import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Image, Loader, Button, Icon, Segment, Grid, Feed } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Books } from '../../api/book/Book';
import { Notes } from '../../api/notes/Notes';

/** Renders a table containing all of the Book documents. Use <BookItem> to render each row. */
class Listing extends React.Component {
  removeBook(docID) {
    Books.remove(docID);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div>
          <Container>
          <Segment>
              <Header textAlign='center' >{this.props.item.name}</Header>
              <Grid columns={2}>
                <Grid.Column width={5}>
                  <Image size='medium' src={this.props.item.image}/>
                </Grid.Column>
                <Grid.Column widht={11}>
                  <p><b>Price:</b> ${this.props.item.price}</p>
                  <p><b>Condition:</b> {this.props.item.condition}</p>
                  <p><b>Description:</b> {this.props.item.description}</p>
                  <p ><Link>Place a request to buy</Link></p>
                </Grid.Column>
              </Grid>
          </Segment>
            <Segment>
              <Feed>
                <Header>Comments and Requests</Header>
                {this.props.notes.map((note, index) => <Notes key={index} note={note}/>)}
              </Feed>
            </Segment>
          </Container>
        </div>
    );
  }
}

/** Require an array of Book documents in the props. */
Listing.propTypes = {
  item: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
  notes: PropTypes.String,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {

  // Get access to Book documents.
  console.log(match.params._id);
  const bookId = match.params._id;
  console.log(bookId);
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  // const owner = Meteor.user().username;
//  console.log("owner is "+owner);
  const subscription = Meteor.subscribe('AllBook');
  const subscription2 = Meteor.subscribe('Notes');
  return {

    item: Books.findOne(bookId),
    notes: Notes.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
    currentUser,
  };
})(Listing);
