import React, { PureComponent } from 'react';
import { Button } from '@material-ui/core';

import './creategroupbtn.scss';

const style = {
  display: 'flex',
  alignItems: 'center',
  borderRadius: '50px',
  backgroundColor: '#ff6f00'
};

export default class CreateGroupBtn extends PureComponent {
  render() {
    return (
      <Button variant="contained" color="primary" style={style}>
        <div className="btn-icon" />
        <span className="btn-text">Create group</span>
      </Button>
    );
  }
}