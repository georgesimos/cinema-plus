import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Grid, Typography } from '@material-ui/core';
import ResponsiveMovieCard from '../ResponsiveMovieCard/ResponsiveMovieCard';

const styles = theme => ({
  container: {
    minHeight: '100vh',
    color: theme.palette.common.white,
    backgroundColor: theme.palette.background.dark
  },
  fullHeight: {
    minHeight: '100vh'
  },
  title: {
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    marginBottom: theme.spacing(3)
  },

  [theme.breakpoints.down('sm')]: {
    fullWidth: { width: '100%' }
  }
});

const AllMovieList = props => {
  const { classes, movies } = props;

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item xs={12}>
        <Typography className={classes.title} variant="h2" color="inherit">
          All Movies
        </Typography>
      </Grid>
      <Grid
        className={classes.fullHeight}
        container
        item
        xs={12}
        direction="column"
        alignItems="center"
        justify="center"
        spacing={2}>
        {movies.map(movie => (
          <Grid key={movie._id} item className={classes.fullWidth}>
            <ResponsiveMovieCard movie={movie} />
          </Grid>
        ))}
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
