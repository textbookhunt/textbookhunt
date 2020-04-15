import React from 'react';
import { Divider, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div>
          <div className='landing-header-background'/>
          <div className='landing-bg-text'>TextBook Hunt</div>
          <div className='black-landing-item'>
            <Divider horizontal style={{ padding: 50, margin: 0 }}>
              <Header as='h1' inverted>
                Welcome to Textbook Hunt!
              </Header>
            </Divider>
            <div className='landing-text'>DESCRPTION prijpifgjspifghsdfjgdjfhn</div>
          </div>

          <div className='yellow-landing-item'>
            <Divider horizontal style={{ padding: 50, margin: 0 }}>
              <Header as='h1'>
                Login or Create an Account
              </Header>
            </Divider>
            <div className='landing-text'>DESCRPTION prijpifgjspifghsdfjgdjfhn</div>
          </div>

          <div className='black-landing-item'>
            <Divider horizontal style={{ padding: 50, margin: 0 }}>
              <Header as='h1' inverted>
                Browse Textbooks on Sale
              </Header>
            </Divider>
            <div className='landing-text'>DESCRPTION prijpifgjspifghsdfjgdjfhn</div>
          </div>

          <div className='yellow-landing-item'>
            <Divider horizontal style={{ padding: 50, margin: 0 }}>
              <Header as='h1'>
                Sell Your Textbooks
              </Header>
            </Divider>
            <div className='landing-text'>DESCRPTION prijpifgjspifghsdfjgdjfhn</div>
          </div>
        </div>
    );
  }
}

export default Landing;
