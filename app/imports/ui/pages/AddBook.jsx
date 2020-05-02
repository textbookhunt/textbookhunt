import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Books, BookSchema } from '../../api/book/Book';

/** Renders the Page for adding a document. */
class AddBook extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { owner, name, price, description, condition, image, major } = data;
    Books.insert({ owner, name, price, description, condition, image, major },
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
    const currentUser = Meteor.user() ? Meteor.user().username : '';
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Sell Textbook</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={BookSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField className='disabled field' value={`${currentUser}`} name='owner'/>
                <TextField name='name'/>
                <NumField name='price' decimal={true}/>
                <TextField name = 'major'/>
                <TextField name = 'image'/>
                <SelectField name='condition'/>
                <LongTextField name = 'description'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <TextField class='disabled field' name='owner'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddBook;
