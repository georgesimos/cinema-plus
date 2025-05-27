import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { 
  makeStyles, 
  Grid, 
  Typography, 
  Container, 
  CircularProgress, 
  Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { getMovies, getReservations, getCinemas, deleteReservation } from '../../../store/actions';
import { MyReservationTable } from './components';
import Account from '../../Admin/Account';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3)
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(15)
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
    getCinemas,
    deleteReservation
  } = props;

  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (user) {
      getMovies();
      getReservations();
      getCinemas();
    }
  }, [user, getMovies, getReservations, getCinemas]);

  const classes = useStyles(props);

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  if (!user) {
    return (
      <Container>
        <Typography className={classes.title} variant="h2" color="inherit">
          Пожалуйста, войдите в систему
        </Typography>
      </Container>
    );
  }

  if (!movies.length || !cinemas.length) {
    return (
      <Container>
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      </Container>
    );
  }

  const myReservations = reservations.filter(
    reservation => reservation.username === user.username
  );

  const handleDeleteReservation = async (id) => {
    try {
      const result = await deleteReservation(id);
      if (result) {
        setAlert({
          open: true,
          message: result.message,
          severity: result.status === 'success' ? 'success' : 'error'
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        message: error.message || 'Произошла неожиданная ошибка',
        severity: 'error'
      });
    }
  };

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
                Мои бронирования
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <MyReservationTable
                reservations={myReservations}
                movies={movies}
                cinemas={cinemas}
                onDeleteReservation={handleDeleteReservation}
              />
            </Grid>
          </>
        )}
        {!myReservations.length && (
          <Grid item xs={12}>
            <Typography
              className={classes.title}
              variant="h2"
              color="inherit">
              У вас пока нет бронирований
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h2" color="inherit">
            Мой аккаунт
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Account />
        </Grid>
      </Grid>
      <Snackbar 
        open={alert.open} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
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

const mapDispatchToProps = { getMovies, getReservations, getCinemas, deleteReservation };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyDashboard);
