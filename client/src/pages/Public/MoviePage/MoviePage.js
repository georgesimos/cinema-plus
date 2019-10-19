import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Box } from '@material-ui/core';
import { getMovies } from '../../../store/actions';
import Navbar from '../../../layouts/Public/components/Navbar/Navbar';
import MovieCarousel from '../components/MovieCarousel/MovieCarousel';
import MovieBanner from '../components/MovieBanner/MovieBanner';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.dark
  },
  grid: {
    height: '100%'
  },
  carousel: { marginBottom: theme.spacing(6) }
});

function addPageCursors() {
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

function MoviePage(props) {
  const { classes, movies, latestMovies, getMovies } = props;
  useEffect(() => {
    if (movies.length === 0) {
      getMovies();
    }
    addPageCursors();
  }, [movies, getMovies]);
  return (
    <Fragment>
      <div className={classes.root}>
        <Navbar />
        <MovieBanner movie={movies[0]} height="70vh" />
        <Box height={100} />
        <MovieCarousel
          carouselClass={classes.carousel}
          title="Latest Movies"
          to="/movie/category/latest"
          movies={latestMovies}
        />
        <MovieCarousel
          carouselClass={classes.carousel}
          title="Popular Movies"
          movies={movies}
        />
        <MovieCarousel
          carouselClass={classes.carousel}
          title="Now Playing Movies"
          movies={movies}
        />
      </div>
      <div className="cursor" id="cursor" />
      <div className="cursor2" id="cursor2" />
      <div className="cursor3" id="cursor3" />
    </Fragment>
  );
}

MoviePage.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
  latestMovies: PropTypes.array.isRequired
};

const mapStateToProps = ({ movieState }) => ({
  movies: movieState.movies,
  latestMovies: movieState.latestMovies
});

const mapDispatchToProps = { getMovies };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MoviePage));
