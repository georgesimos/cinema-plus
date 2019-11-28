import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid } from '@material-ui/core';
import {
  TotalUsers,
  TotalCinemas,
  TotalMovies,
  TotalReservations,
  BestMovies,
  UsersByDevice
} from './components';
import {
  getUsers,
  getCinemas,
  getMovies,
  getReservations
} from '../../../store/actions';

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(4)
  }
});

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getCinemas();
    this.props.getMovies();
    this.props.getReservations();
  }

  getBestMovies = (reservations, movies, total = 5) => {
    const reservationCounter = reservations.map(reservation => ({
      movieId: reservation.movieId,
      count: reservations.filter(r => r.movieId === reservation.movieId).length
    }));

    const result = [];
    const map = new Map();
    for (const item of reservationCounter) {
      if (!map.has(item.movieId)) {
        map.set(item.movieId, true); // set any value to Map
        result.push({
          movieId: item.movieId,
          count: item.count
        });
      }
    }
    return result
      .sort((a, b) => b.count - a.count)
      .slice(0, total)
      .map(res => ({
        movie: movies.find(movie => movie._id === res.movieId),
        count: res.count
      }));
  };

  render() {
    const { classes, users, cinemas, movies, reservations } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalUsers users={users.length} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalCinemas cinemas={cinemas.length} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalMovies movies={movies.length} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalReservations reservations={reservations.length} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <BestMovies
              bestMovies={this.getBestMovies(reservations, movies, 5)}
            />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <UsersByDevice />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({
  userState,
  cinemaState,
  movieState,
  reservationState
}) => ({
  users: userState.users,
  cinemas: cinemaState.cinemas,
  movies: movieState.movies,
  reservations: reservationState.reservations
});
const mapDispatchToProps = {
  getUsers,
  getCinemas,
  getMovies,
  getReservations
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard));
