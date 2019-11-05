import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Box, Grid } from '@material-ui/core';
import { getMovies, getShowtimes } from '../../../store/actions';
import Navbar from '../../../layouts/Public/components/Navbar/Navbar';
import MovieCarousel from '../components/MovieCarousel/MovieCarousel';
import MovieBanner from '../components/MovieBanner/MovieBanner';
import styles from './styles';

class HomePage extends Component {
  componentDidMount() {
    this.props.getMovies();
    this.props.getShowtimes();
  }

  // nowShowingFilter = (showtimes, movies) =>
  //   showtimes
  //     .map(showtime => ({
  //       ...movies.find(movie => movie._id === showtime.movieId),
  //       startDate: showtime.startDate,
  //       endDate: showtime.endDate
  //     }))
  //     .filter(
  //       showtime =>
  //         new Date(showtime.endDate) >= new Date() &&
  //         new Date(showtime.startDate) < new Date()
  //     );

  // comingSoonFilter = (showtimes, movies) =>
  //   showtimes
  //     .map(showtime => ({
  //       ...movies.find(movie => movie._id === showtime.movieId),
  //       startDate: showtime.startDate,
  //       endDate: showtime.endDate
  //     }))
  //     .filter(showtime => new Date(showtime.startDate) > new Date());

  render() {
    const { classes, movies, comingSoon, nowShowing } = this.props;

    // const nowShowing = this.nowShowingFilter(showtimes, movies);
    // const comingSoon = this.comingSoonFilter(showtimes, movies);

    return (
      <Fragment>
        <div className={classes.root}>
          <Navbar />
          <MovieBanner movie={movies[0]} height="85vh" />
          <Box height={60} />
          <MovieCarousel
            carouselClass={classes.carousel}
            title="Now Showing"
            to="/movie/category/nowShowing"
            movies={nowShowing}
          />
          <MovieCarousel
            carouselClass={classes.carousel}
            title="Coming Soon"
            to="/movie/category/comingSoon"
            movies={comingSoon}
          />
          {false && (
            <Grid container style={{ height: 500 }}>
              <Grid item xs={7} style={{ background: '#131334' }}></Grid>
              <Grid item xs={5} style={{ background: '#010025' }}></Grid>
            </Grid>
          )}
        </div>
      </Fragment>
    );
  }
}

HomePage.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
  latestMovies: PropTypes.array.isRequired
};

const mapStateToProps = ({ movieState, showtimeState }) => ({
  movies: movieState.movies,
  latestMovies: movieState.latestMovies,
  comingSoon: movieState.comingSoon,
  nowShowing: movieState.nowShowing,
  showtimes: showtimeState.showtimes
});

const mapDispatchToProps = { getMovies, getShowtimes };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HomePage));
