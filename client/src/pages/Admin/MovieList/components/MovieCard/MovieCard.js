import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Typography, Divider } from '@material-ui/core';

// Material icons
import { AccessTime as AccessTimeIcon } from '@material-ui/icons';

// Shared components
import { Paper } from '../../../../../components';

// Component styles
import styles from './styles';

class MovieCard extends Component {
  render() {
    const { classes, className, movie } = this.props;

    const rootClassName = classNames(classes.root, className);
    return (
      <Paper className={rootClassName}>
        <div className={classes.imageWrapper}>
          <img alt="movie" className={classes.image} src={movie.image} />
        </div>
        <div className={classes.details}>
          <Typography className={classes.title} variant="h4">
            {movie.title}
          </Typography>
          <Typography className={classes.description} variant="body1">
            {movie.description}
          </Typography>
        </div>
        <Divider />
        <div className={classes.stats}>
          <AccessTimeIcon className={classes.updateIcon} />
          <Typography className={classes.updateText} variant="body2">
            {movie.duration} minutes
          </Typography>
        </div>
      </Paper>
    );
  }
}

MovieCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieCard);
