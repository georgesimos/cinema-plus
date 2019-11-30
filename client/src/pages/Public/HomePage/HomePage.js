import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Box, Grid } from '@material-ui/core';
import { getMovies, getShowtimes, getMovieSuggestion } from '../../../store/actions';
import MovieCarousel from '../components/MovieCarousel/MovieCarousel';
import MovieBanner from '../components/MovieBanner/MovieBanner';
import styles from './styles';

class HomePage extends Component {
  componentDidMount() {
    const { movies, showtimes, suggested, getMovies, getShowtimes, getMovieSuggestion, user } = this.props;
    console.log(user)
    if (!movies.length) getMovies();
    if (!showtimes.length) getShowtimes();
    if(user){
      if (!suggested.length) getMovieSuggestion(user.username);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.props.getMovieSuggestion(this.props.user.username);
    }
  }

  render() {
    const { classes, randomMovie, comingSoon, nowShowing, suggested } = this.props;
    return (
      <Fragment>
        <MovieBanner movie={randomMovie} height="85vh" />
        <Box height={60} />
        <MovieCarousel
          carouselClass={classes.carousel}
          title="Suggested for you"
          movies={suggested}
        />
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

const mapStateToProps = ({ movieState, showtimeState, authState }) => ({
  movies: movieState.movies,
  randomMovie: movieState.randomMovie,
  latestMovies: movieState.latestMovies,
  comingSoon: movieState.comingSoon,
  nowShowing: movieState.nowShowing,
  showtimes: showtimeState.showtimes,
  suggested: movieState.suggested,
  user: authState.user
});

const mapDispatchToProps = { getMovies, getShowtimes, getMovieSuggestion };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HomePage));
