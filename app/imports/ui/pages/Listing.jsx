import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Image, Loader, Button, Icon, Segment, Grid, Feed, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Books } from '../../api/book/Book';
import { Notes, NotesSchema } from '../../api/notes/Notes';

/** Renders a table containing all of the Book documents. Use <BookItem> to render each row. */
class Listing extends React.Component {
  removeBook(docID) {
    Books.remove(docID);
  }

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { note, owner, contactId, createdAt } = data;
    Notes.insert({ note, owner, contactId, createdAt },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    let fRef = null;
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
                <Card.Group center>
                  <Card>
                    <Card.Header Add Comments />
                    <AutoForm ref={ref => { fRef = ref; }} schema={NotesSchema} onSubmit={data => this.submit(data, fRef)} ><Segment>
                      <TextField label="Write a Comment" name='note'/>
                      <TextField name='owner' value={this.props.owner}/>
                      <TextField name='contactId' value={this.props.contactId}/>
                      <SubmitField value='Submit'/>
                      <ErrorsField/>
                      <HiddenField name='createdAt' value={new Date()}/>
                    </Segment>
                    </AutoForm>
                  </Card>
                  <Card>
                    <Card.Header> Comments </Card.Header>
                    <Card.Description> {this.props.notes.note}</Card.Description>
                  </Card>
                </Card.Group>
              </Feed>
            </Segment>
          </Container>
        </div>
    );
  }
}

/** Require an array of Book documents in the props. */
Listing.propTypes = {
  owner: PropTypes.string.isRequired,
  contactId: PropTypes.string.isRequired,
  item: PropTypes.object,
  notes: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
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
