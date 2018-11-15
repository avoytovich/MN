import * as React from 'react';
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme,
  Avatar,
  Grid
} from '@material-ui/core';
import * as StaticAvatar from 'static/png/image-member.png';
import * as Line from 'static/png/line.png';
import AnswerButton, { Status } from './button';

const styles = (theme:Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'calc(100vh - 300px)',
      backgroundColor: '#f3f5f7',
      alignItems: 'center',
      position: 'relative',
      paddingBottom: 20
    },
    avatar: {
      margin: 'auto auto',
      width: '100%',
      height: '100%'
    },
    line: {
      display: 'block',
      marginTop: 40,
      maxWidth: 700,
      width: '100%',
      marginBottom: 40
    },
    circleWrapper: {
      marginTop: 40,
      width: 230,
      display: 'block',
      height: 230,
      boxShadow: '-4.7px 3.8px 6px 0 rgba(105, 105, 105, 0.08)',
      padding: 10,
      borderRadius: '50%',
      backgroundColor: '#fff'
    },
    buttons: {
        maxWidth: 700,
        width: '100%'
    }
  });

interface Props extends WithStyles<typeof styles> {
  groupId: number;
}
class QuizShow extends React.Component<Props> {
  componentDidMount = () => {};

  onClickAnswer = () => {};

  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.wrapper}>
        <div className={classes.circleWrapper}>
          <Avatar className={classes.avatar} src={StaticAvatar} />
        </div>
        <img src={Line} className={classes.line} />
        <Grid spacing={24} justify="space-between" className={classes.buttons} container>
          <Grid item xs={6}>
            <AnswerButton
              title="Mike Ross"
              letter="A"
              callback={this.onClickAnswer}
              status="neutral"
            />
          </Grid>
          <Grid item xs={6} >
            <AnswerButton
              title="Darth Vader"
              letter="B"
              callback={this.onClickAnswer}
              status="neutral"
            />
          </Grid>
          <Grid item xs={6}>
            <AnswerButton
              title="Harvy Specter"
              letter="C"
              callback={this.onClickAnswer}
              status="wrong"
            />
          </Grid>
          <Grid item xs={6}>
            <AnswerButton
              title="Daniel Dowd"
              letter="D"
              callback={this.onClickAnswer}
              status="right"
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(QuizShow);
