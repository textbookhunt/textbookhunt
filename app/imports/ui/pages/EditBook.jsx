import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import {
  AutoForm,
  ErrorsField,
  LongTextField,
  NumField,
  SelectField,
  SubmitField,
  TextField,
} from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Books, BookSchema } from '../../api/book/Book';

/** Renders the Page for editing a single document. */
class EditBook extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, price, description, image, owner, condition, _id, major } = data;
    Books.update(_id, { $set: { name, price, description, image, owner, major, condition } }, (error) =>{
      if(error){
        swal('Error', error.message, 'error');
      }
      else{
        swal('Success', 'Book updated successfully', 'success');
        this.props.history.push('/list', { some: 'state' })
      }
    })
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Book Information</Header>
            <AutoForm schema={BookSchema} onSubmit={data => { if (window.confirm('Are you sure you wish to save your changes?')) this.submit(data); } } model={this.props.doc}>
              <Segment>
                <TextField name='name'/>
                <TextField name = 'major'/>
                <NumField name='price' decimal={true}/>
                <TextField name = 'image'/>
                <SelectField name='condition'/>
                <LongTextField name = 'description'/>
                <SubmitField value='Update Information'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditBook.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Book');
  return {
    doc: Books.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditBook);
