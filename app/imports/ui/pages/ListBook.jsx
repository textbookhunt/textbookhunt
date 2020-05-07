import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Grid, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Books } from '../../api/book/Book';
import BookItem from '../components/BookItem';
import { Filter } from '../components/Filter';
import Search from '../components/Search';

/** Renders a table containing all of the Book documents. Use <BookItem> to render each row. */
class ListBook extends React.Component {
    filterbook;
    major;
    search;
  constructor(props) {
    super(props);
    this.state = {major: 'All Majors'}
    this.filterbook = {};
    this.major = 'All Major';
    this.search ='';
  }
  getMajor = (major) => {
    let newState;
    newState = {
     major: major
    }
    this.setState(newState);
    this.major =major;
    let fmajor = major;
    this.filterbook = _.filter(this.props.books, function(object){ return object["major"] === fmajor; });
  }
  getSearch = (search) => {
    let newState;
    newState = {
      major: 'search'
    }
    this.setState(newState);
    this.search = search;
    let lowerSearch = search.toLowerCase();
    this.filterbook = _.filter(this.props.books, function(object){ return object["name"].toLowerCase() === lowerSearch; });
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
          <Search sendSearch={this.getSearch.bind(this)}/>
          <Grid>
            <div style={{marginLeft: "20px", marginTop: "40px"}}>
          <Header>Filter: </Header>

          <br/>
          <div style={{marginLeft: "20px"}}>
          <Filter sendMajor={this.getMajor.bind(this)} majors={_.uniq(_.pluck(this.props.majors,'major'))}  />
          </div>

            </div>
            <Container style={{marginTop: "40px"}}>
            <Grid.Column width={12}>


              { this.state.major === 'All Majors' ? (
                  <Card.Group> {this.props.books.map((book, index) => <BookItem key={index}
                                                                                book={book}/>)}</Card.Group>
              ) : <Card.Group> {this.filterbook.map((book, index) => <BookItem key={index}
                                                                               book={book}/>)}</Card.Group>
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
  ready: PropTypes.bool.isRequired,


};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {

  const subscription = Meteor.subscribe('AllBook');






  return {

    books: Books.find({}).fetch(),
    majors: Books.find({}).fetch(),
    ready: subscription.ready(),

  };
})(ListBook);
