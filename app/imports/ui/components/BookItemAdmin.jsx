import React from 'react';
import { Card, Image, Feed, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link, NavLink } from 'react-router-dom';
import { Notes } from '../../api/notes/Notes';
import { Books } from '../../api/book/Book';
/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */

class BookItemAdmin extends React.Component {
  removeBook(docID) {
    Books.remove(docID);
  }

  render() {
    return (
        <Card>
          <Image src= {this.props.book.image} height = {400}/>
          <Card.Content>
            <Card.Header><Link to={`/listing/${this.props.book._id}`}>{this.props.book.name}</Link></Card.Header>
            <Card.Meta>
              Price: {this.props.book.price} <br/>
              Condition: {this.props.book.condition}<br/>
              Major: {this.props.book.major} <br/>
              Sold by {this.props.book.owner}
            </Card.Meta>
            <Card.Description>
              {this.props.book.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Feed>
              {this.props.notes.map((note, index) => <Notes key={index} note={note}/>)}
            </Feed>
          </Card.Content>
          <Card.Content extra>
            <Button as={NavLink} exact to='/list' floated='right'
                    onClick={() => this.removeBook(this.props.book._id)} color='red'>
              Delete
            </Button>
            <Button as={NavLink} exact to={`/editBook/${this.props.book._id}`} floated='right' color='green'>
              Edit
            </Button>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
BookItemAdmin.propTypes = {
  book: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(BookItemAdmin);
