import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class BookItemAdmin extends React.Component {
  render() {
    return (
        <Card>
          <Image src= {this.props.book.image} />
          <Card.Content>
            <Card.Header>{this.props.book.name}</Card.Header>
            <Card.Meta>
              {this.props.book.price}
            </Card.Meta>
            <Card.Description>
              {this.props.book.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              {this.props.book.condition}
              <Link to={`/edit/${this.props.book._id}`}>Edit</Link>
            </a>
          </Card.Content>
        </Card>
    );
  }
}
/** Require a document to be passed to this component. */
BookItemAdmin.propTypes = {
  book: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(BookItemAdmin);
