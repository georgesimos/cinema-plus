import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import { Grid, GridList, Typography } from '@material-ui/core';
import styles from './styles';
import MovieCard from '../MovieCard/MovieCard';

class LatestMovieList extends Component {
  state = {
    movies: []
  };
  componentDidMount() {
    this.getMovies();
  }
  async getMovies() {
    try {
      const url = 'http://localhost:3001/movies';
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const movies = await response.json();
      if (response.ok) {
        const lastMovies = movies
          .sort((a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate))
          .slice(0, 5);
        console.log(lastMovies);
        this.setState({
          movies: lastMovies
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { classes } = this.props;
    const { movies } = this.state;
    console.log(movies);
    return (
      <Container maxWidth="xl" className={classes.container}>
        <Grid
          className={classes.fullHeight}
          container
          alignItems="center"
          justify="center"
          spacing={5}>
          <Grid item xs={3}>
            <div className={classes.title}>
              <Typography className={classes.h2} variant="h2" color="inherit">
                Latest Movies
              </Typography>
              <Typography className={classes.h4} variant="h4" color="inherit">
                Covering March & April 2019
              </Typography>
            </div>
          </Grid>
          <Grid item xs={9}>
            <GridList className={classes.gridList} cols={2.5}>
              {movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </GridList>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

LatestMovieList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LatestMovieList);
