import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class BookItem extends React.Component {
  render() {
    return (
        <Card>
          <Image src= {this.props.book.image} />
          <Card.Content>
            <Card.Header>{this.props.book.name}</Card.Header>
            <Card.Meta>
              {this.props.book.price} <br/>
              {this.props.book.condition}
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
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
BookItem.propTypes = {
  book: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(BookItem);
