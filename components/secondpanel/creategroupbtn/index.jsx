import React, { PureComponent } from 'react';
import {Link} from '../../../routes';
import { Button } from '@material-ui/core';
import './creategroupbtn.sass';
import Router from 'next/router';

export default class CreateGroupBtn extends PureComponent {
  render() {
    return (
      <Link route="create-group">
        <a>
          <Button variant="contained" color="primary" className="button-container button-wrapper">
            <div className="btn-icon" />
            <span className="btn-text button-text">Create group</span>
          </Button>
         </a>
       </Link>
    );
  }
}
