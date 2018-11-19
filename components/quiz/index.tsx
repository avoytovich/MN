import * as React from 'react';
import {
  withStyles,
  WithStyles,
  createStyles,
  CircularProgress,
  Theme,
  Avatar,
  Grid
} from '@material-ui/core';
import * as StaticAvatar from 'static/png/image-member.png';
import * as Line from 'static/png/line.png';
import AnswerButton, { Status } from './button';
import styles from './styles';
import { loadQuiz, moveOnQuiz } from 'actions/groups';
import { connect } from 'react-redux';
import { updateSpecData } from 'actions/updateData';
import get from 'lodash/get';
import map from 'lodash/map';
import { number } from 'prop-types';
import { bindActionCreators, Dispatch } from 'redux';
import { UPDATE_SPEC_DATA } from 'constants/actions';
class QuizShow extends React.Component<Props, { loading: boolean, correct: number, wrong: number }> {
  state = {
    loading: true,
    correct: -1,
    wrong: -1
  };
  componentDidMount = async () => {
    const data = await this.props.loadQuiz({ groupId: this.props.groupId });
    this.props.updateSpecData('currentQuiz', {
      current: 1,
      total: data.data.length
    });
    this.setState({
      loading: false
    });
  };

  onClickAnswer = (key: number) => () => {
    const quiz = this.props.current;
    const newState = {
      correct: quiz.answerIndex,
      wrong: -1
    }
    if (quiz.answerIndex !== key){
      newState.wrong = key;
    }
    this.setState(() => newState);
    setTimeout(() => {
      this.props.moveOnQuiz();
      this.setState({
        correct: -1,
        wrong: -1
      })
    }, 500)

  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        {this.state.loading ? (
          <CircularProgress
            style={{
              color: '#224483',
              margin: 'auto auto'
            }}
          />
        ) : (
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
                    let status:Status = 'neutral';
                    if(this.state.correct === key)
                      status = 'right'
                    else if (this.state.wrong === key)
                      status = 'wrong';
                    return (<Grid key={key + 'question'} item xs={6}>
                      <AnswerButton
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
          )}
      </div>
    );
  }
}

const mapStateToProps = ({ runtime }) => {
  const quizData = get(runtime, 'quizData');
  const currentNumber = get(runtime, 'currentQuizData.current');
  // 1 === 0
  const current = quizData && currentNumber ?
    quizData[currentNumber - 1] : {};
  const variants = get(current, 'variants') !== undefined ? map(current.variants) : [];

  return {
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
  moveOnQuiz: Function
}


export default connect(
  mapStateToProps,
  {
    loadQuiz,
    moveOnQuiz,
    updateSpecData,
  }
)(withStyles(styles)(QuizShow));
