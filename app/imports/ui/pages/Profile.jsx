import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profile';
import ProfileList from '../components/ProfileList';
/** Renders a table containing all of the Book documents. Use <BookItem> to render each row. */
class Profile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">User Profile</Header>
          <Card.Group centered>
            {this.props.profile.map((profile) => <ProfileList key={profile._id} profile={profile} />)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Book documents in the props. */
Profile.propTypes = {
  profile: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Book documents.
  const subscription = Meteor.subscribe('Profile');
  return {
    profile: Profiles.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Profile);
