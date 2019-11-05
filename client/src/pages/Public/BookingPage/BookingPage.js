// @ts-nocheck
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  withStyles,
  Box,
  Typography,
  Grid,
  Container,
  Button,
  TextField,
  MenuItem
} from '@material-ui/core';
import Navbar from '../../../layouts/Public/components/Navbar/Navbar';
import { getCinemas, getReservations } from '../../../store/actions';
import { ResponsiveDialog } from '../../../components';
import LoginForm from '../../Admin/Login/components/LoginForm';
import styles from './styles';

class BookingPage extends Component {
  state = {
    movie: null,
    showtimes: null,
    cinema: { seats: [] },
    selectedSeats: 0,
    selectedCinema: '',
    selectedTime: '',
    mustLogin: false
  };
  componentDidMount() {
    if (!this.props.cinemas.length) this.props.getCinemas();
    this.getMovie();
    this.getShowtimes();
    this.props.getReservations();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedCinema !== this.state.selectedCinema) {
      this.getCinema(this.state.selectedCinema);
    }
  }

  onSelectSeat = async (row, seat) => {
    const {
      cinema: { seats }
    } = this.state;
    if (seats[row][seat] === 1) return;
    const newSeats = [...seats];
    seats[row][seat] === 2
      ? (newSeats[row][seat] = 0)
      : (newSeats[row][seat] = 2);
    this.setState(({ cinema, selectedSeats }) => ({
      cinema: { ...cinema, seats: newSeats },
      selectedSeats: selectedSeats + 1
    }));
  };

  async checkout(seats) {
    const { selectedSeats, cinema, movie, selectedTime } = this.state;
    if (!selectedSeats) return;
    try {
      const url = '/reservations';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startAt: selectedTime,
          seats,
          ticketPrice: cinema.ticketPrice,
          total: selectedSeats * cinema.ticketPrice,
          movieId: movie._id,
          cinemaId: cinema._id
        })
      });
      const reservation = await response.json();
      if (response.ok) {
        console.log(reservation);
        this.props.getReservations();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async bookSeat() {
    const { isAuth } = this.props;
    if (!isAuth) return this.setState({ mustLogin: true });

    const {
      selectedSeats,
      cinema: { seats, seatsAvailable }
    } = this.state;
    if (!selectedSeats) return;
    const newSeats = seats.map(row =>
      row.map(seat => ([1, 2].includes(seat) ? 1 : 0))
    );

    const totalBookedSeats = newSeats
      .reduce((a, b) => a.concat(b))
      .reduce((a, b) => a + b);

    const bookedSeats = seats
      .map(row =>
        row.map((seat, i) => (seat === 2 ? i : -1)).filter(seat => seat !== -1)
      )
      .map((seats, i) => (seats.length ? seats.map(seat => [i, seat]) : -1))
      .filter(seat => seat !== -1)
      .reduce((a, b) => a.concat(b));

    this.checkout(bookedSeats);

    // try {
    //   const url = '/cinemas/' + this.state.selectedCinema;
    //   const response = await fetch(url, {
    //     method: 'PATCH',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       seats: newSeats,
    //       seatsAvailable: seatsAvailable - totalBookedSeats
    //     })
    //   });
    //   const cinema = await response.json();
    //   if (response.ok) {
    //     this.checkout(bookedSeats);
    //     this.setState({
    //       cinema,
    //       selectedSeats: 0
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

  async getCinema(id) {
    try {
      const url = '/cinemas/' + id;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const cinema = await response.json();
      if (response.ok) {
        this.setState({
          cinema
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getMovie() {
    try {
      const url = '/movies/' + this.props.match.params.id;
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const movie = await response.json();
      if (response.ok) {
        this.setState({
          movie
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getShowtimes() {
    try {
      const url = '/showtimes/';
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const showtimes = await response.json();
      console.log(showtimes);
      if (response.ok) {
        this.setState({
          showtimes: showtimes.filter(
            showtime => showtime.movieId === this.props.match.params.id
          )
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  onFilterCinema() {
    const { showtimes, selectedCinema, selectedTime } = this.state;
    const { cinemas } = this.props;
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
    const { reservations } = this.props;
    const { cinema, selectedTime } = this.state;

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

  render() {
    const {
      movie,
      selectedSeats,
      cinema: { ticketPrice, seatsAvailable },
      selectedCinema,
      selectedTime
    } = this.state;
    const { classes } = this.props;
    const { uniqueCinemas, uniqueTimes } = this.onFilterCinema();
    const seats = this.onGetReservedSeats();

    return (
      <div className={classes.root}>
        <Navbar />
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={2} style={{ height: '100%' }}>
            {movie && (
              <Grid item xs={12} md={12} lg={3}>
                <div className={classes.movieInfos}>
                  <div
                    className={classes.background}
                    style={{
                      backgroundImage: `url(${movie.image})`
                    }}
                  />
                  <Typography className={classes.title}>
                    {movie.title}
                  </Typography>
                  <div className={classes.info}>
                    {movie.director && (
                      <div className={classes.infoBox}>
                        <Typography variant="subtitle1" color="inherit">
                          Director
                        </Typography>
                        <Typography variant="caption" color="inherit">
                          {movie.director}
                        </Typography>
                      </div>
                    )}
                    {movie.cast && (
                      <div className={classes.infoBox}>
                        <Typography variant="subtitle1" color="inherit">
                          Cast
                        </Typography>
                        <Typography variant="caption" color="inherit">
                          {movie.cast}
                        </Typography>
                      </div>
                    )}
                    {movie.genre && (
                      <div className={classes.infoBox}>
                        <Typography variant="subtitle1" color="inherit">
                          Genre
                        </Typography>
                        <Typography variant="caption" color="inherit">
                          {movie.genre}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
              </Grid>
            )}

            <Grid item lg={9} xs={12} md={12}>
              {!!uniqueCinemas.length ? (
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      select
                      value={selectedCinema}
                      label="Select Cinema"
                      variant="outlined"
                      onChange={event =>
                        this.setState({ selectedCinema: event.target.value })
                      }>
                      {uniqueCinemas.map(cinema => (
                        <MenuItem key={cinema._id} value={cinema._id}>
                          {cinema.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      select
                      value={selectedTime}
                      label="Select Time"
                      variant="outlined"
                      onChange={event =>
                        this.setState({ selectedTime: event.target.value })
                      }>
                      {uniqueTimes.map((time, index) => (
                        <MenuItem key={time + '-' + index} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  {this.state.mustLogin && (
                    <Grid item xs={12}>
                      <Box
                        display="flex"
                        width={1}
                        height={1}
                        alignItems="center"
                        justifyContent="center">
                        <Typography align="center" variant="h2" color="error">
                          You Must Log In
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              ) : (
                <Box
                  display="flex"
                  width={1}
                  height={1}
                  alignItems="center"
                  justifyContent="center">
                  <Typography align="center" variant="h2" color="inherit">
                    No Cinema Available.
                  </Typography>
                </Box>
              )}
              {seatsAvailable && selectedCinema && selectedTime && (
                <Fragment>
                  <Box width={1} pt={15}>
                    {seats.length > 0 &&
                      seats.map((seatRows, indexRow) => (
                        <div key={indexRow} className={classes.row}>
                          {seatRows.map((seat, index) => (
                            <Box
                              key={`seat-${index}`}
                              onClick={() => this.onSelectSeat(indexRow, index)}
                              className={classes.seat}
                              bgcolor={
                                seat === 1
                                  ? 'rgb(65, 66, 70)'
                                  : seat === 2
                                  ? 'rgb(120, 205, 4)'
                                  : 'rgb(96, 93, 169)'
                              }>
                              {index + 1}
                            </Box>
                          ))}
                        </div>
                      ))}
                  </Box>
                  <Box width={1} mt={10}>
                    <Box
                      width="50%"
                      margin="auto"
                      display="flex"
                      alignItems="center"
                      textAlign="center"
                      color="#eee">
                      <div>
                        <Box
                          mr={1}
                          display="inline-block"
                          width={10}
                          height={10}
                          bgcolor="rgb(96, 93, 169)"
                        />
                        Seat Available
                      </div>
                      <div>
                        <Box
                          mr={1}
                          ml={2}
                          display="inline-block"
                          width={10}
                          height={10}
                          bgcolor="rgb(65, 66, 70)"
                        />
                        Reserved Seat
                      </div>
                      <div>
                        <Box
                          mr={1}
                          ml={2}
                          display="inline-block"
                          width={10}
                          height={10}
                          bgcolor="rgb(120, 205, 4)"
                        />
                        Your Seat
                      </div>
                    </Box>
                  </Box>
                  <Box marginTop={2} bgcolor="rgb(18, 20, 24)">
                    <Grid container>
                      <Grid item xs={10}>
                        <Grid container spacing={3} style={{ padding: 20 }}>
                          <Grid item>
                            <Typography className={classes.bannerTitle}>
                              Name
                            </Typography>
                            <Typography className={classes.bannerContent}>
                              George Simos
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography className={classes.bannerTitle}>
                              Tickets
                            </Typography>
                            {selectedSeats > 0 ? (
                              <Typography className={classes.bannerContent}>
                                {selectedSeats} tickets
                              </Typography>
                            ) : (
                              <Typography className={classes.bannerContent}>
                                None
                              </Typography>
                            )}
                          </Grid>
                          <Grid item>
                            <Typography className={classes.bannerTitle}>
                              Price
                            </Typography>
                            <Typography className={classes.bannerContent}>
                              {ticketPrice * selectedSeats} Euro
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={2}
                        style={{
                          color: 'rgb(120, 205, 4)',
                          background: 'black',
                          display: 'flex'
                        }}>
                        <Button
                          color="inherit"
                          fullWidth
                          disabled={seatsAvailable <= 0}
                          onClick={() => this.bookSeat()}>
                          Checkout
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Fragment>
              )}
            </Grid>
          </Grid>
        </Container>
        <ResponsiveDialog
          title=""
          id="Edit-cinema"
          open={this.state.mustLogin}
          handleClose={() => this.setState({ mustLogin: false })}
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

const mapStateToProps = ({ authState, cinemasState, reservationsState }) => ({
  isAuth: authState.isAuthenticated,
  user: authState.user,
  cinemas: cinemasState.cinemas,
  reservations: reservationsState.reservations
});

const mapDispatchToProps = { getCinemas, getReservations };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BookingPage));
