import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Books } from '../../api/book/Book';
import { Notes } from '../../api/notes/Notes';
import BookItem from '../components/BookItem';
//import Filter from '../components/Filter';
import { Filter } from '../components/Filter';

/** Renders a table containing all of the Book documents. Use <BookItem> to render each row. */
class ListBook extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    console.log(this.props);
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const filter = new Filter();
    console.log("major is "+filter.getmajor());
    return (
        <div>
        <Container>

          <Header as="h2" textAlign="center">Browse for Books</Header>
        </Container>
          <Grid>
            <div style={{marginLeft: "20px"}}>
          <Header>filter: </Header>
          <br/>
          <div style={{marginLeft: "20px"}}>
          <Filter majors={_.uniq(_.pluck(this.props.majors,'major'))} />
          </div>
            <div>{filter.major}</div>
            </div>
            <Container style={{marginTop: "40px"}}>
            <Grid.Column width={12}>
          <Card.Group>
            {this.props.books.map((book, index) => <BookItem key={index}
                                                     book={book}
                                                     notes={this.props.notes.filter(note => (note.contactId === book._id))}/>)}
          </Card.Group>
            </Grid.Column>
            </Container>
          </Grid>

        </div>
    );
  }
}

/** Require an array of Book documents in the props. */
ListBook.propTypes = {
  books: PropTypes.array.isRequired,
  majors: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Book documents.
  const subscription = Meteor.subscribe('AllBook');
  const subscription2 = Meteor.subscribe('Notes');

  return {

    books: Books.find({major: 'EE' }).fetch(),
    notes: Notes.find({}).fetch(),
    majors: Books.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(ListBook);
