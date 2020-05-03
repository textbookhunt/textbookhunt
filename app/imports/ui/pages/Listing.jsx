import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Image, Loader, Button, Icon, Segment, Grid, Feed } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Books } from '../../api/book/Book';
import { Notes } from '../../api/notes/Notes';
import Note from '/imports/ui/components/Note';
import AddNotes from '/imports/ui/components/AddNotes'

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
              <Header style={{ fontSize: 25 }} textAlign='center' >{this.props.item.name}</Header>
            { this.props.currentUser === this.props.item.owner ? (
                <Button as={NavLink} exact to='/list' floated='right'
                        onClick={() => this.removeBook(this.props.item._id)} color='red'>
                  Delete
                </Button>
            ) : ''
            }
            { this.props.currentUser === this.props.item.owner ? (
                <Button as={NavLink} exact to={`/editBook/${this.props.item._id}`} floated='right' color='green'>
                  Edit
                </Button>
            ) : ''

            }
              <Grid columns={2}>
                <Grid.Column width={5}>
                  <Image size='medium' src={this.props.item.image}/>
                </Grid.Column>
                <Grid.Column width={11}>
                  <p className='listing-details'><b>Price:</b> ${this.props.item.price}</p>
                  <p className='listing-details'><b>Condition:</b> {this.props.item.condition}</p>
                  <p className='listing-details'><b>Description:</b> {this.props.item.description}</p>
                </Grid.Column>
              </Grid>
          </Segment>
            <Segment>
              <Feed>
                <Header>Comments and Requests</Header>
                {this.props.currentUser === '' ? '' : (
                  <AddNotes owner={this.props.currentUser} book={this.props.item._id} ownerId={this.props.currentId}/>)
                }
                {this.props.notes.map((note, index) => <Note key={index} note={note} currentUser={this.props.currentUser}/>)}
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
  notes: PropTypes.array.isRequired,
  currentId: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get access to Book documents.
  const bookId = match.params._id;
  // const owner = Meteor.user().username;
//  console.log("owner is "+owner);
  const subscription = Meteor.subscribe('AllBook');
  const subscription2 = Meteor.subscribe('Notes');
  return {
    item: Books.findOne(bookId),
    notes: Notes.find({ book: bookId }).fetch(),
    ready: subscription.ready() && subscription2.ready(),
    currentUser: Meteor.user() ? Meteor.user().username : '',
    currentId: Meteor.user() ? Meteor.userId() : '',
  };
})(Listing);
