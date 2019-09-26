import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// Externals
import PropTypes from 'prop-types';
// Material helpers
import { withStyles } from '@material-ui/core';
// Material components
import { CircularProgress, Grid, Typography } from '@material-ui/core';

// Custom components
import { MovieToolbar, MovieCard } from './components';
import { ResponsiveDialog } from '../../../components';

// Component styles
import styles from './styles';
import Dashboard from '../../../layouts/Dashboard/Dashboard';
import AddMovie from './components/AddMovie/AddMovie';

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      limit: 6,
      movies: [],
      moviesTotal: 0,
      error: null,
      openEditDialog: false
    };
    this.signal = true;
    this.editMovie = this.editMovie.bind(this);
  }
  //signal = true;

  // state = {
  //   isLoading: false,
  //   limit: 6,
  //   movies: [],
  //   moviesTotal: 0,
  //   error: null,
  //   openAddDialog: false
  // };

  getMovies = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = '/movies';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok && this.signal) {
        const movies = await response.json();
        this.setState({ isLoading: false, movies });
      }
    } catch (error) {
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  };

  componentWillMount() {
    this.signal = true;

    const { limit } = this.state;

    this.getMovies(limit);
  }

  componentWillUnmount() {
    this.signal = false;
  }

  renderMovies() {
    const { classes } = this.props;
    const { isLoading, movies } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (movies.length === 0) {
      return (
        <Typography variant="h6">There are no movies available</Typography>
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
            onClick={() => this.editMovie(movie)}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    );
  }

  OpenEditDialog = movie => {
    this.setState({ openEditDialog: true, editMovie: movie });
  };

  CloseEditDialog = () => {
    this.setState({ openEditDialog: false, editMovie: null });
  };

  editMovie(movie) {
    this.OpenEditDialog(movie);
  }

  render() {
    const { classes } = this.props;
    console.log(this.state.editMovie);
    const editMovie = this.state.editMovie;
    return (
      <Dashboard title="Movies">
        <div className={classes.root}>
          <MovieToolbar />
          <div className={classes.content}>{this.renderMovies()}</div>
          <ResponsiveDialog
            id="Edit-movie"
            open={this.state.openEditDialog}
            handleClose={() => this.CloseEditDialog()}>
            <AddMovie edit={editMovie} />
          </ResponsiveDialog>
        </div>
      </Dashboard>
    );
  }
}

MovieList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieList);
