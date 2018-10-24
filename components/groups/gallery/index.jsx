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
    position: 'relative'
  },
  mediaText: {
    position: 'relative',
    color: '#efefef',
    fontWeight: 600,
    top: 177,
    left: 42,
    fontSize: 13
  }
});

// function PrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       // className={className}
//       // style={{
//       //   ...style,
//       //   display: 'block',
//       //   backgroundImage: "url('/static/svg/right-arrow.svg')",
//       //   backgroundSize: 'cover',
//       //   width: 22,
//       //   height: 31,
//       //   transform: 'rotate(180deg)'
//       // }}
//       // onClick={onClick}
//     />
//   );
// }

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
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
  infinite: true,
  speed: 500,
  variableWidth: true,
  slidesToShow: 1,
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
              <CardMedia className={classes.media} image={image}>
                <Typography className={classes.mediaText}>
                  Darth Vader
                </Typography>
              </CardMedia>
            </Card>
          ))}
        </Slider>
      </div>
    );
  }
}
