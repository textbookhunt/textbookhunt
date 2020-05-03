import React from 'react';
import { Card, Image, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Notes } from '../../api/notes/Notes';
/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class BookItem extends React.Component {
  render() {
    return (
        <Card>
          <Image src= {this.props.book.image} height = {400}/>
          <Card.Content>
            <Card.Header><Link to={`/listing/${this.props.book._id}`}>{this.props.book.name}</Link></Card.Header>
            <Card.Meta>
              Price: {this.props.book.price} <br/>
              Condition: {this.props.book.condition}<br/>
              Major: {this.props.book.major}
            </Card.Meta>
            <Card.Description>
              {this.props.book.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Link to={`/listing/${this.props.book._id}`}>view more this Book Information</Link>
            </a>
          </Card.Content>
          <Card.Content extra>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
BookItem.propTypes = {
  book: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(BookItem);
