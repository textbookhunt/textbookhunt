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
    const { note, book, owner, ownerId, date } = data;
    Notes.insert({ note, book, owner, ownerId, date },
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
                <TextField label="Buyer's Comment" name='note'/>
                <SubmitField label="Show Interest!" value='Show Interest!'/>
                <ErrorsField/>
                <HiddenField name='owner' value={this.props.owner}/>
                <HiddenField name='date' value={new Date()}/>
                <HiddenField name='book' value={this.props.book}/>
                <HiddenField name='ownerId' value={this.props.ownerId}/>
              </Segment>
            </AutoForm>
    );
  }
}
AddNotes.propTypes = {
  owner: PropTypes.string.isRequired,
  book: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
};

export default AddNotes;
