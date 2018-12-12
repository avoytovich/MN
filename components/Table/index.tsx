import * as React from 'react';
import classNames from 'classnames';
import {
  TableBody,
  TableHead,
  TableCell,
  TableFooter,
  TablePagination,
  Table as MTable,
  TableRow,
  withStyles
} from '@material-ui/core';
import map from 'lodash/map';
import './styles.sass';
import ReactSVG from 'react-svg';

interface TableProps {
  keys: Key[];
  data: any[];
}

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
  iconSvg: {
    width: 20,
    height: 20,
    fill: 'gray'
  },
  icon: {
    width: 20,
    height: 20,
    right: 5,
    position: 'relative',
    marginLeft: 'auto',
    cursor: 'pointer',
    opacity: 0.5
  },
  selIcon: {
    opacity: 1
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
  }
});

export interface Key {
  id: string;
  numeric: boolean;
  sort: boolean;
  label: string;
}

@withStyles(styles)
class Table extends React.Component<TableProps> {
  constructor(props: TableProps) {
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
    let sorted = _.orderBy(
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

  render() {
    const { rowsPerPage, rows, page, sort } = this.state;
    const { keys, classes, paging } = this.props;
    console.log(keys);
    return (
      <MTable>
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
                    <ReactSVG
                      src="/static/svg/arrow-up-down.svg"
                      className={classNames(
                        classes.icon,
                        sort === ind ? classes.selIcon : ''
                      )}
                      onClick={this.sort(ind)}
                      svgClassName={classes.iconSvg}
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
                {map(row, r => (
                          <TableCell key={`cell-${r}-${row}`}>
                              {r}
                            </TableCell>
                ))}
                {// Actions map
                map(keys, el =>
                  el.action ? (
                          <TableCell>
                          <div onClick={el.callback(row)}>
                              {el.actionButton}
                    </TableCell>
                  ) : null
                )}
              </TableRow>
            ))}
        </TableBody>
        {paging === true ? (
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
        ) : null}
      </MTable>
    );
  }
}
export default Table;
