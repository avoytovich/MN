import * as React from 'react';
import ReactCircularProgressBar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './index.sass';

interface Props {
    current: number,
    total: number
}

const CircularProgressBar: React.SFC<Props> = (props) => {
    const percentage = (props.current / props.total) * 100;

    return (
        <div className="cpb">
            <ReactCircularProgressBar
                initialAnimation={true}
                percentage={percentage}
                text={`${Math.floor(percentage)}%`}
            />
        </div>);
}

export default CircularProgressBar;