import React, { PureComponent, Fragment } from 'react';
import {
  Card,
  CardMedia,
  withStyles,
  Typography,
  Slide
} from '@material-ui/core';
import Slider from 'react-slick';

import './gallery.sass';

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

function NextArrow(props) {
  const { className, style, onClick } = props;
  console.log(props);
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

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  variableWidth: true,
  slidesToShow: 2,
  nextArrow: <NextArrow />,
  prevArrow: null
};

@withStyles(styles)
export default class Gallery extends PureComponent {
  state = {
    cardsAmount: 0
  };
  render() {
    const { classes, images } = this.props;

    return (
      <div style={{ width: 'calc(100% - 440px)' }}>
        <Slider {...settings}>
          {images.map((image, key) => (
            <Card key={key} className={classes.card}>
              <CardMedia className={classes.media} image={image.mediumImage}>
                <Typography className={classes.mediaText}>
                  {image.firstName}
                </Typography>
              </CardMedia>
            </Card>
          ))}
        </Slider>
      </div>
    );
  }
}
