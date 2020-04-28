import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Item, Button, Segment, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileBox extends React.Component {
  render() {
    return (
        <Container>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Image size='medium' src='/images/default_image.png'/>

                <Item.Content>
                  {this.props.currentUser === '' ? (<Button floated='right'><Icon name='lock'/></Button>) : (
                      <Button floated='right'><Icon name='left chevron'/>Edit</Button>
                  )
                  }
                  <Item.Header as='a'>{this.props.userInfo.firstName} {this.props.userInfo.lastName}</Item.Header>
                  <Item.Meta>{this.props.userInfo.user}</Item.Meta>
                  <Item.Meta>{this.props.userInfo.number}</Item.Meta>
                  <Item.Description>
                    {this.props.userInfo.description}
                  </Item.Description>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Container>
    );
  }
}

/** Require a document to be passed to this component. */
ProfileBox.propTypes = {
  userInfo: PropTypes.object.isRequired,
  currentUser: PropTypes.string,
};

const ProfileBoxTracker = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user.username : '',
}));

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ProfileBoxTracker);
