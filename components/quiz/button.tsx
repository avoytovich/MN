import * as React from 'react';
import { Button, WithStyles, withStyles, Theme, createStyles } from '@material-ui/core';
import classNames from 'classnames';
import TickIcon from 'static/svg/check.svg'

const styles = (theme: Theme) => createStyles({
    button: {
        width: '100%',
        fontSize: 17,
        backgroundColor: '#fff',
        boxShadow: '-4.7px 3.8px 6px 0 rgba(105, 105, 105, 0.08)',
        height: 47,
        color: '#748191',
        '& span': {
            display: 'block',
            float: 'left',
            paddingLeft: 20,
        },
        '&:hover': {
            backgroundColor: 'initial'
        }
    },
    letter: {
        fontSize: 28,
        fontWeight: 400,
        top: 0,
        width: 60,
        bottom: 0,
        height: '100%',
        left: 0,
        position: 'absolute',
        textAlign: 'center',
        color: '#fff',
        paddingTop: 6,
        background: '#748191',
        borderRadius: 23
    },
    right: {
        color: '#ff6f00',
        '& div': {
            backgroundColor: 'green',
        },
        '&:after': {
            width: 25,
            height: 25,
            position: 'relative',
            content: "\'\'",
            background: 'url(/static/svg/check.svg)',
            backgroundSize: 'contain',
        }
    },
    wrong: {
        border: '1px solid #e62a10',
        '& div': {
            backgroundColor: '#DB3737',
        },
        '&:after': {
            width: 25,
            height: 25,
            position: 'relative',
            content: "\'\'",
            background: 'url(/static/png/close.png)',
            backgroundSize: 'cover',
        }
    },
    isWrong: {
        '&:after': {
            background: 'none'
        }
    },
    neutral: {
           
    }
});


export type Status =  "right" | "wrong" | "neutral";

export interface ButtonProps extends WithStyles<typeof styles> {
    title: string,
    letter: string,
    callback: (key:number) => (any),
    status: Status,
    disabled: boolean,
    isWrong: boolean
}

const AnswerButton: React.SFC<ButtonProps> = ({ disabled, status, callback, classes, isWrong, title, letter }) => (
    <Button disabled={disabled} onClick={callback} className={classNames(isWrong && classes.isWrong,classes.button, classes[status])} variant="contained" color="primary">
        <div className={classNames(classes.letter)}>{letter}</div>
            {title.slice(0, 15)}
    </Button>
)


export default withStyles(styles)<ButtonProps>(AnswerButton);