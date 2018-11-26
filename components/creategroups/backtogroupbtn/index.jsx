import React from 'react';
import Link from 'next/link';
import { Button, withStyles } from '@material-ui/core';

import './style.sass';

const BackToGroupBtn = props => (
  <Link route="manage-groups">
    <a>
      <Button variant="outlined" className="but-wrapper" color="primary">
        <div className="icon" />
        {props.label ? props.label : 'back to group'}
      </Button>
    </a>
  </Link>
);

export default BackToGroupBtn;
