import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { withRouter } from 'next/router';
import Link from 'next/link';

import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

import Layout from '../../components/MyLayout.js';
import TestForm from '../../forms/testForm';
import Slider from "react-slick";

// import i18n from '../../services/decorators/i18n';

import './style.sass';
import { Typography } from '@material-ui/core';

const mapStateToProps = ({ localization: { lang } }) => ({ lang });
// @i18n()
// @withRouter
@connect(mapStateToProps)
export default class About extends Component {
  handleChange = event => {
    this.props.dispatch({
      type: 'CHANGE_LANGUAGE',
      lang: event.target.value
    });
    Cookies.set('lang', event.target.value);
    // window.location.reload();
  };

  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      // <Layout>
      <Typography>
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </Typography>
    );
  }
}
