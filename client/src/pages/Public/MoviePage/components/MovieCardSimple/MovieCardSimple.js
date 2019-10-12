import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import styles from './styles';
import { textTruncate } from '../../../../../utils/utils';
import { Link } from 'react-router-dom';

const MovieCardSimple = props => {
  const { classes, movie } = props;

  return (
    <Link to={`movie/${movie._id}`} style={{ textDecoration: 'none' }}>
      <div className={classes.card}>
        <header
          className={classes.header}
          style={{
            backgroundImage: `url(${movie.image})`
          }}>
          <Typography className={classes.h4} variant="h4" color="inherit">
            {movie.genre}
          </Typography>
        </header>
        <div className={classes.body}>
          <h2>{movie.title}</h2>
        </div>
      </div>
    </Link>
  );
};

MovieCardSimple.propTypes = {
  movie: PropTypes.object.isRequired
};
export default withStyles(styles)(MovieCardSimple);
