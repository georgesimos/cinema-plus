import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3)
  }
}));

function Checkin(props) {
  const reservationId = props.match.params.reservationId;
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    checkinReservations(reservationId);
  }, [reservationId]);

  const checkinReservations = async id => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = '/reservations/checkin/' + id;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const reservation = await response.json();
      if (response.ok) {
        setReservation(reservation);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const classes = useStyles(props);
  console.log(reservation);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography className={classes.title} variant="h2" color="inherit">
          Check In
        </Typography>
        {reservation && reservation.checkin ? (
          <Typography variant="body1" color="primary" align="center">
            Check in for user: {reservation.username} was successful.
          </Typography>
        ) : (
          <Typography variant="body1" color="error" align="center">
            Something went wrong...
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default Checkin;
