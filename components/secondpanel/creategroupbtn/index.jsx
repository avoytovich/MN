import React, { PureComponent } from 'react';
import {Link} from '../../../routes';
import { Button } from '@material-ui/core';
import './creategroupbtn.scss';
import Router from 'next/router';

const style = {
  display: 'flex',
  alignItems: 'center',
  borderRadius: '50px',
  backgroundColor: '#ff6f00'
};

export default class CreateGroupBtn extends PureComponent {
  render() {
    return (
      <Link route="create-group">
        <a>
          <Button  variant="contained" color="primary" style={style}>
            <div className="btn-icon" />
            <span className="btn-text">Create group</span>
          </Button>
         </a>
       </Link>
    );
  }
}
