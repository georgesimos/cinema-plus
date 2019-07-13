import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import styles from './styles';
import { textTruncate } from '../../../../../utils/utils';

const MovieCard = props => {
  const { classes, movie } = props;

  return (
    <div className={classes.card}>
      <header className={classes.header}>
        <Typography className={classes.h4} variant="h4" color="inherit">
          {movie.genre}
        </Typography>
      </header>
      <div className={classes.body}>
        <p>{movie.duration}</p>
        <h2>{movie.title}</h2>
        <p>{movie.language}</p>
        <p>{movie.cast}</p>
        <p>{movie.director}</p>
        <p>{textTruncate(movie.description)}</p>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired
};
export default withStyles(styles)(MovieCard);
