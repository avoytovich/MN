import React, { PureComponent } from 'react';
import { TextField, Input, withStyles } from '@material-ui/core';
import classNames from 'classnames';

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
  change = (e) => {
    if(e.target.value.length === 0)
    {
      this.props.onRemove?this.props.onRemove(): 1;
    }
    this.props.form.handleChange(e);
  }
  render() {
    const { name, label, error, field, form, classes, className } = this.props;
    return (
      <Input
        className={classNames(classes.input, className)}
        name={field.name}
        fullWidth
        label={label}
        onChange={this.change}
        error={error}
        type="search"
        placeholder={label}
      />
    );
  }
}
