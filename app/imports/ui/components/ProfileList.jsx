import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Card, Feed } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserInfo } from '../../api/userinfo/UserInfo';
import { Books } from '../../api/book/Book';
import ProfileBook from '../components/ProfileBook';

/** Renders a table containing all of the Book documents. Use <BookItem> to render each row. */
class ProfileList extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Card.Content>
          <Feed>
            {this.props.books.map((book, index) => <ProfileBook key={index} book={book}/>)}
          </Feed>
        </Card.Content>
    );
  }
}

/** Require an array of Book documents in the props. */
ProfileList.propTypes = {
  books: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
  currentId: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  const userName = userAccount ? userAccount.username : '';
  const subscription = Meteor.subscribe('AllBook');
  return {
    userInfo: UserInfo.findOne({ user: userName }) ? UserInfo.findOne({ user: userName }) : {},
    books: Books.find({}).fetch(),
    ready: subscription.ready(),
    currentUser: Meteor.user() ? Meteor.user().username : '',
    currentId: match.params._id,
  };
})(ProfileList);
