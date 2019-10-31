import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { CircularProgress, Grid } from '@material-ui/core';
import { MovieToolbar, MovieCard } from './components';
import { ResponsiveDialog } from '../../../components';
import styles from './styles';
import Dashboard from '../../../layouts/Dashboard/Dashboard';
import AddMovie from './components/AddMovie/AddMovie';
import { getMovies, onSelectMovie } from '../../../store/actions';

class MovieList extends Component {
  componentDidMount() {
    const { movies, getMovies } = this.props;
    if (!movies.length) getMovies();
  }

  renderMovies() {
    const { classes, movies } = this.props;
    if (!movies.length) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }
    return (
      <Grid container spacing={3}>
        {movies.map(movie => (
          <Grid
            item
            key={movie._id}
            lg={4}
            md={6}
            xs={12}
            onClick={() => this.props.onSelectMovie(movie)}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    );
  }

  render() {
    const { classes, selectedMovie } = this.props;
    return (
      <Dashboard title="Movies">
        <div className={classes.root}>
          <MovieToolbar />
          <div className={classes.content}>{this.renderMovies()}</div>
          <ResponsiveDialog
            id="Edit-movie"
            open={Boolean(selectedMovie)}
            handleClose={() => this.props.onSelectMovie(null)}>
            <AddMovie edit={selectedMovie} />
          </ResponsiveDialog>
        </div>
      </Dashboard>
    );
  }
}

MovieList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ movieState }) => ({
  movies: movieState.movies,
  latestMovies: movieState.latestMovies,
  comingSoon: movieState.comingSoon,
  nowShowing: movieState.nowShowing,
  selectedMovie: movieState.selectedMovie
});

const mapDispatchToProps = { getMovies, onSelectMovie };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MovieList));
