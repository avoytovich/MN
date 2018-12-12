import React, { Component } from 'react';
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  withStyles,
  Avatar,
  Typography,
  TablePagination,
  TableFooter,
  IconButton
} from '@material-ui/core';
import _ from 'lodash';
import classNames from 'classnames';

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const styles = theme => ({
  th: {
    textTransform: 'uppercase',
    fontSize: 13,
    fontWeight: '600',
    color: '#748191'
  },
  ct: {
    textAlign: 'center'
  },
  name: {
    alignItems: 'center',
    display: 'flex'
  },
  avatar: {
    width: 42,
    height: 42
  },
  name_email: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 15
  },
  first: {
    fontSize: 18,
    fontWeight: 400,
    color: '#748191'
  },
  email: {
    fontSize: 13,
    fontWeight: 400,
    color: '#b6bec9'
  },
  striped: {
    backgroundColor: '#e8f4f9',
    border: 'none'
  },
  row: {
    border: 'none'
  },
  cell: {
    border: 'none',
    fontSize: 18,
    color: '#748191'
  },
  icon: {
    width: 20,
    height: 20,
    mask: 'url(/static/svg/arrow-up-down.svg) center / contain no-repeat',
    background: '#90a4ae',
    right: 5,
    position: 'relative',
    marginLeft: 'auto',
    cursor: 'pointer',
    '&:hover': {
      background: '#393939'
    }
  },
  rel: {
    left: 5,
    marginLeft: 0
  },
  fl: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  jcc: {
    justifyContent: 'center'
  },
  selSort: {
    color: '#393939'
  },
  selSortIcon: {
    background: '#393939'
  }
});

@withStyles(styles)
export default class ActivityTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: this.props.data,
      page: 0,
      rowsPerPage: 5,
      directionSort: false,
      sort: 0
    };
  }

  sort = ind => e => {
    const { keys } = this.props;
    const { rows, directionSort } = this.state;
    const sorted = _.orderBy(
      this.state.rows,
      [keys[ind].id],
      [directionSort ? 'asc' : 'desc']
    );
    this.setState({
      rows: sorted,
      sort: ind,
      directionSort: !this.state.directionSort
    });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { rowsPerPage, rows, page, sort } = this.state;
    const { keys, classes } = this.props;
    return (
      <Table>
        <TableHead>
          <TableRow>
            {keys.map((el, ind) => (
              <TableCell
                key={ind}
                className={classNames(classes.th, classes.ct)}>
                <div
                  className={classNames(
                    classes.fl,
                    el.numeric === true ? classes.jcc : undefined
                  )}>
                  <div className={sort === ind ? classes.selSort : undefined}>
                    {el.label}
                  </div>
                  {el.sort === true ? (
                    <div
                      onClick={this.sort(ind)}
                      className={classNames(
                        classes.icon,
                        sort === ind ? classes.selSortIcon : undefined,
                        el.numeric === true ? classes.rel : undefined
                      )}
                    />
                  ) : null}
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, ind) => (
              <TableRow
                className={
                  (classes.row, ind % 2 !== 0 ? classes.striped : undefined)
                }
                key={ind}>
                <TableCell className={classNames(classes.name, classes.cell)}>
                  <Avatar className={classes.image} src={row.img} />
                  <div className={classes.name_email}>
                    <Typography className={classes.first}>
                      {row.name}
                    </Typography>
                    <Typography className={classes.email}>
                      {row.email}
                    </Typography>
                  </div>
                </TableCell>
                <TableCell className={classes.cell}>{row.title}</TableCell>
                <TableCell className={classNames(classes.ct, classes.cell)}>
                  {row.top_scores}
                </TableCell>
                <TableCell className={classNames(classes.ct, classes.cell)}>
                  {row.quiz_taken}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
            />
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}
