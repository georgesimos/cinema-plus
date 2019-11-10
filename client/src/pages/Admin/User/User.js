import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, CircularProgress } from '@material-ui/core';
import styles from './styles';
import { UsersToolbar, UsersTable, AddUser } from './components';
import {
  getUsers,
  deleteUser,
  selectUser,
  selectAllUsers,
  toggleUserDialog,
  addUser,
  updateUser
} from '../../../store/actions';
import { ResponsiveDialog } from '../../../components';

class User extends Component {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getUsers();
  }

  handleSelect = selectedUsers => {
    this.setState({ selectedUsers });
  };

  renderUsers() {
    const {
      classes,
      users,
      selectedUsers,
      selectUser,
      selectAllUsers
    } = this.props;

    if (!users.length) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }
    return (
      <UsersTable
        onSelect={selectUser}
        onSelectAll={selectAllUsers}
        users={users}
        selectedUsers={selectedUsers}
      />
    );
  }
  render() {
    const {
      classes,
      users,
      selectedUsers,
      openDialog,
      toggleUserDialog,
      addUser,
      updateUser,
      deleteUser
    } = this.props;

    return (
      <div className={classes.root}>
        <UsersToolbar
          users={users}
          selectedUsers={selectedUsers}
          toggleDialog={toggleUserDialog}
          deleteUser={() => deleteUser(selectedUsers[0])}
        />
        <div className={classes.content}>{this.renderUsers()}</div>
        <ResponsiveDialog
          id="Add-user"
          open={openDialog}
          handleClose={() => toggleUserDialog()}>
          <AddUser
            selectedUser={users.find(user => user._id === selectedUsers[0])}
            addUser={addUser}
            updateUser={updateUser}
          />
        </ResponsiveDialog>
      </div>
    );
  }
}

const mapStateToProps = ({ userState }) => ({
  users: userState.users,
  selectedUsers: userState.selectedUsers,
  openDialog: userState.openDialog
});
const mapDispatchToProps = {
  getUsers,
  selectUser,
  selectAllUsers,
  toggleUserDialog,
  addUser,
  updateUser,
  deleteUser
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(User));
