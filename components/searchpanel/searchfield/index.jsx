import React, { PureComponent } from 'react';
import { TextField, Input, withStyles } from '@material-ui/core';

const styles = theme => ({
  input: {
    // border: '1px solid',
    borderRadius: '5px',
    padding: '6px 13px 7px',
    height: 37,
    maxWidth: 307,
    width: '100%',
    fontSize: 15,
    marginRight: 15,
    backgroundColor: '#f3f5f7',
    '&:before': {
      border: 'none',
      content: 'none',
    },
    '&:after': {
      content: 'none',
      border: 'none',
      position: 'relative'
    }
  }
})

@withStyles(styles)
export default class SearchField extends PureComponent {
  render() {
    const { name, label, error, field, form, classes } = this.props;
    return (
      <Input
        onChange={field.onChange}
        className={classes.input}
        name={field.name}
        label={label}
        error={error}
        placeholder={label}
      />
    );
  }
}
