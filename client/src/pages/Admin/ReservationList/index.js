import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography } from '@material-ui/core';
import Dashboard from '../../../layouts/Dashboard/Dashboard';
import styles from './styles';
import { ReservationsToolbar, ReservationsTable } from './components';
import { getReservations, getMovies, getCinemas } from '../../../store/actions';
import ReservationsCalendar from './components/ReservationsCalendar/ReservationsCalendar';

class ReservationList extends Component {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { reservations, movies, cinemas } = this.props;
    if (!reservations.length || !movies.length || !cinemas.length) {
      this.props.getReservations();
      this.props.getMovies();
      this.props.getCinemas();
    }
  }

  renderReservations() {
    const { reservations, movies, cinemas } = this.props;

    if (!reservations.length) {
      return <Typography variant="h6">There are no reservations</Typography>;
    }

    return (
      <ReservationsTable
        reservations={reservations}
        movies={movies}
        cinemas={cinemas}
      />
    );
  }
  render() {
    const { classes, reservations } = this.props;
    return (
      <Dashboard title="Users">
        <div className={classes.root}>
          <ReservationsToolbar reservations={reservations} />
          <div className={classes.content}>{this.renderReservations()}</div>
          <ReservationsCalendar reservations={reservations} />
        </div>
      </Dashboard>
    );
  }
}

const mapStateToProps = ({ reservationState, movieState, cinemaState }) => ({
  reservations: reservationState.reservations,
  movies: movieState.movies,
  cinemas: cinemaState.cinemas
});

const mapDispatchToProps = {
  getReservations,
  getMovies,
  getCinemas
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ReservationList));
