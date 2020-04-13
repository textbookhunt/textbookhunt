import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class BookItem extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.book.name}</Table.Cell>
          <Table.Cell>{this.props.book.image}</Table.Cell>
          <Table.Cell>{this.props.book.price}</Table.Cell>
          <Table.Cell>{this.props.book.quantity}</Table.Cell>
          <Table.Cell>{this.props.book.condition}</Table.Cell>
          <Table.Cell>{this.props.book.description}</Table.Cell>
          <Table.Cell>
            <Link to={`/edit/${this.props.book._id}`}>Edit</Link>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
BookItem.propTypes = {
  book: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(BookItem);
