import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Navbar from '../../../layouts/Public/components/Navbar/Navbar';
import LatestMovieList from './components/LatestMovieList/LatestMovieList';
import AllMovieList from './components/AllMovieList/AllMovieList';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%'
  },
  grid: {
    height: '100%'
  }
});

class MoviePage extends Component {
  state = {
    movies: [],
    latestMovies: []
  };
  componentDidMount() {
    this.addPageCursors();
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
        const latestMovies = movies
          .sort((a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate))
          .slice(0, 5);
        console.log(latestMovies);
        this.setState({
          movies,
          latestMovies
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  addPageCursors() {
    let cursor1, cursor2, cursor3;
    cursor1 = document.getElementById('cursor');
    cursor2 = document.getElementById('cursor2');
    cursor3 = document.getElementById('cursor3');
    //Page cursors
    document
      .getElementsByTagName('body')[0]
      .addEventListener('mousemove', function(event) {
        cursor1.style.left = event.clientX + 'px';
        cursor1.style.top = event.clientY + 'px';
        cursor2.style.left = event.clientX + 'px';
        cursor2.style.top = event.clientY + 'px';
        cursor3.style.left = event.clientX + 'px';
        cursor3.style.top = event.clientY + 'px';
      });
  }

  render() {
    const { movies, latestMovies } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.root}>
          <Navbar />
          <LatestMovieList movies={latestMovies} />
          <AllMovieList movies={movies} />
        </div>
        <div className="cursor" id="cursor" />
        <div className="cursor2" id="cursor2" />
        <div className="cursor3" id="cursor3" />
      </Fragment>
    );
  }
}

MoviePage.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(MoviePage);
