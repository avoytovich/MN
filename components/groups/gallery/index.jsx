import React, { PureComponent } from 'react';
import { Card, CardMedia, withStyles } from '@material-ui/core';

import './gallery.scss';

const styles = theme => ({
  card: {
    maxWidth: 345,
    margin: '0 30px'
  },
  media: {
    height: 200,
    width: 160
  }
});

@withStyles(styles)
export default class Gallery extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div className="d-flex f-row gallery">
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image="/static/png/image-member.png"
          />
        </Card>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image="/static/png/image-member.png"
          />
        </Card>
      </div>
    );
  }
}
