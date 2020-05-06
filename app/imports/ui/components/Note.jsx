import React from 'react';
import { Button, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { Notes } from '../../api/notes/Notes';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Note extends React.Component {
  removeNote(ID) {
    Notes.remove(ID);
  }

  render() {
    return (
        <Feed.Event style={{ padding: '2em' }}>
          <Feed.Content>
            <Feed.Date content={this.props.note.date.toLocaleDateString('en-US')} />
            <Feed.Summary as={NavLink} exact to={`/Profile/${this.props.note.ownerId}`}>
              { this.props.note.owner } wants to buy this!
            </Feed.Summary>
            <Feed.Extra>
              {this.props.note.note}
            </Feed.Extra>
            { this.props.note.owner === this.props.currentUser ? (
                <Button onClick={() => this.removeNote(this.props.note._id)} color='red'>
                  Delete
                </Button>
            ) : ''}
          </Feed.Content>
        </Feed.Event>
    );
  }
}

/** Require a document to be passed to this component. */
Note.propTypes = {
  note: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Note);
