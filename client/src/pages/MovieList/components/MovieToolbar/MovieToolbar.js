import React, { Component, Fragment } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Button } from '@material-ui/core';

// Shared components
import {
  DisplayMode,
  SearchInput,
  ResponsiveDialog
} from '../../../../components';

// Component styles
import styles from './styles';
import AddMovie from '../AddMovie/AddMovie';

class MovieToolbar extends Component {
  state = {
    openAddDialog: false
  };

  OpenAddDialog() {
    this.setState({ openAddDialog: true });
  }

  CloseAddDialog() {
    this.setState({ openAddDialog: false });
  }

  render() {
    const { openAddDialog } = this.state;
    const { classes, className } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Fragment>
        <div className={rootClassName}>
          <div className={classes.row}>
            <span className={classes.spacer} />
            <Button
              onClick={() => this.OpenAddDialog()}
              color="primary"
              size="small"
              variant="outlined">
              Add
            </Button>
          </div>
          <div className={classes.row}>
            <SearchInput
              className={classes.searchInput}
              placeholder="Search movie"
            />
            <span className={classes.spacer} />
            <DisplayMode mode="grid" />
          </div>
        </div>
        <ResponsiveDialog
          id="Add-movie"
          open={openAddDialog}
          handleClose={() => this.CloseAddDialog()}>
          <AddMovie />
        </ResponsiveDialog>
      </Fragment>
    );
  }
}

MovieToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieToolbar);
