import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';

import { Portlet, PortletContent } from '../../../../../components';
import styles from './styles';

class ShowTimesTable extends Component {
  state = {
    selectedShowtimes: [],
    rowsPerPage: 10,
    page: 0
  };

  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    onShowDetails: PropTypes.func,
    showtimes: PropTypes.array.isRequired
  };

  static defaultProps = {
    showtimes: [],
    onSelect: () => {},
    onShowDetails: () => {}
  };

  handleSelectAll = event => {
    const { showtimes, onSelect } = this.props;
    let selectedShowtimes;
    if (event.target.checked) {
      selectedShowtimes = showtimes.map(showtime => showtime._id);
    } else {
      selectedShowtimes = [];
    }

    this.setState({ selectedShowtimes });
    onSelect(selectedShowtimes);
  };

  handleSelectOne = (event, username) => {
    const { onSelect } = this.props;
    const { selectedShowtimes } = this.state;

    const selectedIndex = selectedShowtimes.indexOf(username);
    let newSelectedShowtimes = [];

    if (selectedIndex === -1) {
      newSelectedShowtimes = newSelectedShowtimes.concat(
        selectedShowtimes,
        username
      );
    } else if (selectedIndex === 0) {
      newSelectedShowtimes = newSelectedShowtimes.concat(
        selectedShowtimes.slice(1)
      );
    } else if (selectedIndex === selectedShowtimes.length - 1) {
      newSelectedShowtimes = newSelectedShowtimes.concat(
        selectedShowtimes.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedShowtimes = newSelectedShowtimes.concat(
        selectedShowtimes.slice(0, selectedIndex),
        selectedShowtimes.slice(selectedIndex + 1)
      );
    }

    this.setState({ selectedShowtimes: newSelectedShowtimes });

    onSelect(newSelectedShowtimes);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, className, showtimes } = this.props;
    const { selectedShowtimes, rowsPerPage, page } = this.state;

    const rootClassName = classNames(classes.root, className);
    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Checkbox
                    checked={selectedShowtimes.length === showtimes.length}
                    color="primary"
                    indeterminate={
                      selectedShowtimes.length > 0 &&
                      selectedShowtimes.length < showtimes.length
                    }
                    onChange={this.handleSelectAll}
                  />
                  ID
                </TableCell>
                <TableCell align="left">Movie</TableCell>
                <TableCell align="left">Cinema</TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">End Date</TableCell>
                <TableCell align="left">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showtimes
                .filter(showtime => {
                  return showtime;
                })
                .slice(0, rowsPerPage)
                .map(showtime => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={showtime._id}
                    selected={selectedShowtimes.indexOf(showtime._id) !== -1}>
                    <TableCell className={classes.tableCell}>
                      <div className={classes.tableCellInner}>
                        <Checkbox
                          checked={
                            selectedShowtimes.indexOf(showtime._id) !== -1
                          }
                          color="primary"
                          onChange={event =>
                            this.handleSelectOne(event, showtime._id)
                          }
                          value="true"
                        />
                        <Typography
                          className={classes.nameText}
                          variant="body1">
                          {showtime._id}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {showtime.movieId}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {showtime.cinemaId}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {moment(showtime.startDate).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {moment(showtime.endDate).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {showtime.startAt}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            backIconButtonProps={{
              'aria-label': 'Previous Page'
            }}
            component="div"
            count={showtimes.length}
            nextIconButtonProps={{
              'aria-label': 'Next Page'
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </PortletContent>
      </Portlet>
    );
  }
}

export default withStyles(styles)(ShowTimesTable);
