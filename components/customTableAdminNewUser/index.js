import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  Checkbox,
  Tooltip,
  TextField,
  IconButton
} from '@material-ui/core';
import { InfoOutline } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import qs from 'qs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get as _get } from 'lodash';

import { group, organization } from '../../services/cruds';
import loading from '../../services/decorators/loading';
import { setData } from '../../actions/updateData';
import ClassesNesting from '../features/withClassesNesting';

import './customTableAdminNewUser.sass';

let counter = 0;
function createData(
  order,
  firstName,
  lastName,
  department,
  email,
  group,
  info,
  review,
  requestId
) {
  counter += 1;
  return {
    id: counter,
    order,
    firstName,
    lastName,
    department,
    email,
    group,
    info,
    review,
    requestId
  };
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
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'order', numeric: true, disablePadding: true, label: '#' },
  {
    id: 'firstName',
    numeric: false,
    disablePadding: true,
    label: 'First name'
  },
  { id: 'lastName', numeric: false, disablePadding: true, label: 'Last name' },
  {
    id: 'department',
    numeric: false,
    disablePadding: true,
    label: 'Department'
  },
  { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
  { id: 'group', numeric: false, disablePadding: true, label: 'Group' },
  { id: 'info', numeric: false, disablePadding: true, label: '' },
  { id: 'review', numeric: false, disablePadding: true, label: '' }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;

    return (
      <TableHead className="table-head">
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}>
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}>
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const styles = theme => ({
  root: {
    width: '100%'
    // marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  }
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setData }, dispatch);

const mapStateToProps = ({ runtime }) => ({
  groups: runtime.groups
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@loading()
class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'firstName',
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
    selectGroup: {
      initial: '...'
    },
    selectReview: {
      initial: '...'
    },
    condition: {
      initial: false
    },
    helperText: {
      initial: 'Group:'
    },
    selectInfo: []
  };

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.props;
    if (data != prevProps.data) {
      const array = [];
      data.forEach((item, id) => {
        const { firstname, lastname, department, email, requestId } = item;
        array.push(
          createData(
            id,
            firstname,
            lastname,
            department,
            email,
            null,
            null,
            null,
            requestId
          )
        );
      });
      this.setState({
        data: array
      });
    }
  }

  componentDidMount() {
    const { data } = this.props;
    const array = [];
    data &&
      data.forEach((item, id) => {
        const { firstname, lastname, department, email, requestId } = item;
        array.push(
          createData(
            id,
            firstname,
            lastname,
            department,
            email,
            null,
            null,
            null,
            requestId
          )
        );
      });
    this.setState({
      data: array
    });
    this.GetGroups_loadAndSaveToProps();
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = async event => {
    const { handleNumSelected } = this.props;
    const { data, selected, selectGroup } = this.state;
    if (event.target.checked) {
      await this.setState(state => ({
        selected: state.data.map(n => n.id),
        selectInfo: []
      }));
      await data.map(async item => {
        if (!selectGroup[item.requestId]) {
          this.handleClick(event, item.id, item.requestId);
        } else {
          await this.setState({
            selectInfo: [
              ...this.state.selectInfo,
              {
                requestId: item.requestId,
                // groupName: selectGroup[currentData[0].requestId].name,
                groupId: selectGroup[item.requestId].id
              }
            ]
          });
        }
      });
      return handleNumSelected(this.state.selectInfo, this.state.selected);
    }
    await this.setState({
      selected: [],
      selectInfo: []
    });
    handleNumSelected(this.state.selectInfo, this.state.selected);
  };

  handleClick = async (event, id, requestId) => {
    const { handleNumSelected } = this.props;
    const { selected, data, selectGroup, selectInfo } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (!selectGroup[requestId]) {
      return this.setState({
        condition: {
          ...this.state.condition,
          [requestId]: true
        },
        helperText: {
          ...this.state.helperText,
          [requestId]: 'required'
        }
      });
    }

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    await this.setState({ selected: newSelected });
    const currentData = data.filter(item => item.id === id);

    if (currentData[0] && this.isSelected(id)) {
      if (selectGroup[requestId] && !selected.length) {
        await this.setState({
          selectInfo: [
            {
              requestId: currentData[0].requestId,
              // groupName: selectGroup[currentData[0].requestId].name,
              groupId: selectGroup[currentData[0].requestId].id
            }
          ]
        });
      } else {
        await this.setState({
          selectInfo: [
            ...selectInfo,
            {
              requestId: currentData[0].requestId,
              // groupName: selectGroup[currentData[0].requestId].name,
              groupId: selectGroup[currentData[0].requestId].id
            }
          ]
        });
      }
    } else if (currentData[0] && !this.isSelected(id)) {
      await this.setState({
        condition: {
          ...this.state.condition,
          [requestId]: false
        },
        helperText: {
          ...this.state.helperText,
          [requestId]: 'Group:'
        }
      });
      const baseSelectInfo = selectInfo.filter(
        item => item.requestId != currentData[0].requestId
      );
      await this.setState({
        selectInfo: [...baseSelectInfo]
      });
    }

    handleNumSelected(this.state.selectInfo, this.state.selected);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  GetGroups_loadAndSaveToProps = async () => {
    const params = {
      limit: 99,
      offset: 0
    };
    const resp = await this.props.loadData(
      group.get(params, '/GetGroups', false, par =>
        qs.stringify(par, { indices: false })
      ),
      {
        saveTo: 'groups'
      }
    );
    this.props.setData(resp.data, 'groups');
  };

  handleChangeGroup = (id, requestId) => async event => {
    const { groups, handleNumSelected } = this.props;
    const { selected } = this.state;
    const currentGroup = groups.data.filter(
      item => item.name === event.target.value
    );
    const baseSelected = selected.filter(item => item != id);
    await this.setState({
      selectGroup: {
        ...this.state.selectGroup,
        [requestId]: {
          name: event.target.value,
          id: currentGroup[0].id
        }
      },
      selected: [...baseSelected],
      condition: {
        ...this.state.condition,
        [requestId]: false
      },
      helperText: {
        ...this.state.helperText,
        [requestId]: 'Group:'
      }
    });
    handleNumSelected(this.state.selectInfo, this.state.selected);
  };

  handleAcceptJoinRequest = async (id, value) => {
    if (value == 'Approve') {
      const { selectGroup } = this.state;
      if (!selectGroup[id]) {
        return this.setState({
          condition: {
            ...this.state.condition,
            [id]: true
          },
          helperText: {
            ...this.state.helperText,
            [id]: 'required'
          }
        });
      }
      const params = {
        requestId: id
      };
      const resp = await this.props.loadData(
        organization.post(
          params,
          `/AcceptJoinRequest?requestId=${params.requestId}`,
          false,
          par => qs.stringify(par, { indices: false })
        ),
        {
          saveTo: 'acceptJoinRequest'
        }
      );
    }
    if (value == 'Reject') {
      const params = {
        requestId: id
      };
      const resp = await this.props.loadData(
        organization.post(
          params,
          `/DeclineJoinRequest?requestId=${params.requestId}`,
          false,
          par => qs.stringify(par, { indices: false })
        ),
        {
          saveTo: 'declineJoinRequest'
        }
      );
    }
  };

  handleChangeReview = id => event => {
    this.setState({
      selectReview: {
        ...this.state.selectReview,
        [id]: event.target.value
      }
    });
    this.handleAcceptJoinRequest(id, event.target.value);
  };

  handleClickInfoButton = id => event => {
    console.log('id', id);
  };

  render() {
    console.log('this.props', this.props);
    console.log('this.state', this.state);
    const { classes, groups } = this.props;
    const {
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      selectGroup,
      selectReview,
      condition,
      helperText
    } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const SelectGroups = ({ id, requestId }) => (
      <TextField
        label={helperText[requestId] || helperText.initial}
        id="outlined-select"
        InputProps={{
          className: 'field-search-input'
          // onChange: (e) => this.loadAndSaveMembersList(e.target.value),
        }}
        select
        error={condition[requestId] || condition.initial}
        className="field-select"
        value={
          (selectGroup[requestId] && selectGroup[requestId].name) ||
          selectGroup.initial
        }
        onChange={this.handleChangeGroup(id, requestId)}
        margin="normal"
        variant="outlined">
        {groups &&
          groups.data.map((item, id) => (
            <ClassesNesting key={id} value={item.name}>
              {item.name}
            </ClassesNesting>
          ))}
      </TextField>
    );
    const InfoButton = ({ id }) => (
      <IconButton
        className="info-button"
        onClick={this.handleClickInfoButton(id)}>
        <InfoOutline />
      </IconButton>
    );
    const SelectReview = ({ id }) => (
      <TextField
        label="Review"
        id="outlined-select"
        InputProps={{
          className: 'field-search-input'
          // onChange: (e) => this.loadAndSaveMembersList(e.target.value),
        }}
        select
        className="field-select"
        value={selectReview[id] || selectReview.initial}
        onChange={this.handleChangeReview(id)}
        margin="normal"
        variant="outlined">
        {['Approve', 'Reject'].map((item, id) => (
          <ClassesNesting key={id} value={item}>
            {item}
          </ClassesNesting>
        ))}
      </TextField>
    );

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody className="table-body">
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      // onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          color="primary"
                          onClick={event =>
                            this.handleClick(event, n.id, n.requestId)
                          }
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.order}
                      </TableCell>
                      <TableCell padding="none">{n.firstName}</TableCell>
                      <TableCell padding="none">{n.lastName}</TableCell>
                      <TableCell padding="none">{n.department}</TableCell>
                      <TableCell padding="none">{n.email}</TableCell>
                      <TableCell padding="none">
                        <SelectGroups id={n.id} requestId={n.requestId} />
                      </TableCell>
                      <TableCell padding="none">
                        <InfoButton id={n.id} />
                      </TableCell>
                      <TableCell padding="none">
                        <SelectReview id={n.requestId} />
                      </TableCell>
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedTable);
