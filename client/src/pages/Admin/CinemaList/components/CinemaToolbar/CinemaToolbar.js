import React, { Component, Fragment } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Button } from '@material-ui/core';

// Shared components
import { SearchInput, ResponsiveDialog } from '../../../../../components';

// Component styles
import styles from './styles';
import AddCinema from '../AddCinema/AddCinema';

class CinemaToolbar extends Component {
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
            <SearchInput
              className={classes.searchInput}
              placeholder="Search cinema"
            />
            <Button
              onClick={() => this.OpenAddDialog()}
              color="primary"
              size="small"
              variant="outlined">
              Add
            </Button>
          </div>
        </div>
        <ResponsiveDialog
          id="Add-cinema"
          open={openAddDialog}
          handleClose={() => this.CloseAddDialog()}>
          <AddCinema />
        </ResponsiveDialog>
      </Fragment>
    );
  }
}

CinemaToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CinemaToolbar);
