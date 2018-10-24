import React, { PureComponent } from 'react';
import { Typography, Divider } from '@material-ui/core';

import './footer.sass';

export default class Footer extends PureComponent {
  render() {
    return (
      <footer className="footer-wrapped">
        <div className="main d-flex ai-center">
          <div className="d-flex ai-center">
            <div
              style={{ backgroundImage: 'url(/static/png/logo-image.png)' }}
              className="logo"
            />
            <div className="logo-text">
              <Typography variant="display1">MetKnow</Typography>
            </div>
          </div>
          <div className="policy d-flex ai-center">
            <Typography variant="title">privacy policy</Typography>
            <div className="divider" />
            <Typography variant="title">terms of use</Typography>
          </div>
        </div>
        <div className="copyright d-flex jcc ai-center">
          <Typography align="center" variant="title">
            © 2018 MetKnow
          </Typography>
        </div>
      </footer>
    );
  }
}
