import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';

import styles from './styles';

class MoviePopup extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Zoom in={true}>
        <div className={classes.popup}>
          <div className={classes.content}>ggr</div>
        </div>
      </Zoom>
    );
  }
}

MoviePopup.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(MoviePopup);
