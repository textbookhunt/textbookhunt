import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileList extends React.Component {
  render() {
    return (
        <Card>
          <Image src= {this.props.profile.image} />
          <Card.Content>
            <Card.Header>{this.props.profile.firstName} {this.props.profile.lastName}</Card.Header>
            <Card.Meta>
              {this.props.profile.major} <br/>
              {this.props.profile.email}
            </Card.Meta>
            <Card.Description>
              {this.props.profile.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Link to={`/editProfile/${this.props.profile._id}`}>Edit Profile</Link>
            </a>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
ProfileList.propTypes = {
  profile: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ProfileList);
