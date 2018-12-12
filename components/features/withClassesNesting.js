import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
  root: {
    fontSize: '15px'
  }
};

function ClassesNesting(props) {
  const { classes } = props;

  return (
    <MenuItem
      {...props}
      classes={{
        root: classes.root
      }}
    />
  );
}

ClassesNesting.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClassesNesting);
