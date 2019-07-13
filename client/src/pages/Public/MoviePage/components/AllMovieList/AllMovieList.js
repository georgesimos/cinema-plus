import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Grid, Paper, Typography } from '@material-ui/core';
import styles from './styles';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CaledarIcon from '@material-ui/icons/CalendarToday';
import { textTruncate } from '../../../../../utils/utils';
import ResponsiveMovieCard from '../ResponsiveMovieCard/ResponsiveMovieCard';

const AllMovieList = props => {
  const { classes, movies } = props;

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item xs={12}>
        <Grid
          className={classes.fullHeight}
          container
          direction="column"
          alignItems="center"
          justify="center"
          spacing={2}>
          <Typography className={classes.title} variant="h2" color="inherit">
            All Movies
          </Typography>
          {movies.map(movie => (
            <Grid key={movie._id} item xs className={classes.fullWidth}>
              <ResponsiveMovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

AllMovieList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired
};

export default withStyles(styles)(AllMovieList);
