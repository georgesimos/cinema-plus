import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  seat: {
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.7)',
    borderRadius: 2,
    padding: theme.spacing(2),
    margin: theme.spacing(0.5),
    fontWeight: 600,
    '&:hover': {
      background: 'rgb(120, 205, 4)'
    }
  },
  seatInfoContainer: {
    width: '50%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#eee',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  seatInfo: { 
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  seatInfoLabel: {
    marginRight: theme.spacing(1),
    display: 'inline-block',
    width: 10,
    height: 10
  },
  [theme.breakpoints.down('sm')]: {
    seat: { padding: theme.spacing(1.2), margin: theme.spacing(0.5) },
    seatInfoContainer: { width: '100%', display: 'block' },
    seatInfo: { marginTop: theme.spacing(2) }
  }
}));

export default function BookingSeats(props) {
  const classes = useStyles(props);
  const { seats, onSelectSeat } = props;

  const getSeatColor = (seat) => {
    // Если место занято
    if (seat === 1) return 'rgb(65, 66, 70)';
    
    // Если место выбрано
    if (seat === 2 || (typeof seat === 'object' && seat.selected)) {
      return 'rgb(120, 205, 4)';
    }
    
    // Если место рекомендовано
    if (seat === 3) return 'rgb(14, 151, 218)';
    
    // Проверяем тип места
    if (typeof seat === 'object' && seat !== null) {
      return seat.coefficient === 2.0 ? 'rgb(25, 25, 112)' : 'rgb(96, 93, 169)';
    }
    
    // По умолчанию - обычное место
    return 'rgb(96, 93, 169)';
  };

  return (
    <Fragment>
      <Box width={1} pt={15}>
        {seats.length > 0 &&
          seats.map((seatRows, indexRow) => (
            <div key={indexRow} className={classes.row}>
              {seatRows.map((seat, index) => (
                <Box
                  key={`seat-${index}`}
                  onClick={() => onSelectSeat(indexRow, index)}
                  className={classes.seat}
                  bgcolor={getSeatColor(seat)}>
                  {index + 1}
                </Box>
              ))}
            </div>
          ))}
      </Box>
      <Box width={1} mt={10}>
        <div className={classes.seatInfoContainer}>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: 'rgb(96, 93, 169)' }}></div>
            Обычное место (x1.0)
          </div>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: 'rgb(25, 25, 112)' }}></div>
            VIP место (x2.0)
          </div>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: 'rgb(65, 66, 70)' }}></div>
            Занятое место
          </div>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: 'rgb(120, 205, 4)' }}></div>
            Выбранное место
          </div>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: 'rgb(14, 151, 218)' }}></div>
            Рекомендуемое место
          </div>
        </div>
      </Box>
    </Fragment>
  );
}
