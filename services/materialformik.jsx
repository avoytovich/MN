import { TextField } from '@material-ui/core';

export const wrapField = props => (
  <TextField
    name={props.field.name}
    label={props.label}
    value={props.field.value}
    {...props}
    error={
      props.form.errors[props.field.name] !== undefined &&
      props.form.touched[props.field.name] === true
    }
    helperText={
      props.form.touched[props.field.name] === true
        ? props.form.errors[props.field.name]
        : ''
    }
    onChange={props.field.onChange}
    onBlur={props.field.onBlur}
  />
);
