import React from 'react';
import { Divider, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div>
          <div className='landing-header-background'/>
          <div className='landing-bg-text'>TextBook Hunt</div>
          <Divider horizontal style={{ padding: 50 }}>
            <Header as='h1'>
              Welcome to Textbook Hunt!
            </Header>
          </Divider>
          <Divider horizontal style={{ padding: 50 }}>
            <Header as='h1'>
              Login or Create an Account
            </Header>
          </Divider>
          <Divider horizontal style={{ padding: 50 }}>
            <Header as='h1'>
              Browse Textbooks on Sale
            </Header>
          </Divider>
          <Divider horizontal style={{ padding: 50 }}>
            <Header as='h1'>
              Sell Your Textbooks
            </Header>
          </Divider>
        </div>
    );
  }
}

export default Landing;
