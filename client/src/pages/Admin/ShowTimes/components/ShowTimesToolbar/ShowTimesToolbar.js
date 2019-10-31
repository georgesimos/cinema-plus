import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { Button, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import styles from './styles';

class ShowTimesToolbar extends Component {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    selectedShowtimes: PropTypes.array
  };

  static defaultProps = {
    selectedShowtimes: []
  };

  onDeleteShowtime = () => {
    const { showtimes, selectedShowtimes, deleteShowtime } = this.props;
    const firstSelectedUser = selectedShowtimes[0];
    const itemToDelete = showtimes.find(
      user => user.username === firstSelectedUser
    );
    deleteShowtime(itemToDelete._id);
  };

  render() {
    const { classes, className, selectedShowtimes } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <div>
            {selectedShowtimes.length > 0 && (
              <IconButton
                className={classes.deleteButton}
                onClick={this.onDeleteShowtime}>
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

export default withStyles(styles)(ShowTimesToolbar);
