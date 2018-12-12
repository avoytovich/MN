import { withFormik, InjectedFormikProps } from 'formik';
import { connect } from 'react-redux';
import { Component } from 'react';

export interface FormProps {
  search: string;
}

export interface FormValues {
  search: string;
}

export type FormType = React.SFC<InjectedFormikProps<FormProps, FormValues>>;

export default function(Component: FormType) {
  return withFormik<FormProps, FormValues>({
    mapPropsToValues: () => ({ search: '' }),
    handleSubmit: (values, { props }) =>
      // TODO: Search User
      // props.
      1
  })(connect(null)(Component));
}
