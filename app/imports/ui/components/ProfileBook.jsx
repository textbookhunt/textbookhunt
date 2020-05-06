import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileBook extends React.Component {
  render() {
    return (

        <Card>
          <Image src= {this.props.book.image} height = {400}/>
          <Card.Content>
            {this.props.book.owner} <br/>
            {this.props.book.name}
          </Card.Content>
        </Card>

    );
  }
}

/** Require a document to be passed to this component. */
ProfileBook.propTypes = {
  book: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ProfileBook);
