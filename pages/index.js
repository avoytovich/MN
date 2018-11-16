import React from 'react';
import Link from 'next/link';
import NoSSR from 'react-no-ssr';
import { Button, Grid } from '@material-ui/core';
import CWAG_Logo from '../static/png/CWAG_Logo.png';
import HUB_Logo from '../static/jpg/hub-logo.jpg';
import PDZ_Logo from '../static/gif/phideltatheta.gif';
import Left_Phone from '../static/png/landing-left-mobile.png';
import Right_Phone from '../static/png/landing-right-mobile.png';
import PlaceIcon from '@material-ui/icons/Place';
import MailIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';

import { Player, BigPlayButton } from 'video-react';
import Video from '../static/mp4/long_video.mp4';
import './style.scss';
import 'video-react/styles/scss/video-react.scss';

import SignInModal from '../components/landing/signInModal';
import SignUpModal from '../components/landing/signUpModal';
import withModal from '../services/decorators/withModal';

@withModal(SignInModal)
class SigInBtn extends React.Component {
  render() {
    const { open } = this.props;
    return (
      <p className="landing-auth-btn" onClick={() => open(true)}>
        Sign In
      </p>
    );
  }
}

@withModal(SignUpModal)
class SignUpBtn extends React.Component {
  render() {
    const { open } = this.props;
    return (
      <p className="landing-auth-btn" onClick={() => open(true)}>
        Sign Up
      </p>
    );
  }
}

