import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Grid, Container } from '@material-ui/core';
import Navbar from '../../../layouts/Public/components/Navbar/Navbar';
import {
  getMovie,
  getCinema,
  getCinemas,
  getShowtimes,
  getReservations,
  setSelectedSeats,
  setSelectedCinema,
  setSelectedTime,
  setInvitation,
  toggleLoginPopup,
  showInvitationForm,
  resetCheckout
} from '../../../store/actions';
import { ResponsiveDialog } from '../../../components';
import LoginForm from '../Login/components/LoginForm';
import styles from './styles';
import MovieInfo from './components/MovieInfo/MovieInfo';
import BookingForm from './components/BookingForm/BookingForm';
import BookingSeats from './components/BookingSeats/BookingSeats';
import BookingCheckout from './components/BookingCheckout/BookingCheckout';
import BookingInvitation from './components/BookingInvitation/BookingInvitation';

class BookingPage extends Component {
  componentDidMount() {
    this.props.getCinemas();
    this.props.getMovie(this.props.match.params.id);
    this.props.getShowtimes();
    this.props.getReservations();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedCinema !== this.props.selectedCinema) {
      this.props.getCinema(this.props.selectedCinema);
    }
  }

  onSelectSeat = (row, seat) => {
    const { cinema, selectedSeats, setSelectedSeats } = this.props;
    const seats = [...cinema.seats];
    if (seats[row][seat] === 1) return;

    const newSeats = [...seats];
    // let selectedSeatsTotal = 0;

    if (seats[row][seat] === 2) {
      newSeats[row][seat] = 0;
      // selectedSeatsTotal = selectedSeats - 1;
    } else {
      newSeats[row][seat] = 2;
      // selectedSeatsTotal = selectedSeats + 1;
    }
    setSelectedSeats([row, seat]);
  };

  async checkout(seats) {
    const {
      movie,
      cinema,
      selectedSeats,
      selectedTime,
      getReservations,
      isAuth,
      toggleLoginPopup,
      resetCheckout,
      showInvitationForm
    } = this.props;

    if (selectedSeats.length === 0) return;
    if (!isAuth) return toggleLoginPopup();

    try {
      const url = '/reservations';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startAt: selectedTime,
          seats: this.bookSeats(),
          ticketPrice: cinema.ticketPrice,
          total: selectedSeats.length * cinema.ticketPrice,
          movieId: movie._id,
          cinemaId: cinema._id
        })
      });
      const reservation = await response.json();
      if (response.ok) {
        console.log(reservation);
        getReservations();
        showInvitationForm();

        // Need to reset Checkout State
        // resetCheckout();
      }
    } catch (error) {
      console.log(error);
    }
  }

  bookSeats() {
    const { cinema, selectedSeats } = this.props;
    const seats = [...cinema.seats];

    if (selectedSeats.length === 0) return;

    const bookedSeats = seats
      .map(row =>
        row.map((seat, i) => (seat === 2 ? i : -1)).filter(seat => seat !== -1)
      )
      .map((seats, i) => (seats.length ? seats.map(seat => [i, seat]) : -1))
      .filter(seat => seat !== -1)
      .reduce((a, b) => a.concat(b));

    return bookedSeats;
  }

  onFilterCinema() {
    const { cinemas, showtimes, selectedCinema, selectedTime } = this.props;
    const initialReturn = { uniqueCinemas: [], uniqueTimes: [] };
    if (!showtimes || !cinemas) return initialReturn;

    const uniqueCinemasId = showtimes
      .filter(showtime =>
        selectedTime ? showtime.startAt === selectedTime : true
      )
      .map(showtime => showtime.cinemaId)
      .filter((value, index, self) => self.indexOf(value) === index);

    const uniqueCinemas = cinemas.filter(cinema =>
      uniqueCinemasId.includes(cinema._id)
    );

    const uniqueTimes = showtimes
      .filter(showtime =>
        selectedCinema ? selectedCinema === showtime.cinemaId : true
      )
      .map(showtime => showtime.startAt)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort(
        (a, b) => new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b)
      );

    return { ...initialReturn, uniqueCinemas, uniqueTimes };
  }

  onGetReservedSeats = () => {
    const { reservations, cinema, selectedTime } = this.props;
    const filteredReservations = reservations.filter(
      reservation => reservation.startAt === selectedTime
    );
    if (filteredReservations.length && cinema && selectedTime) {
      const reservedSeats = filteredReservations
        .map(reservation => reservation.seats)
        .reduce((a, b) => a.concat(b));
      const newSeats = [...cinema.seats];
      reservedSeats.forEach(([row, seat]) => (newSeats[row][seat] = 1));
      return newSeats;
    }
    if (cinema) return cinema.seats;
  };

  onChangeCinema = event => this.props.setSelectedCinema(event.target.value);
  onChangeTime = event => this.props.setSelectedTime(event.target.value);

  sendInvitations = async () => {
    const invitations = this.createInvitations();
    console.log(invitations);
    try {
      const token = localStorage.getItem('jwtToken');
      const url = '/invitations';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(invitations)
      });
      if (response.ok) {
        // dispatch(setAlert('invitations Send', 'success', 5000));
        return { status: 'success', message: 'invitations Send' };
      }
    } catch (error) {
      // dispatch(setAlert(error.message, 'error', 5000));
      return {
        status: 'error',
        message: ' invitations have not send, try again.'
      };
    }
  };

  createInvitations = () => {
    const { user, movie, cinema, selectedTime, invitations } = this.props;

    const invArray = Object.keys(invitations)
      .map(key => ({
        to: invitations[key],
        host: user.name,
        movie: movie.title,
        time: selectedTime,
        cinema: cinema.name,
        seat: key
      }))
      .filter(inv => inv.to !== '');
    return invArray;
  };

  render() {
    const {
      classes,
      movie,
      cinema,
      selectedSeats,
      selectedCinema,
      selectedTime,
      showLoginPopup,
      toggleLoginPopup,
      showInvitation,
      invitations,
      setInvitation,
      resetCheckout
    } = this.props;
    const { uniqueCinemas, uniqueTimes } = this.onFilterCinema();
    const seats = this.onGetReservedSeats();

    return (
      <div className={classes.root}>
        <Navbar />
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={2} style={{ height: '100%' }}>
            <MovieInfo movie={movie} />
            <Grid item lg={9} xs={12} md={12}>
              <BookingForm
                cinemas={uniqueCinemas}
                times={uniqueTimes}
                selectedCinema={selectedCinema}
                selectedTime={selectedTime}
                onChangeCinema={this.onChangeCinema}
                onChangeTime={this.onChangeTime}
              />

              {showInvitation && !!selectedSeats.length && (
                <BookingInvitation
                  selectedSeats={selectedSeats}
                  sendInvitations={this.sendInvitations}
                  ignore={resetCheckout}
                  invitations={invitations}
                  onSetInvitation={setInvitation}
                />
              )}

              {cinema && selectedCinema && selectedTime && !showInvitation && (
                <>
                  <BookingSeats
                    seats={seats}
                    onSelectSeat={(indexRow, index) =>
                      this.onSelectSeat(indexRow, index)
                    }
                  />
                  <BookingCheckout
                    ticketPrice={cinema.ticketPrice}
                    seatsAvailable={cinema.seatsAvailable}
                    selectedSeats={selectedSeats.length}
                    onBookSeats={() => this.checkout()}
                  />
                </>
              )}
            </Grid>
          </Grid>
        </Container>
        <ResponsiveDialog
          id="Edit-cinema"
          open={showLoginPopup}
          handleClose={() => toggleLoginPopup()}
          maxWidth="sm">
          <LoginForm />
        </ResponsiveDialog>
      </div>
    );
  }
}

BookingPage.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (
  {
    authState,
    movieState,
    cinemaState,
    showtimeState,
    reservationState,
    checkoutState
  },
  ownProps
) => ({
  isAuth: authState.isAuthenticated,
  user: authState.user,
  movie: movieState.selectedMovie,
  cinema: cinemaState.selectedCinema,
  cinemas: cinemaState.cinemas,
  showtimes: showtimeState.showtimes.filter(
    showtime => showtime.movieId === ownProps.match.params.id
  ),
  reservations: reservationState.reservations,
  selectedSeats: checkoutState.selectedSeats,
  selectedCinema: checkoutState.selectedCinema,
  selectedTime: checkoutState.selectedTime,
  showLoginPopup: checkoutState.showLoginPopup,
  showInvitation: checkoutState.showInvitation,
  invitations: checkoutState.invitations
});

const mapDispatchToProps = {
  getMovie,
  getCinema,
  getCinemas,
  getShowtimes,
  getReservations,
  setSelectedSeats,
  setSelectedCinema,
  setSelectedTime,
  setInvitation,
  toggleLoginPopup,
  showInvitationForm,
  resetCheckout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BookingPage));
