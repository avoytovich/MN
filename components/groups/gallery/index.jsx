import React, { PureComponent, Fragment } from 'react';
import {
  Card,
  CardMedia,
  withStyles,
  Typography,
  Slide
} from '@material-ui/core';
import Slider from 'react-slick';
import withModal from 'services/decorators/withModal';
import { getMember } from 'actions/members';
import MemberModal from './memberModal';
import { connect } from 'react-redux';
import Router from 'next/router';
import { myRoleIs } from "../../../services/accountService";


import './gallery.sass';
import Member from 'pages/edit-member';

const cardWidth = 160;

const styles = theme => ({
  card: {},
  media: {
    height: 200,
    width: cardWidth,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  mediaText: {
    position: 'relative',
    color: '#efefef',
    fontWeight: 600,
    fontSize: 13
  }
});

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      // className={className}
      style={{
        position: 'absolute',
        top: '44%',
        right: -20,
        cursor: 'pointer',
        width: 22,
        height: 31,
        backgroundSize: 'cover',
        backgroundImage: "url('/static/svg/right-arrow.svg')"
      }}
      onClick={onClick}
     />
  );
}

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      // className={className}
      style={{
        position: 'absolute',
        top: '44%',
        left: -25,
        cursor: 'pointer',
        transform: 'rotate(180deg)',
        width: 22,
        height: 31,
        backgroundSize: 'cover',
        backgroundImage: "url('/static/svg/right-arrow.svg')"
      }}
      onClick={onClick}
     />
  );
}


const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  variableWidth: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

@withModal(MemberModal, {disableStyles: true, withCloseOutside: true})
@connect(null, {getMember})
@withStyles(styles)
export default class Gallery extends PureComponent {
  state = {
    cardsAmount: 0,
  };

  handleOpen = data => async() => {
    const { images } = this.props;
    const member = await getMember(data.memberId);
    return this.props.open(member);
  }

  render() {
    //console.log('this.state', this.state);
    //console.log('this.props', this.props);
    const { classes, images, open } = this.props;

    return (
      <div style={{ width: 'calc(100% - 440px)', marginLeft: 25 }}>
        <Slider arrows={images.length > 3}  {...settings}>
          {images.map((image, key) => (
            <Card 
            // TODO:  s
            onClick={this.handleOpen(image)}
            key={key} className={classes.card}>
              <CardMedia className={classes.media} image={image.mediumImage}>
                <Typography className={classes.mediaText}>
                  {image.firstName} {image.lastName}
                </Typography>
              </CardMedia>
            </Card>
          ))}
        </Slider>
      </div>
    );
  }
}
