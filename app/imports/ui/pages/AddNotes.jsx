import React from 'react';
import { Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import PropTypes from 'prop-types';
import { Notes, NoteSchema } from '../../api/notes/Notes';


/** Renders the Page for adding a document. */
class AddNotes extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { note, contactId, date } = data;
    const owner = Meteor.user().username;
    Notes.insert({ note, contactId, date, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
            <AutoForm ref={ref => { fRef = ref; }} schema={NoteSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField label="Add a timestamped note" name='note'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' value={this.props.owner}/>
                <HiddenField name='contactId' value={this.props.contactId}/>
                <HiddenField name='createdAt' value={new Date()}/>
              </Segment>
            </AutoForm>
    );
  }
}
AddNotes.propTypes = {
  owner: PropTypes.string.isRequired,
  contactId: PropTypes.string.isRequired,
};

export default AddNotes;
