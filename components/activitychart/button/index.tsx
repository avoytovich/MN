import * as React from 'react';
import { Button } from '@material-ui/core';
import './style.sass';
import ReactSVG from 'react-svg';

const ActivityChartButton = () => (
  <Button className="button" variant="outlined" color="primary">
      <ReactSVG
      className="icon"
      svgClassName="svg-icon"
      src="/static/svg/user-activity-chart.svg"
      {/* <div className="icon" /> */}
    User activity chart
  </Button>
);

export default ActivityChartButton;