export default class App extends React.Component {
  render() {
    const { open } = this.props;
    return (
      <div className="landing-container">
        <Grid className="landing-header" container justify="space-between">
          <Grid item>
            <Grid container>
              <div className="landing-logo" />
              <h1 className="landing-logo-title">MetKnow</h1>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container wrap="nowrap">
              <SigInBtn />
              <SignUpBtn />
                <p className="landing-auth-btn">Create Group</p>
              </Grid>
          </Grid>
        </Grid>
        <Grid className="landing-top-container">
          <div className="landing-wrapper">
            <h1 className="landing-top-title">
              Build a stronger community in your organization
            </h1>
            <Grid container className="landing-top-btns-container">
              <Button className="landing-white-btn">Learn More</Button>
              <Button className="landing-green-btn">
                Contact Us For a Demo
              </Button>
            </Grid>
          </div>
        </Grid>
        <Grid className="landing-introducing-container">
          <Grid className="landing-introducing-dots-container">
            <div className="landing-wrapper">
              <h1 className="landing-title">Introducing</h1>
            </div>
          </Grid>

          <div className="landing-wrapper">
            <Grid container wrap="nowrap" className="landing-introducing-top">
              <img className="landing-introducing-left-img" src={Left_Phone} />
              <h1 className="landing-description">
                The easiest way for everyone to get to know each other
              </h1>
            </Grid>
            <Grid
              container
              wrap="nowrap"
              className="landing-introducing-bottom">
              <Grid>
                <Grid container direction="column">
                  <h1 className="landing-description">
                    With our gamified process, the members of your organizations
                    now have a tool in their pocket to learn everyone’s name.
                  </h1>
                  <Button className="landing-green-btn">Request a demo</Button>
                </Grid>
              </Grid>
              <img
                className="landing-introducing-right-img"
                src={Right_Phone}
              />
            </Grid>
          </div>
        </Grid>
        <Grid className="landing-video-container">
          <Grid className="landing-video-dots-container">
            <div className="landing-wrapper">
              <h1 className="landing-title">Video</h1>
            </div>
          </Grid>
          <div className="landing-video">
            <Player src={Video} fluid={false} height={465}>
              <BigPlayButton position="center" />
            </Player>
          </div>
        </Grid>

        <Grid className="landing-advantages-container">
          <Grid className="landing-advantage">
            <h3 className="landing-advantage-title">70%</h3>
            <p className="landing-advantage-description">
              of US Workers are not engaged at work
            </p>
          </Grid>
          <Grid className="landing-advantage">
            <h3 className="landing-advantage-title">87%</h3>
            <p className="landing-advantage-description">
              of engaged employees are less likely to leave their jobs
            </p>
          </Grid>
          <Grid className="landing-advantage">
            <h3 className="landing-advantage-title">2/3</h3>
            <p className="landing-advantage-description">
              Two of the top three reasons someone leaves an organizationis
              because they feel like they do not have a relationship with their
              boss or their co-workers.{' '}
            </p>
          </Grid>
          <Grid className="landing-advantage">
            <h3 className="landing-advantage-title">2.5x</h3>
            <p className="landing-advantage-description">
              Organizations with highly engaged employees have 2.5X the revenue
              than their competitors who do not.
            </p>
          </Grid>
          <Grid className="landing-advantage">
            <h3 className="landing-advantage-title">53%</h3>
            <p className="landing-advantage-description">
              53% of HR professionals say employee engagement rises when
              onboarding is improved
            </p>
          </Grid>
        </Grid>

        <Grid className="landing-responses-container">
          <div className="landing-responses-circle" />
          <div className="landing-wrapper">
            <h1 className="landing-responses-title">What our Clients say</h1>
            <div className="landing-responses-wrapper">
              <div className="landing-response">
                <p className="landing-response-title">
                  MetKnow helped all of our employees learn about each other
                  when we merged offices. It made our first week in the new
                  office run much more smoothly
                </p>
                <Grid container>
                  <h3 className="landing-response-author">
                    Paula A. Hub MidAmerica
                  </h3>
                  <img src={HUB_Logo} className="landing-response-icon" />
                </Grid>
                <div className="landing-response-triangle" />
              </div>
              <div className="landing-response">
                <p className="landing-response-title">
                  Our organization depends on attendees being able to identify
                  and connect with the other attendees important to their
                  agenda. MetKnow solved this problem in Sun Valley.”
                </p>
                <Grid container>
                  <h3 className="landing-response-author">Karen W. CWAG</h3>
                  <img src={CWAG_Logo} className="landing-response-icon" />
                </Grid>
                <div className="landing-response-triangle" />
              </div>
              <div className="landing-response">
                <p className="landing-response-title">
                  With MetKnow my organizations new members were integrated
                  seamlessly into the flow of things. Strong relationships have
                  helped us become a very efficient team.”{' '}
                </p>
                <Grid container>
                  <h3 className="landing-response-author">
                    Andrew N. Phi Delta Theta
                  </h3>
                  <img src={PDZ_Logo} className="landing-response-icon" />
                </Grid>
                <div className="landing-response-triangle" />
              </div>
            </div>
          </div>
        </Grid>

        <Grid className="landing-contact-us-container">
          <div className="landing-wrapper">
            <h1 className="landing-contact-us-title">MetKnow</h1>
            <p className="landing-contact-us-text">
              Interested in signing your organization up? Contact us.
            </p>
            <div className="landing-contact-us-wrapper">
              <div className="landing-contact-us-item">
                <PlaceIcon className="landing-contact-us-item-icon" />
                <p className="landing-contact-us-item-text">
                  202 Bicknell Ave, Ground Floor Santa Monica CA 90405
                </p>
              </div>
              <div className="landing-contact-us-item">
                <MailIcon className="landing-contact-us-item-icon" />
                <p className="landing-contact-us-item-text">
                  support@metknow.com
                </p>
              </div>
              <div className="landing-contact-us-item">
                <PhoneIcon className="landing-contact-us-item-icon" />
                <p className="landing-contact-us-item-text">
                  +(965)463-7382
                </p>
              </div>
            </div>
          </div>
        </Grid>

        <Grid className="landing-footer-container">
          <Grid container>
            <a href="#" className="landing-footer-link">
              Privacy Policy
            </a>
            <a href="#" className="landing-footer-link">
              Terms of use
            </a>
            <p className="landing-footer-copyright">© 2018 MetKnow</p>
          </Grid>
        </Grid>
      </div>
    );
  }
}
