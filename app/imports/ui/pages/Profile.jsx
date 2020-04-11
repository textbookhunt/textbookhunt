import React from 'react';
import { Container, Item, Button, Segment, Icon, Divider, Header } from 'semantic-ui-react';
// import swal from 'sweetalert';
// import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms

/** Renders the Page for adding a document. */
class Profile extends React.Component {
  render() {
    return (
        <Container>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Image size='medium' src='/images/default_image.png'/>

                <Item.Content>
                  <Button floated='right'><Icon name='left chevron'/>Edit</Button>
                  <Item.Header as='a'>firstName lastName</Item.Header>
                  <Item.Meta>email@email.com</Item.Meta>
                  <Item.Meta>Phone Number</Item.Meta>
                  <Item.Description>
                    user description Description
                  </Item.Description>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>

            <Divider horizontal style={{ padding: 50 }}>
              <Header as='h2'>Listings</Header>
            </Divider>
            <Item.Group divided>
            <Item>
              <Item.Image size='tiny' src='/images/default_image.png'/>

              <Item.Content>
                <Item.Header as='a'>Header</Item.Header>
                <Item.Meta>Description</Item.Meta>
                <Item.Description>
                  dESCRIPTION
                </Item.Description>
                <Item.Extra>Additional Details</Item.Extra>
              </Item.Content>
            </Item>

              <Item>
                <Item.Image size='tiny' src='/images/default_image.png'/>

                <Item.Content>
                  <Item.Header as='a'>Header</Item.Header>
                  <Item.Meta>Description</Item.Meta>
                  <Item.Description>
                    dESCRIPTION
                  </Item.Description>
                  <Item.Extra>Additional Details</Item.Extra>
                </Item.Content>
              </Item>
              </Item.Group>
        </Container>
    );
  }
}

export default Profile;
