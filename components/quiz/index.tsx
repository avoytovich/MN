import * as React from 'react';
import {
  withStyles,
  WithStyles,
  createStyles,
  CircularProgress,
  Typography,
  Theme,
  Avatar,
  Grid
} from '@material-ui/core';
import * as StaticAvatar from 'static/png/image-member.png';
import * as Line from 'static/png/line.png';
import AnswerButton, { Status } from './button';
import styles from './styles';
import { loadQuiz, moveOnQuiz, sendResults } from 'actions/groups';
import { connect } from 'react-redux';
import { updateSpecData, resetData } from 'actions/updateData';
import get from 'lodash/get';
import map from 'lodash/map';
import { number } from 'prop-types';
import { bindActionCreators, Dispatch } from 'redux';
import { UPDATE_SPEC_DATA } from 'constants/actions';

class QuizShow extends React.Component<Props> {
  componentDidMount = async () => {
    const data = await this.props.loadQuiz({ groupId: this.props.groupId });
    this.props.updateSpecData('currentQuiz', {
      current: 0,
      total: data.data.length
    });
  };

  onClickAnswer = (key: number) => () => {
    const quiz = this.props.current;
    const newState = {
      correct: quiz.answerIndex,
      wrong: -1
    }
    if (quiz.answerIndex !== key) {
      newState.wrong = key;
    }
    this.props.updateSpecData('wrongCorrect', newState);
    setTimeout(() => {
      this.props.resetData('wrongCorrect');
      this.props.moveOnQuiz();
    }, 1000)
  };
  componentWillUnmount = () => {
    this.props.resetData('currentQuiz');
  }

  componentDidUpdate = async(prevProps: Props) => {
    if(this.props.isFinished === true)
    {
      // await  
    }
  }

  render() {
    const { classes } = this.props;
    let inner = null;

    if (this.props.loading)
      inner = <CircularProgress
        style={{
          color: '#224483',
          margin: 'auto auto'
        }}
      />
    else if (this.props.isFinished)
      inner = <Typography style={{
        margin: 'auto auto',
        position: 'relative'
      }}>Quiz Finished</Typography>;
    else
      inner = (
        <React.Fragment>
          <div className={classes.circleWrapper}>
            <Avatar className={classes.avatar} src={this.props.current.imageUrl} />
          </div>
          <img src={Line} className={classes.line} />
          <Grid
            spacing={24}
            justify="space-between"
            className={classes.buttons}
            container>
            {
              this.props.variants.map((variant, key) => {
                let status: Status = 'neutral';
                if (this.props.correct === key)
                  status = 'right'
                else if (this.props.wrong === key)
                  status = 'wrong';
                const disabled = this.props.wrong || this.props.correct;
                return (<Grid key={key + 'question'} item xs={6}>
                  <AnswerButton
                    disabled={disabled}
                    title={variant}
                    letter={String.fromCharCode(65 + key)}
                    callback={this.onClickAnswer(key)}
                    status={status}
                  />
                </Grid>)
              }
              )
            }
          </Grid>
        </React.Fragment>
      );

    return (
      <div className={classes.wrapper}>
        {inner}
      </div>
    );
  }
}

const mapStateToProps = ({ runtime }) => {
  const quizData = get(runtime, 'quizData');
  const currentNumber = get(runtime, 'currentQuizData.current');
  if(!quizData || currentNumber === undefined)
    return {
     loading: true 
    }

  if(currentNumber >= map(quizData).length)
    return {
      isFinished: true
    }
    const correct = get(runtime, 'wrongCorrectData.correct');
    const wrong = get(runtime, 'wrongCorrectData.wrong');
    let current = map(quizData)[currentNumber];
    const variants = get(current, 'variants') !== undefined ? map(current.variants) : [];
    return {
      correct,
      wrong,
      current,
      variants
    };
};

interface Props extends WithStyles<typeof styles> {
  groupId: number;
  loadQuiz: Function;
  current: any;
  variants: [any];
  updateSpecData: Function;
  moveOnQuiz: Function,
  isFinished: boolean,
  loading: boolean, 
  correct: number,
  wrong: number,
  resetData: Function,
  sendResults: Function
}


export default connect(
  mapStateToProps,
  {
    resetData,
    loadQuiz,
    moveOnQuiz,
    updateSpecData,
    sendResults
  }
)(withStyles(styles)(QuizShow));
