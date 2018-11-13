import * as React from 'react';
import { Button, WithStyles, withStyles, Theme } from '@material-ui/core';

const styles = (theme:Theme) => ({
    button: {
        width: 290
    }
})

export interface ButtonProps extends WithStyles<typeof styles> {
    title: string,
    letter: string,
    callback: Function,
}

const AnswerButton: React.SFC<ButtonProps> = (props:ButtonProps) => (
    <Button variant="contained" color="primary" className={props.classes.button}>
        {props.title}
    </Button>
)


export default withStyles(styles)<ButtonProps>(AnswerButton);