import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid } from '@material-ui/core';
import {
  TotalUsers,
  TotalCinemas,
  TotalMovies,
  TotalReservations,
  LatestSales,
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
            <LatestSales />
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
