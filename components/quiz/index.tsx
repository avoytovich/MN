import * as React from 'react';
import {
  withStyles,
  WithStyles,
  CircularProgress,
  Avatar,
  Grid
} from '@material-ui/core';
import * as Line from 'static/png/line.png';
import AnswerButton, { Status } from './button';
import styles from './styles';
import { loadQuiz, moveOnQuiz, sendResults } from 'actions/groups';
import { connect } from 'react-redux';
import { updateSpecData, resetData } from 'actions/updateData';
import get from 'lodash/get';
import map from 'lodash/map';
import Finished, { Recommendation } from './finished';

interface WrongAnswer {
  answer: string,
  rightAnswer: string
}

class QuizShow extends React.Component<Props> {
  wrong: number = 0;
  recommendations: Recommendation[] = [];
  wrongAnswers: WrongAnswer[] = [];

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
      this.wrong++;
      this.recommendations.push({
        id: quiz.memberId as number,
        name: quiz.variants[quiz.answerIndex],
        image: quiz.imageUrl
      })
    }
    this.props.updateSpecData('wrongCorrect', newState);
    setTimeout(() => {
      this.props.resetData('wrongCorrect');
      this.props.moveOnQuiz();
    }, 1500)
  };
  
  componentWillUnmount = () => {
    this.props.resetData('currentQuiz');
  }

  componentDidUpdate = async (prevProps: Props) => {
    if (this.props.isFinished === true) {
      // TODO: Send results when the back is working
      // await this.props.sendResults({
      //   questionsNumber: this.props.total,
      //   numberOfRightAnswers: this.props.total - this.wrong,
      //   createdAt: new Date(),
      //   groupId: this.props.groupId,
      //   userId: localStorage.user.id,
      // });
    }
  }

  handleTryAgain = async() => {
    this.wrong = 0;
    this.recommendations = [];
    this.wrongAnswers = [];
    const data = await this.props.loadQuiz({ groupId: this.props.groupId });
    this.props.updateSpecData('currentQuiz', {
      current: 0,
      total: data.data.length
    });
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
      inner = <Finished
        onTryAgain={this.handleTryAgain}
        correct={this.props.total - this.wrong}
        total={this.props.total}
        recommended={this.recommendations}
      />;
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
                const disabled = !!this.props.wrong || !!this.props.correct;
                console.log(this.props.wrong,this.props.correct);
                return (<Grid key={key + 'question'} item xs={6}>
                  <AnswerButton
                    disabled={disabled}
                    title={variant}
                    letter={String.fromCharCode(65 + key)}
                    callback={this.onClickAnswer(key)}
                    status={status}
                    isWrong={this.props.wrong !== this.props.correct && this.props.wrong >= 0 && this.props.wrong !== key}
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
  if (!quizData || currentNumber === undefined)
    return {
      loading: true
    }

  if (currentNumber >= map(quizData).length)
    return {
      isFinished: true,
      total: map(quizData).length
    }
  const correct = get(runtime, 'wrongCorrectData.correct');
  const wrong = get(runtime, 'wrongCorrectData.wrong');
  let current = map(quizData)[currentNumber];
  const variants = get(current, 'variants') !== undefined ? map(current.variants) : [];
  
  return {
    correct,
    wrong,
    current,
    variants,
  };
};

interface Props extends WithStyles<typeof styles> {
  groupId: number
  total: number
  loadQuiz: Function
  current: any
  variants: [any]
  isFinished: boolean
  loading: boolean
  correct: number
  wrong: number
  resetData: Function
  sendResults: Function
  updateSpecData: Function
  moveOnQuiz: Function
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
