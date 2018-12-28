import React from 'react';
import PropTypes from 'prop-types';
import { get as _get } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

import './customTable.sass';

let counter = 0;
function createData(name, group, position, scores, quizzess, imageContent, email) {
  counter += 1;
  return { id: counter, name, group, position, scores, quizzess, imageContent, email };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'NAME' },
  { id: 'group', numeric: true, disablePadding: false, label: 'NAME COMMUNITY' },
  { id: 'position', numeric: true, disablePadding: false, label: 'TITLE' },
  { id: 'scores', numeric: true, disablePadding: false, label: 'TOP SCORES' },
  { id: 'quizzess', numeric: true, disablePadding: false, label: 'QUIZZESS TAKEN' }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, category } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            if (category == 'ALL' && row.id == 'group') {
              return null;
            } else {
              return (
                <TableCell
                  key={row.id}
                  numeric={row.numeric}
                  padding={row.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === row.id ? order : false}
                >
                  <Tooltip
                    title="Sort"
                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === row.id}
                      direction={order}
                      onClick={this.createSortHandler(row.id)}
                    >
                      {row.label}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              );
            }
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    boxShadow: 'none',
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    margin: '15px',
    overflowX: 'auto',
  },
  row: {
    backgroundColor: '#e8f4f9',
  }
});

class EnhancedTable extends React.Component {

  state = {
      order: 'asc',
      orderBy: 'position',
      data: [],
      page: 0,
      rowsPerPage: 5,
  }

  componentDidUpdate(prevProps, prevState) {
    const { data, choosenGroup } = this.props;
    if (data != prevProps.data ||
      choosenGroup != prevProps.choosenGroup) {
      if (choosenGroup != prevProps.choosenGroup) {
        let array = [];
        data.forEach((item, id) => {
          const { firstName, lastName, group, title, score, quizesTaken, imageContent, email } = item;
          if (group == choosenGroup) {
            array.push(createData(`${firstName} ${lastName}`, group, title, score, quizesTaken, imageContent, email));
          }
        });
        this.setState({
          data: array,
        })
      } else {
        let array = [];
        data.forEach((item, id) => {
          const { firstName, lastName, group, title, score, quizesTaken, imageContent, email } = item;
          array.push(createData(`${firstName} ${lastName}`, group, title, score, quizesTaken, imageContent, email));
        });
        this.setState({
          data: array,
        })
      }
    }
  }

  componentDidMount() {
    const { data, category } = this.props;
    let array = [];
    data.forEach((item, id) => {
      const { firstName, lastName, group, title, score, quizesTaken, imageContent, email } = item;
      array.push(createData(`${firstName} ${lastName}`, group, title, score, quizesTaken, imageContent, email));
    });
    this.setState({
      data: array,
    })
  }

  /*handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };*/

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    //console.log('this.props', this.props);
    const { classes, category } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              category={category}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n, id) => {
                  return (
                    <TableRow
                      //hover
                      //onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      tabIndex={-1}
                      key={n.id}
                      className={id%2 ? classes.row : ''}
                    >
                      <TableCell component="th" scope="row" padding="none">
                        <div
                          style={{
                            backgroundImage: `url(${_get(n.imageContent, 'mediumImage') ||
                            '/static/svg/placeholder.svg'})`,
                          }}
                          className='table-cell-photo'
                        />
                        <div className='table-cell-name'>
                          {n.name}
                          <br/>
                          <div className='table-cell-email'>
                            {n.email}
                          </div>
                        </div>
                      </TableCell>
                      {category != 'ALL' &&
                        <TableCell numeric>{n.group}</TableCell>
                      }
                      <TableCell numeric>{n.position}</TableCell>
                      <TableCell numeric>{n.scores}</TableCell>
                      <TableCell numeric>{n.quizzess}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          className="table-pagination"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
