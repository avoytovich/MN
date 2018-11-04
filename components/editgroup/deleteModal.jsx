import { Component } from 'react';
import { connect } from 'react-redux';
import { deleteGroup } from 'actions/groups';
import { withStyles, Typography, Button, Grid } from '@material-ui/core';

const styles = theme => ({
  head: {
    fontSize: 24,
    color: '#224483',
    fontWeight: 'bold'
  },
  wrapper: {
    padding: 30,
    height: '100%',
  },
  boldText: {
    marginTop: 15,
    fontSize: 19,
    fontWeight: 400,
    color: '#5f6368'
  },
  actions: {
      position: 'relative',
      marginTop: 20
  }
});

@connect(
  ({groups}) => ({deleteGroupItem: groups.deleteModal}),
  {
    deleteGroup
  }
)
@withStyles(styles)
export default class DeleteModal extends Component {
  handleAccept = () => {
    console.log(this.props);
    this.props.deleteGroup(this.props.deleteGroupItem);
    this.props.close();
  }
  render() {
    const { classes, close } = this.props;

    return (
      <Grid direction="column" container className={classes.wrapper}>
        <Typography align="center" className={classes.head}>
          Delete Subgroup
        </Typography>
        <Typography className={classes.boldText} component="p">
          Do you really want to delete this subgroup? It will be no longer
          available for your workspace and all the users. Please confirm or
          decline this action to continue
        </Typography>
        <Grid className={classes.actions} container>
          <Button onClick={close} style={{marginRight: 5}} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={this.handleAccept} variant="contained" color="primary">
            Delete
          </Button>
        </Grid>
      </Grid>
    );
  }
}
