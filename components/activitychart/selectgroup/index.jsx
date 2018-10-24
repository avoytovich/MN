import React, { PureComponent } from 'react';
import { Select, MenuItem, withStyles, Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: 'calc(auto + 300px)',
    height: 34,
    backgroundColor: '#f3f5f7',
    borderRadius: 5,
    paddingLeft: 110,
    '&:before': {
      border: 'none',
      position: 'absolute',
      top: 7,
      left: 5,
      content: "'Choose group:'",
      display: 'block',
      fontSize: 15,
      color: '#5f6368',
      '&:hover': {
        border: 'none'
      },
    },
    '&:after': {
      content: 'none',
      border: 'none',
      position: 'relative'
    },
    
    '&:focus': {
      background: 'transparent',
      color: 'initial',
      fontWeight: 'initial',
      textShadow: 'none'
    }
  },

  input: {
    display: 'flex',
    '&:focus': {
      background: 'transparent',
      textShadow: 'none'
    }
  },
  icon: {
    width: 20,
    height: 20,
    mask: 'url(/static/svg/arrow-up-down.svg) center / contain no-repeat',
    background: '#90a4ae',
    top: 'calc(50% - 10px)',
    right: 5,
    position: 'absolute',
    pointerEvents: 'none'
  },
  g: {
    color: '#393939',
    fontSize: 15,
    marginLeft: 8,
    fontWeight: 'bold'
  },
  item: {
    display: 'flex'
  }
});

const IconComponent = props => <div className={props.classes.icon} />;

@withStyles(styles)
export default class SelectGroup extends PureComponent {
  state = {
    value: 0
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { items, classes } = this.props;

    return (
      <Select
        IconComponent={() => <IconComponent classes={classes} />}
        className={classes.root}
        inputProps={{
          className: classes.input
        }}
        onChange={this.handleChange}
        value={this.state.value}>
        {items.map((el, key) => (
          <MenuItem className={classes.item} value={key} key={key}>
            {/* <Typography className={classes.chg}>Choose Group:</Typography> */}
            <Typography className={classes.g}>{el}</Typography>
          </MenuItem>
        ))}
      </Select>
    );
  }
}
