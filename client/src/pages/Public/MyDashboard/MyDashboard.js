import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Grid, Typography, Container } from '@material-ui/core';
import { getMovies, getReservations, getCinemas } from '../../../store/actions';
import { MyReservationTable } from './components';
import Account from '../../Admin/Account';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3)
  },
  [theme.breakpoints.down('sm')]: {
    fullWidth: { width: '100%' }
  }
}));

function MyDashboard(props) {
  const {
    user,
    reservations,
    movies,
    cinemas,
    getMovies,
    getReservations,
    getCinemas
  } = props;

  useEffect(() => {
    getMovies();
    getReservations();
    getCinemas();
  }, [getMovies, getReservations, getCinemas]);

  const classes = useStyles(props);

  const myReservations = reservations.filter(
    reservation => reservation.username === user.username
  );

  console.log(myReservations);

  return (
    <Container>
      <Grid container spacing={2}>
        {!!myReservations.length && (
          <>
            <Grid item xs={12}>
              <Typography
                className={classes.title}
                variant="h2"
                color="inherit">
                My Reservations
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <MyReservationTable
                reservations={myReservations}
                movies={movies}
                cinemas={cinemas}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h2" color="inherit">
            My Account
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Account />
        </Grid>
      </Grid>
    </Container>
  );
}

const mapStateToProps = ({
  authState,
  movieState,
  reservationState,
  cinemaState
}) => ({
  user: authState.user,
  movies: movieState.movies,
  reservations: reservationState.reservations,
  cinemas: cinemaState.cinemas
});

const mapDispatchToProps = { getMovies, getReservations, getCinemas };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyDashboard);
