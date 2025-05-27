import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Grid, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  bannerTitle: {
    fontSize: theme.spacing(1.4),
    textTransform: 'uppercase',
    color: 'rgb(93, 93, 97)',
    marginBottom: theme.spacing(1)
  },
  bannerContent: {
    fontSize: theme.spacing(2),
    textTransform: 'capitalize',
    color: theme.palette.common.white
  },
  [theme.breakpoints.down('sm')]: {
    hideOnSmall: {
      display: 'none'
    }
  }
}));

export default function BookingCheckout(props) {
  const classes = useStyles(props);
  const {
    user,
    ticketPrice,
    selectedSeats,
    seatsAvailable,
    onBookSeats,
    cinema
  } = props;

  // Рассчитываем общую стоимость с учетом коэффициентов
  const calculateTotalPrice = () => {
    if (!selectedSeats || !cinema || !cinema.seats) return 0;
    
    // Проверяем, что selectedSeats это массив
    if (!Array.isArray(selectedSeats)) return 0;

    console.log('Selected seats:', selectedSeats);
    console.log('Cinema seats:', cinema.seats);

    return selectedSeats.reduce((total, [row, seat]) => {
      // Получаем данные места
      const seatData = cinema.seats[row][seat];
      console.log('Seat data:', seatData);
      
      // Получаем коэффициент места
      let coefficient = 1.0;
      if (typeof seatData === 'object' && seatData !== null) {
        coefficient = seatData.coefficient || 1.0;
      } else if (seatData === 2) {
        // Если место выбрано, проверяем его тип
        const originalSeat = cinema.seats[row][seat];
        if (typeof originalSeat === 'object' && originalSeat !== null) {
          coefficient = originalSeat.coefficient || 1.0;
        }
      }
      
      console.log('Seat coefficient:', coefficient);
      const seatPrice = ticketPrice * coefficient;
      console.log('Seat price:', seatPrice);
      
      return total + seatPrice;
    }, 0);
  };

  // Получаем количество выбранных мест
  const getSelectedSeatsCount = () => {
    return Array.isArray(selectedSeats) ? selectedSeats.length : 0;
  };

  return (
    <Box marginTop={2} bgcolor="rgb(18, 20, 24)">
      <Grid container>
        <Grid item xs={8} md={10}>
          <Grid container spacing={3} style={{ padding: 20 }}>
            {user && user.name && (
              <Grid item className={classes.hideOnSmall}>
                <Typography className={classes.bannerTitle}>Имя</Typography>
                <Typography className={classes.bannerContent}>
                  {user.name}
                </Typography>
              </Grid>
            )}
            <Grid item>
              <Typography className={classes.bannerTitle}>Билеты</Typography>
              <Typography className={classes.bannerContent}>
                {getSelectedSeatsCount()} {getSelectedSeatsCount() === 1 ? 'билет' : (getSelectedSeatsCount() >= 2 && getSelectedSeatsCount() <= 4) ? 'билета' : 'билетов'}
              </Typography>
              {getSelectedSeatsCount() >= 10 && (
                <Typography style={{ color: '#ff6b6b', fontSize: '0.8rem', marginTop: '4px' }}>
                  Достигнуто максимальное количество билетов (10)
                </Typography>
              )}
            </Grid>
            <Grid item>
              <Typography className={classes.bannerTitle}>Цена</Typography>
              <Typography className={classes.bannerContent}>
                {calculateTotalPrice()} ₽
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={4}
          md={2}
          style={{
            color: 'rgb(120, 205, 4)',
            background: 'black',
            display: 'flex'
          }}>
          <Button
            color="inherit"
            fullWidth
            disabled={seatsAvailable <= 0}
            onClick={() => onBookSeats()}>
            Оформить
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
