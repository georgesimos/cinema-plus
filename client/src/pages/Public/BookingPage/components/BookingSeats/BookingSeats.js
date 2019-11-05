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
  [theme.breakpoints.down('sm')]: {
    seat: { padding: theme.spacing(0.8), margin: theme.spacing(0.5) }
  }
}));

export default function BookingSeats(props) {
  const classes = useStyles(props);
  const { seats, onSelectSeat } = props;

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
            Selected Seat
          </div>
        </Box>
      </Box>
    </Fragment>
  );
}
