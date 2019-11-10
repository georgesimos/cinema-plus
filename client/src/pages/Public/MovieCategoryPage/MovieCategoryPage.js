// @ts-nocheck
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import ResponsiveMovieCard from '../components/ResponsiveMovieCard/ResponsiveMovieCard';
import { getMovies } from '../../../store/actions';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3)
  },
  [theme.breakpoints.down('sm')]: {
    fullWidth: { width: '100%' }
  }
}));

function MovieCategoryPage(props) {
  const { movies, getMovies } = props;
  const category = props.match.params.category;
  useEffect(() => {
    if (movies.length === 0) {
      getMovies();
    }
  }, [movies, getMovies]);

  const classes = useStyles(props);
  return (
    <Grid container spacing={2}>
      {!['nowShowing', 'comingSoon'].includes(category) ? (
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h2" color="inherit">
            Category Does not exist.
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h2" color="inherit">
              Movie List
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
              <Grid key={movie._id} item className={classes.fullWidth}>
                <ResponsiveMovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Grid>
  );
}

const mapStateToProps = ({ movieState }, ownProps) => ({
  movies: movieState[ownProps.match.params.category] || []
});

const mapDispatchToProps = { getMovies };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieCategoryPage);
