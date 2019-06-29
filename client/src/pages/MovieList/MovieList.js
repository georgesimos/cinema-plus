import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Externals
import PropTypes from 'prop-types';
// Material helpers
import { withStyles } from '@material-ui/core';
// Material components
import {
  IconButton,
  CircularProgress,
  Grid,
  Typography
} from '@material-ui/core';
// Material icons
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon
} from '@material-ui/icons';

// Custom components
import { MovieToolbar, MovieCard } from './components';

// Component styles
import styles from './styles';
import Dashboard from '../../layouts/Dashboard/Dashboard';
import { ResponsiveDialog } from '../../components';

class MovieList extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 6,
    movies: [],
    moviesTotal: 0,
    error: null
  };

  getMovies = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = 'http://localhost:3001/movies';
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
          <Grid item key={movie._id} lg={4} md={6} xs={12}>
            <Link to="#">
              <MovieCard movie={movie} />
            </Link>
          </Grid>
        ))}
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Dashboard title="Movies">
        <div className={classes.root}>
          <MovieToolbar />
          <div className={classes.content}>{this.renderMovies()}</div>
        </div>
      </Dashboard>
    );
  }
}

MovieList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieList);
