import React from 'react';
import { Card, Item } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, NavLink, withRouter } from 'react-router-dom';
/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class BookItem extends React.Component {
  render() {
    return (
        <Item as={NavLink} exact to={`/listing/${this.props.book._id}`}>
          <Item.Image size='tiny' src={this.props.book.image}/>

          <Item.Content>
            <Item.Header as='a'>{this.props.book.name}</Item.Header>
            <Item.Meta>Description</Item.Meta>
            <Item.Description>
              {this.props.book.description}
            </Item.Description>
            <Item.Extra>
              <p>Price: {this.props.book.price}</p>
              <p>Major: {this.props.book.major}</p>
              <p>Condition: {this.props.book.condition}</p>
            </Item.Extra>
            <Item.Content extra>
              <p>
                <Link to={`/listing/${this.props.book._id}`}>view more this Book Information</Link>
              </p>
            </Item.Content>
          </Item.Content>
        </Item>
    );
  }
}

/** Require a document to be passed to this component. */
BookItem.propTypes = {
  book: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(BookItem);
