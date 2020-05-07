import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Item, Header, Loader, Button, Segment, Divider, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserInfo } from '../../api/userinfo/UserInfo';
import { Books } from '../../api/book/Book';
import ProfileBookItem from '../components/ProfileBookItem';

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
          <Segment>
            <Item.Group>
              <Item>
                <Item.Image size='medium' src={this.props.userInfo.image} onError={(i) => i.target.src='/images/default_image.png'}/>

                <Item.Content>
                  {this.props.currentUser === '' ? (<Button floated='right'><Icon name='lock'/></Button>) : (
                      <Button as={NavLink} exact to={`/editProfile/${this.props.currentId}`} floated='right'><Icon name='left chevron'/>Edit</Button>
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
          <Divider horizontal style={{ padding: 50 }}>
            <Header as='h2'>Listings</Header>
          </Divider>
          <Item.Group divided>
            {this.props.books.map((book, index) => <ProfileBookItem key={index} book={book}/>)}
          </Item.Group>
        </Container>
    );
  }
}

/** Require an array of Book documents in the props. */
Profile.propTypes = {
  userInfo: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
  currentId: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  const userAccount = Meteor.users.findOne(match.params._id);
  const userName = userAccount ? userAccount.username : '';
  const subscription = Meteor.subscribe('UserInfo');
  const subscription2 = Meteor.subscribe('AllBook');
  return {
    userInfo: UserInfo.findOne({ user: userName }) ? UserInfo.findOne({ user: userName }) : {},
    books: Books.find({ owner: userName }).fetch(),
    ready: subscription.ready() && subscription2.ready(),
    currentUser: Meteor.user() ? Meteor.user().username : '',
    currentId: match.params._id,
  };
})(Profile);
