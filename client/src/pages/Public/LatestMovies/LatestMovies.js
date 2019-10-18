// @ts-nocheck
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import Navbar from '../../../layouts/Public/components/Navbar/Navbar';
import ResponsiveMovieCard from '../MoviePage/components/ResponsiveMovieCard/ResponsiveMovieCard';
import { getMovies } from '../../../store/actions';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.common.white,
    height: '100%'
  },

  title: {
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3)
  }
}));

function LatestMovie(props) {
  const { movies, getMovies } = props;
  useEffect(() => {
    if (movies.length === 0) {
      getMovies();
    }
  }, [movies, getMovies]);

  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Navbar />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h2" color="inherit">
            Latest Movies
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          direction="column"
          alignItems="center"
          justify="center"
          spacing={2}>
          {movies.map(movie => (
            <Grid key={movie._id} item>
              <ResponsiveMovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = ({ movieState }) => ({
  movies: movieState.movies,
  latestMovies: movieState.latestMovies
});

const mapDispatchToProps = { getMovies };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LatestMovie);
