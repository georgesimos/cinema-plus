import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography } from '@material-ui/core';
import Dashboard from '../../../layouts/Dashboard/Dashboard';
import styles from './styles';
import { ReservationsToolbar, ReservationsTable } from './components';
import { getReservations, getMovies, getCinemas } from '../../../store/actions';
import ReservationsCalendar from './components/ReservationsCalendar/ReservationsCalendar';
import { match } from '../../../utils/utils';

class ReservationList extends Component {
  state = { mode: 'list', search: '' };

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

  onChangeMode = () =>
    this.setState(({ mode }) => ({ mode: mode === 'grid' ? 'list' : 'grid' }));

  onChangeSearch = e => this.setState({ search: e.target.value });

  render() {
    const { mode, search } = this.state;
    const { classes, reservations, movies, cinemas } = this.props;

    const filteredReservations = match(search, reservations, 'phone');

    return (
      <Dashboard title="Users">
        <div className={classes.root}>
          <ReservationsToolbar
            reservations={filteredReservations}
            search={search}
            onChangeSearch={this.onChangeSearch}
            mode={mode}
            onChangeMode={this.onChangeMode}
          />
          <div className={classes.content}>
            {!filteredReservations.length ? (
              <Typography variant="h6">There are no reservations</Typography>
            ) : mode === 'list' ? (
              <ReservationsTable
                reservations={filteredReservations}
                movies={movies}
                cinemas={cinemas}
              />
            ) : (
              <ReservationsCalendar
                reservations={filteredReservations}
                movies={movies}
                cinemas={cinemas}
              />
            )}
          </div>
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
