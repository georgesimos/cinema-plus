import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { Button, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import styles from './styles';

class UsersToolbar extends Component {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    selectedUsers: PropTypes.array
  };

  static defaultProps = {
    selectedUsers: []
  };

  onDeleteUser = () => {
    const { users, selectedUsers, deleteUser } = this.props;
    const firstSelectedUser = selectedUsers[0];
    const userToDelete = users.find(
      user => user.username === firstSelectedUser
    );
    deleteUser(userToDelete._id);
  };

  render() {
    const { classes, className, selectedUsers } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <div>
            {selectedUsers.length > 0 && (
              <IconButton
                className={classes.deleteButton}
                onClick={this.onDeleteUser}>
                <DeleteIcon />
              </IconButton>
            )}
            <Button color="primary" size="small" variant="outlined">
              Add
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(UsersToolbar);
