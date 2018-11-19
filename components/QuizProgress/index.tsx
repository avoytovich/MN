import * as React from 'react';
import './style.sass';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { LinearProgress } from '@material-ui/core';


interface QuizProgressProps {
    current: number,
    total: number,
    loading: boolean
}

@connect(({runtime}) => ({
    current: get(runtime, 'currentQuizData.current'),
    total: get(runtime, 'currentQuizData.total'),
    loading: get(runtime, 'currentQuizData.current') === undefined
}))
class QuizProgress extends React.Component<QuizProgressProps>{
    constructor(props: QuizProgressProps){
        super(props);
    }
    
    render() {
        let percent = Math.floor((this.props.current / this.props.total) * 100);    
        if(percent > 100)
            percent = 100;
        else if(percent < 0)
            percent = 0;
        if(this.props.loading)
            return null;
        return (
            <div className="bar">
                <div style={{width: `${percent}%`}} className="fill"/>
                <span className="text">
                    Question {this.props.current} of {this.props.total}
                </span>
            </div>
        )
    }
}

export default QuizProgress;