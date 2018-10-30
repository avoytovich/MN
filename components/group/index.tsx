import { Component } from 'react';
import { withStyles, Grid } from '@material-ui/core';

const styles = theme => ({

})

interface IGroupProps {
    name: string,
    description: string
}
@withStyles(styles)
export default class GroupInfo extends Component<IGroupProps>{
    render() {
        return (
            <Fragment>
                <Grid container>
                    {/* <Grid>

                    </Grid> */}
                </Grid>
            </Fragment>
        );
    }
}