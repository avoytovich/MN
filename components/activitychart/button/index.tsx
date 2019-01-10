import * as React from 'react';
import { Button } from '@material-ui/core';
import Router from 'next/router';
import './style.sass';
import ReactSVG from 'react-svg'

const ActivityChartButton = () => (
  <Button
    className="button"
    variant="outlined"
    color="primary"
    onClick={() => (
      Router.push({ pathname: '/manage-groups/user-activity-chart' })
    )}
  >
    <ReactSVG
          className="icon"
          svgClassName="svg-icon"
    src="/static/svg/user-activity-chart.svg"/>
    {/* <div className="icon" /> */}
    <span className="button-text">User activity chart</span>
  </Button>
)

export default ActivityChartButton;