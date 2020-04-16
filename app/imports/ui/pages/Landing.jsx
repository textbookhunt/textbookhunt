import React from 'react';
import { Divider, Header, Grid, Container, Image } from 'semantic-ui-react';

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
            <Container>
            <div className='landing-text'>
              Testbook Hunt is a platform that helps provide students with an easy way to buy and sell textbooks from
              other students.<br/><br/>
              If you are a first time user, feel free to refer to the user guide below. If not, simply sign in to your
              account and enjoy!<br/>
            </div>
            </Container>
          </div>

          <div className='yellow-landing-item'>
            <Divider horizontal style={{ padding: 50, margin: 0 }}>
              <Header as='h1'>
                Login or Create an Account
              </Header>
            </Divider>
            <Grid container relaxed divided columns='equal'>
              <Grid.Column>
                <div className='landing-text'>
                  <Image src = 'images/signin.png' size = 'massive' centered/>
                  To Sign in, click the user icon on the top right of the website. After that, enter your email and
                  password.
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className='landing-text'>
                  <Image src = 'images/register.png' size = 'massive' centered/>
                  To Sign up, click the user icon on the tip right of the website. Enter your email, password, and any
                  other needed information. Click submit and you&apos;re done!
                </div>
              </Grid.Column>
            </Grid>
          </div>

          <div className='black-landing-item'>
            <Divider horizontal style={{ padding: 50, margin: 0 }}>
              <Header as='h1' inverted>
                Browse Textbooks on Sale
              </Header>
            </Divider>
            <Image src = 'images/bookpost.png' size = 'massive' centered/>
            <Container>
            <div className='landing-text'>
              To browse textbook listings, first sign in. Then click the "view listings" tab on the nav bar. From here
              you can see and search for any listing you want.
            </div>
            </Container>
          </div>

          <div className='yellow-landing-item'>
            <Divider horizontal style={{ padding: 50, margin: 0 }}>
              <Header as='h1'>
                Sell Your Textbooks
              </Header>
            </Divider>
            <Container>
              <Image src = 'images/postimage.png' size = 'massive' centered/>
              <div className='landing-text'>
                To start selling textbooks, first sign in. Then, click on the post listing tab on the navigation bar.
                Fill out the required information and click submit. Your textbook should not be visible to anyone
                looking
                to buy.
              </div>
            </Container>
          </div>
        </div>
    );
  }
}

export default Landing;
