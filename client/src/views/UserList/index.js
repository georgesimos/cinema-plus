import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, CircularProgress, Typography } from '@material-ui/core';
import Dashboard from '../../layouts/Dashboard/Dashboard';
import styles from './styles';
import { UsersToolbar, UsersTable } from './components';

class UserList extends Component {
  signal = true;
  state = {
    isLoading: false,
    limit: 10,
    users: [],
    selectedUsers: [],
    error: null
  };

  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };
  componentDidMount() {
    this.signal = true;
    this.getUsers();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  getUsers = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = 'http://localhost:3001/users';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok && this.signal) {
        const users = await response.json();
        this.setState({ isLoading: false, users });
      }
    } catch (error) {
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  };

  handleDeleteUsers = async userId => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = 'http://localhost:3001/users/' + userId;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        this.setState({
          users: this.state.users.filter(user => user._id !== userId),
          selectedUsers: []
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleSelect = selectedUsers => {
    this.setState({ selectedUsers });
  };

  renderUsers() {
    const { classes } = this.props;
    const { isLoading, users, error } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return <Typography variant="h6">{error}</Typography>;
    }

    if (users.length === 0) {
      return <Typography variant="h6">There are no users</Typography>;
    }

    return <UsersTable onSelect={this.handleSelect} users={users} />;
  }
  render() {
    const { classes } = this.props;
    const { users, selectedUsers } = this.state;

    return (
      <Dashboard title="Users">
        <div className={classes.root}>
          <UsersToolbar
            users={users}
            selectedUsers={selectedUsers}
            deleteUser={this.handleDeleteUsers}
          />
          <div className={classes.content}>{this.renderUsers()}</div>
        </div>
      </Dashboard>
    );
  }
}
export default withStyles(styles)(UserList);
