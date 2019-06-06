import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import {
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';

import { Portlet, PortletContent } from '../../../../components';
import styles from './styles';

class UsersTable extends Component {
  state = {
    selectedUsers: [],
    rowsPerPage: 10,
    page: 0
  };

  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    onShowDetails: PropTypes.func,
    users: PropTypes.array.isRequired
  };

  static defaultProps = {
    users: [],
    onSelect: () => {},
    onShowDetails: () => {}
  };

  handleSelectAll = event => {
    const { users, onSelect } = this.props;
    let selectedUsers;
    if (event.target.checked) {
      selectedUsers = users.map(user => user.username);
    } else {
      selectedUsers = [];
    }

    this.setState({ selectedUsers });
    onSelect(selectedUsers);
  };

  handleSelectOne = (event, username) => {
    const { onSelect } = this.props;
    const { selectedUsers } = this.state;

    const selectedIndex = selectedUsers.indexOf(username);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, username);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    this.setState({ selectedUsers: newSelectedUsers });

    onSelect(newSelectedUsers);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, className, users } = this.props;
    const { selectedUsers, rowsPerPage, page } = this.state;

    const rootClassName = classNames(classes.root, className);
    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Checkbox
                    checked={selectedUsers.length === users.length}
                    color="primary"
                    indeterminate={
                      selectedUsers.length > 0 &&
                      selectedUsers.length < users.length
                    }
                    onChange={this.handleSelectAll}
                  />
                  Name
                </TableCell>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Registration date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .filter(user => {
                  return user;
                })
                .slice(0, rowsPerPage)
                .map(user => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user.username}
                    selected={selectedUsers.indexOf(user.username) !== -1}>
                    <TableCell className={classes.tableCell}>
                      <div className={classes.tableCellInner}>
                        <Checkbox
                          checked={selectedUsers.indexOf(user.username) !== -1}
                          color="primary"
                          onChange={event =>
                            this.handleSelectOne(event, user.username)
                          }
                          value="true"
                        />
                        <Avatar
                          className={classes.avatar}
                          src={user.avatarUrl}
                        />
                        <Typography
                          className={classes.nameText}
                          variant="body1">
                          {user.firstname}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {user.username}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {user.email}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {moment(user.createdAt).format('DD/MM/YYYY')}
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
            count={users.length}
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

export default withStyles(styles)(UsersTable);
