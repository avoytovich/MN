import React from 'react';
import Router from 'next/router';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { Button } from '@material-ui/core';
import CWAG_Logo from '../static/png/CWAG_Logo.png';
import HUB_Logo from '../static/jpg/hub-logo.jpg';
import PDZ_Logo from '../static/gif/phideltatheta.gif';
import Left_Phone from '../static/png/landing-left-mobile.png';
import Right_Phone from '../static/png/landing-right-mobile.png';
import PlaceIcon from '@material-ui/icons/Place';
import MailIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';

import { IconButton, Menu, MenuItem, Badge } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { isNewUser } from "../services/accountService";
import { Player, BigPlayButton } from 'video-react';
import Video from '../static/mp4/long_video.mp4';
import './style.sass';
import 'video-react/styles/scss/video-react.scss';

import {changeQuery} from "../services/serverService";
import { getNewQuestions } from '../actions/questions';
import { getLocale } from 'services/serverService';

@withRouter
export default class App extends React.Component {
  state = {
    anchorEl: null,
    isAuthed: false,
    isNewUser: false,
  };

  handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  componentDidMount(){
    this.setState({
      isAuthed: !!getLocale('token'),
      isNewUser: isNewUser(),
    })
  }

  render() {
    const { anchorEl, isAuthed, isNewUser } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className="landing-container">
        <div className="landing-header" >
          <div className="landing-logo-container" >
              <div className="landing-logo" />
              <h1 className="landing-logo-title">MetKnow</h1>
          </div>
          <div className="landing-auth-container" >
            <IconButton
              aria-label="More"
              aria-owns={open ? 'landing-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              className="landing-menu"
            >
              <MenuIcon
                className="landing-hamburger"
              />
            </IconButton>
            <Menu
              id="landing-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
              PaperProps={{
                style: {
                  width: 110
                }
              }}
            >
              {isAuthed && !isNewUser
                ? (
                  <Link href={{ pathname: '/manage-groups'}}>
                  <MenuItem onClick={this.handleClose}>
                    Groups
                  </MenuItem>
                  </Link>
                )
                : (
                  <>
                    <MenuItem onClick={() => (Router.pushRoute(changeQuery(this.props.router, 'modal', 'signIn')))}>
                      Sign In
                    </MenuItem>
                    <MenuItem onClick={() => (Router.pushRoute(changeQuery(this.props.router, 'modal', 'signUp')))}>
                      Sign Up
                    </MenuItem>
                  </>

                )

              }

            </Menu>

            {isAuthed && !isNewUser
                  ? (
                <Link href={{ pathname: '/manage-groups'}}>
                  <p
                    className="landing-auth-btn"
                    onClick={() => (Router.pushRoute(changeQuery(this.props.router, 'modal', 'signIn')))}
                  >
                    Groups
                  </p>
                </Link>
                )
                : (
                  <>
                    <p
                      className="landing-auth-btn"
                      onClick={() => (Router.pushRoute(changeQuery(this.props.router, 'modal', 'signIn')))}
                    >
                      Sign In
                    </p>
                    <p
                      className="landing-auth-btn"
                      onClick={() => (Router.pushRoute(changeQuery(this.props.router, 'modal', 'signUp')))}
                    >
                      Sign Up
                    </p>
                  </>

                )

            }
          </div>
        </div>
        <div className="landing-top-container">
          <div className="landing-wrapper">
            <h1 className="landing-top-title">
              Build a stronger community in your organization
            </h1>
            <div className="landing-top-btns-container">
              <Button className="landing-white-btn" href="#video">
                Learn More
              </Button>
              <Button className="landing-green-btn" href="#landing-contact-us">
                Contact Us For a Demo
              </Button>
            </div>
          </div>
        </div>
        <div className="landing-introducing-container">
          <div className="landing-introducing-dots-container">
            <div className="landing-wrapper">
              <h1 className="landing-title">Introducing</h1>
            </div>
          </div>
          <div className="landing-wrapper">
            <div className="landing-introducing-top">
              <img className="landing-introducing-left-img" src={Left_Phone} />
              <h1 className="landing-description">
                The easiest way for everyone to get to know each other
              </h1>
            </div>
            <div className="landing-introducing-bottom">
              <div className="landing-introducing-bottom-text-container">
                  <h1 className="landing-description">
                    With our gamified process, the members of your organizations
                    now have a tool in their pocket to learn everyone’s name.
                  </h1>
                  <Button className="landing-green-btn">Request a demo</Button>
              </div>
              <img
                className="landing-introducing-right-img"
                src={Right_Phone}
              />
            </div>
          </div>
        </div>
        <div id="video" className="landing-video-container">
          <div className="landing-video-dots-container">
            <div className="landing-wrapper">
              <h1 className="landing-title">Video</h1>
            </div>
          </div>
          <div className="landing-video">
            <Player src={Video} fluid={false} height={465}>
              <BigPlayButton position="center" />
            </Player>
          </div>
        </div>
        <br />
        <div className="landing-advantages-container">
          <div className="landing-advantage">
            <h3 className="landing-advantage-title">70%</h3>
            <p className="landing-advantage-description">
              of US Workers are not engaged at work
            </p>
          </div>
          <div className="landing-advantage">
            <h3 className="landing-advantage-title">87%</h3>
            <p className="landing-advantage-description">
              of engaged employees are less likely to leave their jobs
            </p>
          </div>
          <div className="landing-advantage">
            <h3 className="landing-advantage-title">2/3</h3>
            <p className="landing-advantage-description">
              Two of the top three reasons someone leaves an organizationis
              because they feel like they do not have a relationship with their
              boss or their co-workers.{' '}
            </p>
          </div>
          <div className="landing-advantage">
            <h3 className="landing-advantage-title">2.5x</h3>
            <p className="landing-advantage-description">
              Organizations with highly engaged employees have 2.5X the revenue
              than their competitors who do not.
            </p>
          </div>
          <div className="landing-advantage">
            <h3 className="landing-advantage-title">53%</h3>
            <p className="landing-advantage-description">
              53% of HR professionals say employee engagement rises when
              onboarding is improved
            </p>
          </div>
        </div>

        <div className="landing-responses-container">
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
                <div className="landing-response-bottom">
                  <h3 className="landing-response-author">
                    Paula A. Hub MidAmerica
                  </h3>
                  <img src={HUB_Logo} className="landing-response-icon" />
                </div>
                <div className="landing-response-triangle" />
              </div>
              <div className="landing-response">
                <p className="landing-response-title">
                  Our organization depends on attendees being able to identify
                  and connect with the other attendees important to their
                  agenda. MetKnow solved this problem in Sun Valley.”
                </p>
                <div className="landing-response-bottom">
                  <h3 className="landing-response-author">Karen W. CWAG</h3>
                  <img src={CWAG_Logo} className="landing-response-icon" />
                </div>
                <div className="landing-response-triangle" />
              </div>
              <div className="landing-response">
                <p className="landing-response-title">
                  With MetKnow my organizations new members were integrated
                  seamlessly into the flow of things. Strong relationships have
                  helped us become a very efficient team.”{' '}
                </p>
                <div className="landing-response-bottom">
                  <h3 className="landing-response-author">
                    Andrew N. Phi Delta Theta
                  </h3>
                  <img src={PDZ_Logo} className="landing-response-icon" />
                </div>
                <div className="landing-response-triangle" />
              </div>
            </div>
          </div>
        </div>

        <div id="landing-contact-us" className="landing-contact-us-container">
          <div className="landing-wrapper">
            <h1 className="landing-contact-us-title">MetKnow</h1>
            <p className="landing-contact-us-text">
              Interested in signing your organization up? Contact us.
            </p>
            <div className="landing-contact-us-wrapper">
              <a href="https://www.google.com/maps/place/202+Bicknell+Ave,+Santa+Monica,+CA+90405">
                <div className="landing-contact-us-item">
                  <PlaceIcon className="landing-contact-us-item-icon" />
                  <p className="landing-contact-us-item-text">
                    202 Bicknell Ave, Ground Floor Santa Monica CA 90405
                  </p>
                </div>
              </a>
              <a href="mailto:support@metknow.com">
                <div className="landing-contact-us-item">
                  <MailIcon className="landing-contact-us-item-icon" />
                  <p className="landing-contact-us-item-text">
                    support@metknow.com
                  </p>
                </div>
              </a>
              <a href="tel:965-463-7382">
                <div className="landing-contact-us-item">
                  <PhoneIcon className="landing-contact-us-item-icon" />
                  <p className="landing-contact-us-item-text">(872)215-1683</p>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="landing-footer-container">
          <Link href={{ pathname: '/privacy-policy'}}>
            <a className="landing-footer-link">
              Privacy Policy
            </a>
          </Link>
          <Link href={{ pathname: '/terms-of-use'}}>
            <a className="landing-footer-link">
              Terms of use
            </a>
          </Link>
          <p className="landing-footer-copyright">© 2018 MetKnow</p>
        </div>
      </div>
    );
  }
}
