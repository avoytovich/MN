import React, { PureComponent } from 'react';
import { TextField, Input, withStyles } from '@material-ui/core';
import classNames from 'classnames';
import './style.sass'


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
      <div className="wrapper-input-search">
        <div className="label">{label}</div>
        <Input
          className={'searchfield-input'}
          name={field.name}
          fullWidth
          label={label}
          onChange={this.change}
          error={error}
          type="search"
        />
      </div>
    );
  }
}
