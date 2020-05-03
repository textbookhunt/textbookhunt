import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Grid, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Books } from '../../api/book/Book';
import { Notes } from '../../api/notes/Notes'
import BookItem from '../components/BookItem';
//import Filter from '../components/Filter';
import { Filter } from '../components/Filter';
import { NavLink } from 'react-router-dom';

/** Renders a table containing all of the Book documents. Use <BookItem> to render each row. */
class ListBook extends React.Component {
    filterbook;
    major;
  constructor(props) {
    super(props);
    this.state = {major: 'All Majors'}
    this.filterbook = {};
    this.major = 'All Major';
  }
  getMajor = (major) => {
    let newState = this.state;
    newState = {
     major: major,
    }
    this.setState(newState);
    this.major =major;
    //console.log("major p "+this.major);
    let fmajor = major;
    this.filterbook = _.filter(this.props.books, function(object){ return object["major"] === fmajor; });
    //console.log("props "+this.filterbook.name);
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

          <Header as="h2" textAlign="center">Browse for Books</Header>

        </Container>
          <Grid>
            <div style={{marginLeft: "20px"}}>
          <Header>filter: </Header>

          <br/>
          <div style={{marginLeft: "20px"}}>
          <Filter sendMajor={this.getMajor.bind(this)} majors={_.uniq(_.pluck(this.props.majors,'major'))}  />
          </div>

            </div>
            <Container style={{marginTop: "40px"}}>
            <Grid.Column width={12}>


            { this.state.major === 'All Majors' ? (
                <Card.Group> {this.props.books.map((book, index) => <BookItem key={index}
                                                                              book={book}
                                                                              notes={this.props.notes.filter(note => (note.contactId === book._id))}/>)}</Card.Group>
            ) : <Card.Group> {this.filterbook.map((book, index) => <BookItem key={index}
                                                                              book={book}
                                                                              notes={this.props.notes.filter(note => (note.contactId === book._id))}/>)}</Card.Group>
            }


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

  //console.log("major is "+ListBook.state.major);


  return {

    books: Books.find({}).fetch(),
    notes: Notes.find({}).fetch(),
    majors: Books.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),

  };
})(ListBook);
